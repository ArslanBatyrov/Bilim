import TopicClient from './TopicClient'

export default function TopicPage({
  params,
}: {
  params: { id: string }
}) {
  return <TopicClient subjectId={params.id} />
}
