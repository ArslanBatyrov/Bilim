import { v4 as uuidv4 } from 'uuid'
import {
  addSubject,
  addTopic,
  addLesson,
  addQuiz,
} from './db'
import type { Subject, Topic, Lesson, Quiz } from './types'

export async function seedDemoContent(): Promise<void> {
  // Subject
  const subjectId = uuidv4()
  await addSubject({
    id: subjectId,
    title: 'Mathematics Fundamentals',
    description: 'Learn the basics of mathematics including algebra, geometry, and arithmetic.',
  })

  // Topics
  const topic1Id = uuidv4()
  const topic2Id = uuidv4()

  await addTopic({
    id: topic1Id,
    subjectId,
    title: 'Algebra Basics',
    description: 'Introduction to algebraic expressions and equations',
    order: 1,
  })

  await addTopic({
    id: topic2Id,
    subjectId,
    title: 'Geometry Fundamentals',
    description: 'Understanding shapes, angles, and spatial relationships',
    order: 2,
  })

  // Quizzes
  const quiz1Id = uuidv4()
  const quiz2Id = uuidv4()

  await addQuiz({
    id: quiz1Id,
    title: 'Algebra Basics Quiz',
    questions: [
      {
        id: uuidv4(),
        type: 'mcq',
        question: 'What is the value of x in the equation 2x + 5 = 13?',
        options: ['3', '4', '5', '6'],
        correctAnswer: '4',
        explanation: 'Subtract 5 from both sides: 2x = 8, then divide by 2: x = 4',
      },
      {
        id: uuidv4(),
        type: 'numeric',
        question: 'Solve for y: 3y - 7 = 14',
        correctAnswer: 7,
        explanation: 'Add 7 to both sides: 3y = 21, then divide by 3: y = 7',
      },
    ],
  })

  await addQuiz({
    id: quiz2Id,
    title: 'Geometry Basics Quiz',
    questions: [
      {
        id: uuidv4(),
        type: 'mcq',
        question: 'What is the sum of angles in a triangle?',
        options: ['90 degrees', '180 degrees', '270 degrees', '360 degrees'],
        correctAnswer: '180 degrees',
        explanation: 'The sum of all interior angles in any triangle is always 180 degrees.',
      },
      {
        id: uuidv4(),
        type: 'numeric',
        question: 'What is the area of a rectangle with length 8 and width 5?',
        correctAnswer: 40,
        explanation: 'Area = length × width = 8 × 5 = 40',
      },
    ],
  })

  // Lessons
  const lessons: Omit<Lesson, 'createdAt' | 'updatedAt'>[] = [
    {
      id: uuidv4(),
      topicId: topic1Id,
      title: 'Introduction to Variables',
      content: `# Introduction to Variables

Variables are symbols (usually letters) that represent unknown values in mathematics. They allow us to write general rules and solve problems.

## What is a Variable?

A variable is a letter or symbol that stands for a number. Common variables include:
- **x** - often used for unknown values
- **y** - often used for dependent variables
- **a, b, c** - often used for constants or parameters

## Examples

If we say x = 5, then:
- x + 3 = 8
- 2x = 10
- x² = 25

## Practice

Try to solve: If y = 7, what is y + 4?

The answer is 11, because 7 + 4 = 11.`,
      order: 1,
    },
    {
      id: uuidv4(),
      topicId: topic1Id,
      title: 'Solving Linear Equations',
      content: `# Solving Linear Equations

Linear equations are equations where the highest power of the variable is 1.

## Steps to Solve

1. **Simplify both sides** - Combine like terms
2. **Isolate the variable** - Use inverse operations
3. **Check your answer** - Substitute back into the original equation

## Example

Solve: 3x + 2 = 11

1. Subtract 2 from both sides: 3x = 9
2. Divide both sides by 3: x = 3
3. Check: 3(3) + 2 = 9 + 2 = 11 ✓

## Practice Problems

Try solving these:
- 2x - 5 = 7
- 4x + 3 = 15
- x/2 + 1 = 5`,
      order: 2,
      quizId: quiz1Id,
    },
    {
      id: uuidv4(),
      topicId: topic1Id,
      title: 'Working with Expressions',
      content: `# Working with Expressions

An expression is a combination of numbers, variables, and operations.

## Types of Expressions

- **Numerical**: 5 + 3
- **Algebraic**: x + 3
- **Polynomial**: x² + 2x + 1

## Simplifying Expressions

Combine like terms:
- 3x + 2x = 5x
- 4y - y = 3y
- 2a + 3b + a = 3a + 3b

## Evaluating Expressions

Substitute values for variables:
- If x = 4, then 2x + 3 = 2(4) + 3 = 11`,
      order: 3,
    },
    {
      id: uuidv4(),
      topicId: topic2Id,
      title: 'Introduction to Shapes',
      content: `# Introduction to Shapes

Geometry is the study of shapes, sizes, and properties of space.

## Basic Shapes

### Triangles
- 3 sides
- 3 angles
- Sum of angles: 180°

### Rectangles
- 4 sides
- 4 right angles
- Opposite sides equal

### Circles
- All points equidistant from center
- Radius: distance from center to edge
- Diameter: twice the radius

## Properties

Each shape has unique properties that help us understand and work with them.`,
      order: 1,
    },
    {
      id: uuidv4(),
      topicId: topic2Id,
      title: 'Area and Perimeter',
      content: `# Area and Perimeter

Understanding how to calculate area and perimeter is essential in geometry.

## Perimeter

Perimeter is the distance around a shape.

- **Rectangle**: P = 2(length + width)
- **Square**: P = 4 × side
- **Triangle**: P = side1 + side2 + side3

## Area

Area is the space inside a shape.

- **Rectangle**: A = length × width
- **Square**: A = side²
- **Triangle**: A = ½ × base × height
- **Circle**: A = π × radius²

## Examples

A rectangle with length 6 and width 4:
- Perimeter: 2(6 + 4) = 20 units
- Area: 6 × 4 = 24 square units`,
      order: 2,
      quizId: quiz2Id,
    },
  ]

  for (const lesson of lessons) {
    await addLesson(lesson)
  }
}

