import { Game } from "@/types";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { formatPrice } from "@/lib/utils";

const GameCard = ({ game }: { game: Game }) => {
  return (
    <Link href={`/games/${game.id}`}>
      <Card className="flex flex-col justify-between rounded-lg border-2 h-full">
        <CardHeader>
          <div className="aspect-video relative py-4 overflow-hidden rounded-md bg-slate-100 dark:bg-slate-800">
            <Image
              src={game.imageUrl}
              alt={game.title}
              fill
              className="object-contain rounded-md transition-all duration-300 transform hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <p className="font-bold text-lg">{game.title}</p>
        </CardHeader>

        <CardContent className="flex justify-between">
          <Badge variant="outline">{game.category.name.toUpperCase()}</Badge>
          <span className="text-slate-500 text-md">{formatPrice(game.price)}</span>
        </CardContent>

        <CardFooter>
            <div className="flex gap-2">
                <div className="flex items-center gap-2">
                    <span className="text-slate-500 text-md">{game.description}</span>
                </div>
            </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default GameCard;
