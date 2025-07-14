import React from 'react'
import { db } from '@/db/db';
import { blogs } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getCommentsByBlogId } from '@/db/actions/commentActions';
import {formatDate} from '@/helpers/helper';

import BlogDetailPage from '@/components/layout/BlogDetailPage';

type BlogDetailPageProps = {
    params: {
        slug: string;
    }
}

export default async function BlockDetailPage({params} : BlogDetailPageProps){
    const slug = await params
    const blogId = parseInt(slug.slug)
    const commentList = await getCommentsByBlogId(blogId)
    
    if (isNaN(blogId)) return (
        <div className='text-xl bg-slate-400 text-red w-100 h-100 justify-center items-center'>
            Page not Found
        </div>
    );
    
    const blogResult = await db.select().from(blogs).where(eq(blogs.id, blogId))
    const blog = blogResult[0]
    
    const [formattedDate, formattedTime] = formatDate(blog.created_at)
    
    if(!blog) return (
        <div className='text-xl bg-slate-400 text-red w-100 h-100 justify-center items-center'>
            Blog not found
        </div>
    );
    
    return (
        <BlogDetailPage
            blog={blog}
            commentList={commentList}
            formattedDate={formattedDate}
            formattedTime={formattedTime}
        />
    )
}

