export interface PageProps {
  params: {
    missionId: string;
    requestId: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { missionId, requestId } = await params;

  return (
    <div>
      Mission with id {missionId} & Request with id {requestId}
    </div>
  );
}
