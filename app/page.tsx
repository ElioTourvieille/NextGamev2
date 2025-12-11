import GamesWithFilter from "@/components/GamesWithFilter";
import { getGames } from "@/lib/games";

export default async function Home() {
  const games = await getGames();

  return (
    <main className="gradient-background py-24">
      <GamesWithFilter initialGames={games} />
    </main>
  );
}