export interface PageProps {
  params: {
    missionId: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { missionId } = await params;

  return <div>All Requests Page for mission with id: {missionId}</div>;
}
