-- Bilim Core Database Schema
-- Run this in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Progress Events Table (append-only)
CREATE TABLE IF NOT EXISTS progress_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('lesson_started', 'lesson_completed', 'quiz_completed', 'quiz_attempted')),
  lesson_id TEXT,
  quiz_id TEXT,
  score INTEGER,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Progress State Table (aggregated state)
CREATE TABLE IF NOT EXISTS progress_state (
  user_id TEXT NOT NULL,
  lesson_id TEXT NOT NULL,
  progress INTEGER NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  last_accessed TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, lesson_id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_progress_events_user_id ON progress_events(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_events_timestamp ON progress_events(timestamp);
CREATE INDEX IF NOT EXISTS idx_progress_events_synced ON progress_events(created_at);
CREATE INDEX IF NOT EXISTS idx_progress_state_user_id ON progress_state(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_state_lesson_id ON progress_state(lesson_id);

-- Row Level Security (RLS) Policies
ALTER TABLE progress_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress_state ENABLE ROW LEVEL SECURITY;

-- Policy: Users can insert their own events
CREATE POLICY "Users can insert their own events"
  ON progress_events
  FOR INSERT
  WITH CHECK (true); -- Allow anonymous inserts

-- Policy: Users can read their own events
CREATE POLICY "Users can read their own events"
  ON progress_events
  FOR SELECT
  USING (true); -- Allow anonymous reads (can be restricted later)

-- Policy: Users can insert their own progress state
CREATE POLICY "Users can insert their own progress state"
  ON progress_state
  FOR INSERT
  WITH CHECK (true); -- Allow anonymous inserts

-- Policy: Users can update their own progress state
CREATE POLICY "Users can update their own progress state"
  ON progress_state
  FOR UPDATE
  USING (true) -- Allow anonymous updates
  WITH CHECK (true);

-- Policy: Users can read their own progress state
CREATE POLICY "Users can read their own progress state"
  ON progress_state
  FOR SELECT
  USING (true); -- Allow anonymous reads (can be restricted later)

-- Function to update progress state from events (optional, can be called from client or edge function)
CREATE OR REPLACE FUNCTION update_progress_from_events()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.event_type = 'lesson_completed' AND NEW.lesson_id IS NOT NULL THEN
    INSERT INTO progress_state (user_id, lesson_id, progress, completed, last_accessed, updated_at)
    VALUES (NEW.user_id, NEW.lesson_id, 100, TRUE, NEW.timestamp, NEW.timestamp)
    ON CONFLICT (user_id, lesson_id)
    DO UPDATE SET
      progress = 100,
      completed = TRUE,
      last_accessed = NEW.timestamp,
      updated_at = NEW.timestamp;
  ELSIF NEW.event_type = 'lesson_started' AND NEW.lesson_id IS NOT NULL THEN
    INSERT INTO progress_state (user_id, lesson_id, progress, completed, last_accessed, updated_at)
    VALUES (NEW.user_id, NEW.lesson_id, 0, FALSE, NEW.timestamp, NEW.timestamp)
    ON CONFLICT (user_id, lesson_id)
    DO UPDATE SET
      last_accessed = NEW.timestamp,
      updated_at = NEW.timestamp;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update progress state (optional)
-- Uncomment if you want automatic updates via trigger instead of client-side
-- CREATE TRIGGER update_progress_on_event
--   AFTER INSERT ON progress_events
--   FOR EACH ROW
--   EXECUTE FUNCTION update_progress_from_events();

