"use client"
import React, { useEffect, useRef, useState } from 'react'
import MarkdownContent from '@/components/ui/MardownContent';
import CommentForm from '@/components/layout/CommentForm';
import Comment from '@/components/ui/Comment';
import { Badge } from '@/components/ui/Badge';
import Image from 'next/image';
import Link from 'next/link';
import StickyMenuBar from '../ui/StickyMenuBar';
import { Toaster } from 'react-hot-toast';



interface ExtendedBlogProps {
  blog: Blog;
  commentList: CommentData[];
  formattedDate: string;
}

export default function BlogDetailPage ({
    blog,
    commentList, 
    formattedDate, 
}: ExtendedBlogProps) {

    const startRef = useRef<HTMLDivElement | null>(null);
    const endRef = useRef<HTMLDivElement | null>(null);
    const [showToolbar, setShowToolbar] = useState(false);
    const iconSize = 20

    useEffect(() => {
        const handleScroll = () => {
            const start = startRef.current?.getBoundingClientRect().top ?? 0;
            const end = endRef.current?.getBoundingClientRect().top ?? 0;

            console.log(start, end)

            // start showing menu bar at "280" the max height of cover image
            if (start < (280) && end > 60) {
                setShowToolbar(true);
            } else {
                setShowToolbar(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // remove event listener to avoid unexpected behavior
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

  
    return (
        <div className='mx-2 lg:mx-auto mt-8 max-w-[980px]'>
            <div className='mb-4 group flex flex-col md:relative md:flex-row-reverse justify-between'>
                <div className='min-w-[300px] max-w-[600px] mx-auto flex flex-col justify-center items-center'>
                    <Badge className='mb-2'><p>{blog.category}</p></Badge>
                    <h2 className='text-3xl font-bold text-center'>{blog.title}</h2>
                    <section className='mt-6 mb-2 flex flex-row gap-2 text-gray-500'>
                        <p>By {blog.author}</p>
                        <p>|</p>
                        <p>{formattedDate}</p>
                    </section>
                </div>
                <div className='flex flex-row gap-3 justify-center md:absolute md:mt-3 z-10'>
                    <Link href={`/blog/${blog.id}/edit-blog`}>
                        <div className='opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer no-underline hover:underline hover:underline-offset-4 text-black font-bold'>Edit</div>
                    </Link>
                    <div className='opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer hover:underline
                    hover:underline-offset-4 text-black font-bold'>Delete</div>
                </div>
            </div>
            <div ref={startRef} className='mt-2 mb-4 bg-slate-200 w-full lg:w-[980x] max-h-70 aspect-16/9 rounded-sm grow-0 relative overflow-hidden'>
                <Image
                    src={`/assets/images/${blog.img_link}`}
                    alt='uploaded cover image preview'
                    fill
                    className='object-cover'
                />
            </div>


            {/* content rendered as markdown */}
            <MarkdownContent source={blog.content} colorMode='light'/>
            <div className='mt-8 w-full border mb-4'></div>
            <h3 className='mb-4 text-2xl font-bold'>Leave a Comment</h3>
            <CommentForm
                blogId={blog.id}
                />
            <div ref={endRef} className='mt-8 w-full border mb-4'></div>
            <h3 id='comment-section' className='mb-4 text-2xl font-bold'>Comments</h3>
            <section className='grid grid-cols-1 gap-4 mb-10 '>
                {
                    commentList.length > 0 
                    ? Object.values(commentList).map(
                        (comment, index) => 
                            (       
                                <Comment
                                    key={index}
                                    written_by={comment.written_by}
                                    detail={comment.detail}
                                    created_at={comment.created_at}
                                />
                            ) 
                        ):
                        (
                            <div className='w-full text-gray-500'>No Comments</div>
                    )
                }
            </section>
            {
                showToolbar && <StickyMenuBar iconSize={iconSize} blogId={blog.id} likeCounter={blog.likes}/>
            }
            <div className='w-full h-20'>
                
            </div>
            

            {/* <h3>Related Blogs</h3> */}

            <Toaster 
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
         />
        </div>

)
}

