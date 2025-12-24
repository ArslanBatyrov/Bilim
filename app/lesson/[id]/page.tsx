import LessonPageClient from './LessonPageClient'

export default function LessonPage({
  params,
}: {
  params: { id: string }
}) {
  return <LessonPageClient lessonId={params.id} />
}
