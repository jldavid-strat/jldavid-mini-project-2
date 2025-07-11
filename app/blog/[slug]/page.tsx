import React from 'react'
import { db } from '@/db/db';
import { blogs } from '@/db/schema';
import { eq } from 'drizzle-orm';
import MarkdownContent from '@/components/ui/MardownContent';
// import Image from 'next/image';
import CommentForm from '@/components/layout/CommentForm';
import Comment from '@/components/ui/Comment';
import { getCommentsByBlogId } from '@/db/actions/commentActions';

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


    if(!blog) return (
        <div className='text-xl bg-slate-400 text-red w-100 h-100 justify-center items-center'>
            Blog not found
        </div>
    );
    
    return (
        <div className='mx-2 lg:mx-auto mt-2 max-w-[980px]'>
            <header className='flex flex-row justify-between items-center'>
                <h2 className='text-3xl font-bold'>{blog.title}</h2>
                <p className='p-4'>{blog.category}</p>
            </header>
            <div className='h-40 min-w-[300px] bg-slate-500 rounded-sm'>
            </div>
            <section className='flex flex-row gap-1'>
                <p>{blog.author}</p>
                <p>{blog.created_at.toString()}</p>
            </section>
            <p>tags</p>
            <div className='w-full border mb-4'></div>
            {/* render content ast markdown */}
            <MarkdownContent source={blog.content} colorMode='light'/>
            <div className='mt-8 w-full border mb-4'></div>
            <h3 className='mb-4 text-2xl font-bold'>Leave a Comment</h3>
            <CommentForm
                blogId={blog.id}
            />
            <div className='mt-8 w-full border mb-4'></div>
            <h3 className='mb-4 text-2xl font-bold'>Comments</h3>
            <section className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {
                    commentList 
                        ? Object.values(commentList).map(
                            (comment, index) => 
                            (       
                            <Comment
                                key={index}
                                name={comment.written_by}
                                message={comment.detail}
                                created_at={comment.created_at}
                            />
                        ) 
                    ):
                    (
                        <div>No Comments</div>
                    )
                }
            </section>
            <h3>Related Blogs</h3>
        </div>
    )
}

