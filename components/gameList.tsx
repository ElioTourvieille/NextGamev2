import { Game } from "@/types";
import GameCard from "./GameCard";

const GameList = ({ games }: { games: Game[] }) => {

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12 mt-24 px-6">
            {games.map((game) => (
                <GameCard key={game.id} game={game} />
            ))}
        </div>
    );
};

export default GameList;