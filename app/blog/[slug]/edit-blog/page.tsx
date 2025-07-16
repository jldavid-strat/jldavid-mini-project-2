import BlogForm from '@/components/ui/BlogForm'
import { db } from '@/db/db'
import { blogs } from '@/db/schema'
import { EditBlogPageMetadata } from '@/helpers/generateMetadata'
import { eq } from 'drizzle-orm'
import React from 'react'

type BlogDetailPageProps = {
    params: {
        slug: string;
    }
}

export async function generateMetadata(){
    return EditBlogPageMetadata()
}

export default async function EditBlogPage({ params }: BlogDetailPageProps) {
    
    const param = await params
    const blogId = parseInt(param.slug);

    if (isNaN(blogId)) {
        return <div>Invalid blog ID</div>;
    }

    const blogToEdit = await db
        .select()
        .from(blogs)
        .where(eq(blogs.id, blogId))
        .then((res) => res[0]);

    if (!blogToEdit) {
        return <div>Blog not found</div>;
    }

    return (
    <div>
        <BlogForm BlogData={blogToEdit} />
    </div>
    );
}