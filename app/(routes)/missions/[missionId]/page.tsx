import React from "react";

export interface PageProps {
  params: {
    missionId: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { missionId } = await params;

  return <div>Mission with id {missionId}</div>;
}
