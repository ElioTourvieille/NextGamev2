import { PrismaClient, Genre } from "@prisma/client";
import { PrismaPg } from '@prisma/adapter-pg'
import 'dotenv/config'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({
  adapter,
});

const games = [
    {
      title: "Cyberpunk 2077",
      description: "Un RPG d'action en monde ouvert dans une mégapole futuriste obsédée par le pouvoir, le style et les modifications corporelles.",
      genre: Genre.RPG,
      price: 59.99,
      imageUrl: "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg",
      publisher: "CD PROJEKT RED",
      releaseDate: new Date("2020-12-10"),
    },
    {
      title: "The Witcher 3",
      description: "Incarnez un chasseur de monstres professionnel dans un monde ouvert fantastique rempli de créatures dangereuses.",
      genre: Genre.RPG,
      price: 39.99,
      imageUrl: "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/header.jpg",
      publisher: "CD PROJEKT RED",
      releaseDate: new Date("2015-05-19"),
    },
    {
      title: "Valorant",
      description: "Un FPS tactique 5v5 avec des agents dotés de capacités uniques.",
      genre: Genre.FPS,
      price: 0,
      imageUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big/co49x5.png",
      publisher: "Riot Games",
      releaseDate: new Date("2020-06-02"),
    },
    {
      title: "Stardew Valley",
      description: "Vous avez hérité de la vieille ferme de votre grand-père. Transformez cette parcelle en une ferme prospère!",
      genre: Genre.SIMULATION,
      price: 14.99,
      imageUrl: "https://cdn.cloudflare.steamstatic.com/steam/apps/413150/header.jpg",
      publisher: "ConcernedApe",
      releaseDate: new Date("2016-02-26"),
    },
    {
      title: "Elden Ring",
      description: "Un nouveau RPG d'action-aventure fantasy de FromSoftware et George R.R. Martin.",
      genre: Genre.RPG,
      price: 59.99,
      imageUrl: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg",
      publisher: "FromSoftware",
      releaseDate: new Date("2022-02-25"),
    },
    {
      title: "Civilization VI",
      description: "Construisez un empire qui résistera à l'épreuve du temps.",
      genre: Genre.STRATEGY,
      price: 59.99,
      imageUrl: "https://cdn.cloudflare.steamstatic.com/steam/apps/289070/header.jpg",
      publisher: "Firaxis Games",
      releaseDate: new Date("2016-10-21"),
    },
    {
      title: "Portal 2",
      description: "Un jeu de puzzle à la première personne qui vous défiera de résoudre des énigmes complexes.",
      genre: Genre.PUZZLE,
      price: 9.99,
      imageUrl: "https://cdn.cloudflare.steamstatic.com/steam/apps/620/header.jpg",
      publisher: "Valve",
      releaseDate: new Date("2011-04-19"),
    },
    {
      title: "Resident Evil Village",
      description: "L'expérience de survie horrifique continue dans ce huitième opus majeur.",
      genre: Genre.HORROR,
      price: 39.99,
      imageUrl: "https://cdn.cloudflare.steamstatic.com/steam/apps/1196590/header.jpg",
      publisher: "Capcom",
      releaseDate: new Date("2021-05-07"),
    },
  ];
  
  async function main() {
    console.log('🌱 Seeding database...');
  
    // Créer les jeux
    console.log('🎮 Creating games...');
    for (const game of games) {
      await prisma.game.upsert({
        where: { title: game.title },
        update: game,
        create: game,
      });
    }
  
    console.log('✅ Database seeded successfully!');
}
  
  main()
    .catch((e) => {
      console.error('❌ Seed failed:', e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
  