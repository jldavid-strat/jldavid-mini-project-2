declare interface Blog{
    id: number;
    author: string;
    title: string;
    description: string;
    content: string;
    category: string;
    created_at: Date;
    likes: number
    updated_at: Date | null;
    img_link: string;
}