import SubjectClient from './SubjectClient'

export default function SubjectPage({
  params,
}: {
  params: { id: string }
}) {
  return <SubjectClient subjectId={params.id} />
}

