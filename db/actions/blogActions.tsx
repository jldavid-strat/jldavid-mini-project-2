"use server"

import { AnyColumn, eq, inArray, sql } from "drizzle-orm";
import { db } from "../db"
import { blogs, comments, comments_to_blogs } from "../schema"
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


async function deleteBlog(blogId: number) {
    try {
        // get all comments in this blog
        const commentIds = await db
        .select({ comment_id: comments_to_blogs.comment_id })
        .from(comments_to_blogs)
        .where(eq(comments_to_blogs.blog_id, blogId));
        
        if (commentIds.length === 0) {
            return { success: true, message: 'No comments to delete' };
        }
        
        const commentIdArray = commentIds.map(c => c.comment_id);

        // delete from comments in comments-to-blog
        await db
        .delete(comments_to_blogs)
        .where(eq(comments_to_blogs.blog_id, blogId));
        
        // Then delete the actual comments
        await db
        .delete(comments)
        .where(inArray(comments.id, commentIdArray));
        
        // finally delete the actual blog
        await db.delete(blogs).where(eq(blogs.id,blogId))

        // revalidate the blog page to reflect changes
        revalidatePath(`/blog/${blogId}`);
        
        return { success: true, message: `Deleted ${commentIds.length} comments` };
    } catch (error) {
        console.error('Error deleting blog comments:', error);
        return { success: false, error: 'Failed to delete comments' };
  }
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


async function getFeaturedBlogs() {
    try {
        let featuredBlogs = await db
            .select()
            .from(blogs)
            .orderBy(blogs.likes, blogs.created_at)
            .limit(4);
        
        // If no featured blogs, get any 4 recent blogs as fallback
        if (featuredBlogs.length === 0) {
            featuredBlogs = await db
                .select()
                .from(blogs)
                .orderBy(blogs.created_at)
                .limit(4);
        }
        
        // If still no blogs, create placeholder data
        if (featuredBlogs.length === 0) {
            featuredBlogs = [
                {
                    id: 111,
                    title: 'Welcome to Our Blog',
                    content: 'Coming soon...',
                    likes: 0,
                    category:'software',
                    author: 'Juan Dela Cruz',
                    description: 'Coming soon',
                    img_link:'/assets/default/default.jpg',
                    created_at: new Date(),
                    updated_at: new Date()
                }
            ];
        }
              
        return { success: true, message: `Retrieved featured blogs`, data: featuredBlogs };
    } catch (error) {
        console.error('Error retrieving featured blog:', error);
        
        // Return placeholder data even on error
        return { 
            success: true, 
            message: 'Using placeholder data',
            data: [
                {
                    id: 111,
                    title: 'Welcome to Our Blog',
                    content: 'Coming soon...',
                    likes: 0,
                    category:'software',
                    author: 'Juan Dela Cruz',
                    description: 'Coming soon',
                    img_link:'/assets/default/default.jpg',
                    created_at: new Date(),
                    updated_at: new Date()
                }
            ]
        };
    }
}

export {createBlog , deleteBlog, updateBlog, likeBlog, dislikeBlog, getFeaturedBlogs}
