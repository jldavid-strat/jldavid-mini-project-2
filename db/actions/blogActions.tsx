"use server"

import { AnyColumn, eq, sql } from "drizzle-orm";
import { db } from "../db"
import { blogs } from "../schema"
import { revalidatePath } from "next/cache";

const increment = (column: AnyColumn, value = 1) => {
  return sql`${column} + ${value}`;
};

const decrement = (column: AnyColumn, value = 1) => {
  return sql`${column} - ${value}`;
};

async function createBlog (blogFormData: {
    title: string;
    author: string;
    category: string;
    description: string;
    image_filename: string;
    content: string;
    created_at: Date;
}){
   const [insertedBlog] =  await db.insert(blogs).values({
        title: blogFormData.title,
        author: blogFormData.author,
        description: blogFormData.description,
        category: blogFormData.category,
        img_link: blogFormData.image_filename,
        content: blogFormData.content,
        created_at: blogFormData.created_at,
    }).returning({id : blogs.id})
   
    return insertedBlog.id
}

async function updateBlog (
    blogIdEdit:number, 
    blogFormData: {
        title: string;
        author: string;
        category: string;
        description: string;
        image_filename: string;
        content: string;
        created_at: Date;
    }){
   await db.update(blogs).set({
        title: blogFormData.title,
        author: blogFormData.author,
        description: blogFormData.description,
        category: blogFormData.category,
        img_link: blogFormData.image_filename,
        content: blogFormData.content,
        created_at: blogFormData.created_at,
    }).where(eq(blogs.id, blogIdEdit))
}


async function deleteBlog({blogId}: {blogId:number}){
    await db.delete(blogs).where(eq(blogs.id,blogId))

    // TODO delete comments in the blog
}

async function likeBlog(blogId: number){
    await db.
        update(blogs).
        set({
            likes: increment(blogs.likes)
        })
        .where(eq(blogs.id, blogId))

    // quickly load like counter
    revalidatePath(`/blog/${blogId}`)
}
    
async function dislikeBlog(blogId: number){
    await db.
        update(blogs).
        set({
            likes: decrement(blogs.likes)
        })
        .where(eq(blogs.id, blogId))
    
    // quickly load like counter
    revalidatePath(`/blog/${blogId}`)
}


    async function handleDelete(){
        try{
            await deleteBlog({blogId})
            console.log('blogid to be deleted',blogId)   
            
            toast.success('Blog post successfully deleted!');
            router.push('/blog')
        }
        catch (error) {
            console.error('Error submitting form:', error);
            toast.error('Failed to create blog post. Please try again.');
        }

    }

export {createBlog , deleteBlog, updateBlog, likeBlog, dislikeBlog}
