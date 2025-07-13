"use server";

import { desc, eq } from "drizzle-orm";
import { db } from "../db";
import { comments, comments_to_blogs } from "../schema";
import { revalidatePath } from "next/cache";


export async function addComment(formData: FormData,){

    const writtenBy = formData.get('name') || "Anonymous";

    const [insertedComment] = await db.insert(comments)
        .values({
            written_by: writtenBy as string,
            detail: formData.get('message') as string,
            created_at: new Date(),
        })
        .returning({ id: comments.id }); 
    revalidatePath(`/blog/${formData.get('blogId')}`)

    const commentId = insertedComment.id;

    await db.insert(comments_to_blogs).values({
        blog_id: Number(formData.get("blogId")),
        comment_id: commentId,
        
    })
}

export async function getCommentsByBlogId(blogId: number){
    const resultSet = await db.select({
        written_by: comments.written_by,
        detail: comments.detail,
        created_at: comments.created_at,
    })
    .from(comments)
    .leftJoin(comments_to_blogs, eq(comments.id, comments_to_blogs.comment_id))
    .where(eq(comments_to_blogs.blog_id, blogId))
    .orderBy(desc(comments.created_at))

    return resultSet
}