import { db } from "@/db";
import { notFound } from "next/navigation";

interface DemonShowProps {
  url: string
}

export default async function DemonShow({url}: DemonShowProps) {
  const demon = await db.demon.findFirst({
    where: {id: url}
  })
  if (!demon) {
    notFound();

  }
  return (
    <div className="m-4">
      <h1 className="text-2xl font-bold my-2">{demon.title}</h1>
      <p className="p-4 border rounded">{demon.reputation}</p>
    </div>
  );
}
