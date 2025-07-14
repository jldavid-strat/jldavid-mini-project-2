"use server"

import { eq } from "drizzle-orm";
import { db } from "../db"
import { blogs } from "../schema"

async function createBlog (blogFormData: {
    title: string;
    author: string;
    category: string;
    description: string;
    image_link: string;
    content: string;
    created_at: Date;
}){
   const [insertedBlog] =  await db.insert(blogs).values({
        title: blogFormData.title,
        author: blogFormData.author,
        description: blogFormData.description,
        category: blogFormData.category,
        img_link: blogFormData.image_link,
        content: blogFormData.content,
        created_at: blogFormData.created_at,
    }).returning({id : blogs.id})
   
    return insertedBlog.id
}

async function deleteBlog({blogId}: {blogId:number}){
    await db.delete(blogs).where(eq(blogs.id,blogId))
}

export {createBlog , deleteBlog}
