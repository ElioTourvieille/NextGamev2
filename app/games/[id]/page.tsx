import { getGameById } from "@/lib/games";
import { notFound } from "next/navigation";

export default async function GamePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const game = await getGameById(id);

  if (!game) {
    notFound();
  }

  return (
    <div>
      <h1>{game.title}</h1>
      {/* Add your game detail UI here */}
    </div>
  );
}
