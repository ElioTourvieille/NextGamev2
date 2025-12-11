export type Category = {
    id: number;
    name: string;
    slug: string;
    icon: string;
}

export type Game = {
    id: number;
    title: string;
    slug: string;
    description: string;
    price: number;
    imageUrl: string;
    releaseDate: string;
    publisher: string;
    category: Category;
}