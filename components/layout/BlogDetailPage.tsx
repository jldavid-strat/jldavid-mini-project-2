"use client"
import React, { useEffect, useRef, useState } from 'react'
import MarkdownContent from '@/components/ui/MardownContent';
import CommentForm from '@/components/layout/CommentForm';
import Comment from '@/components/ui/Comment';
import { Badge } from '@/components/ui/Badge';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartOutline } from '@fortawesome/free-regular-svg-icons';
import { faComment as faCommentOutline} from '@fortawesome/free-regular-svg-icons';
import { faPenToSquare as faPenToSquareOutline} from '@fortawesome/free-regular-svg-icons';
import { faEdit as faEditOutline} from '@fortawesome/free-regular-svg-icons';
import { faTrashCan as faTrashCanOutline} from '@fortawesome/free-regular-svg-icons';
import styles from '@/styles/StickyToolBar.module.css';


interface BlogProps {
  id: number;
  title: string;
  author: string;
  category: string;
  description: string;
  img_link: string;
  content: string;
}

interface Comment{
    written_by: string;
    detail:string;
    created_at: Date;
}

interface ExtendedBlogProps {
  blog: BlogProps;
  commentList: Comment[];
  formattedDate: string;
  formattedTime: string;
}



function StickyToolBar(
    {iconSize}: {iconSize: number}
){
    return(
        <div className={`sticky bottom-5 w-[980px] border z-50 ${styles.popIn}`}>
            <div className='rounded-full bg-black text-slate-50 h-12 w-68 mx-auto border border-red-400'>
                <div className='flex flex-row justify-center items-center w-full gap-4 border border-red-400 h-full'>
                    <div className='flex flex-row justify-center items-center gap-2'>
                        <FontAwesomeIcon icon={faHeartOutline} fontSize={iconSize}/>
                        <div className='text-lg'>1</div>
                    </div>
                    <div className='w-0.5 h-7 bg-white'></div>
                    <div>
                        <FontAwesomeIcon icon={faCommentOutline} fontSize={iconSize}/>
                    </div>
                    <div className='w-0.5 h-7 bg-white'></div>
                    <div>
                        <FontAwesomeIcon icon={faPenToSquareOutline} fontSize={iconSize}/>
                    </div>
                    <div className='w-0.5 h-7 bg-white'></div>
                    <div>
                        <FontAwesomeIcon icon={faTrashCanOutline} fontSize={iconSize}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function BlogDetailPage ({
    blog,
    commentList, 
    formattedDate, 
    formattedTime,
}: ExtendedBlogProps) {

    const startRef = useRef<HTMLDivElement | null>(null);
    const endRef = useRef<HTMLDivElement | null>(null);
    const [showToolbar, setShowToolbar] = useState(false);
    const iconSize = 20

    useEffect(() => {
        const handleScroll = () => {
        const start = startRef.current?.getBoundingClientRect().top ?? 0;
        const end = endRef.current?.getBoundingClientRect().top ?? 0;

        if (start < 0 && end > 60) {
            setShowToolbar(true);
        } else {
            setShowToolbar(false);
        }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

  
    return (
        <div className='mx-2 lg:mx-auto mt-6 max-w-[980px] border'>
            <div ref={startRef}  className='mb-2 group flex flex-col md:relative md:flex-row-reverse justify-between'>
                <div className='w-full'>
                    <h2 className='text-3xl font-bold text-center'>{blog.title}</h2>
                </div>
                <div className='flex flex-row gap-3 justify-center md:absolute md:mt-3 z-10'>
                    <div className='opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer no-underline hover:underline hover:underline-offset-4 text-black font-bold'>Edit</div>
                    <div className='opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer hover:underline
                    hover:underline-offset-4 text-black font-bold'>Delete</div>
                </div>
            </div>
            <div className='mt-2 bg-slate-200 w-full lg:w-[980x] h-30 md:h-70 lg:h-[600px] aspect-16/9 rounded-sm grow-0 relative overflow-hidden'>
                <Image
                    src={`/assets/images/${blog.img_link}`}
                    alt='uploaded cover image preview'
                    fill
                    className='object-cover'
                />
            </div>


            <section className='mt-2 mb-2 flex flex-col md:flex-row md:justify-between gap-1'>
                <div className='flex flex-col gap-1'>
                    <p>Published by <span className='font-bold'>{blog.author}</span></p>
                    <Badge>
                        <p>{blog.category}</p>
                    </Badge>
                </div>
                <div className='flex flex-col md:text-right'>
                    <p>{formattedDate}</p>
                    <p>{formattedTime}</p>
                </div>
            </section>


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
            <section className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-10'>
                {
                    commentList.length > 0 
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
                            <div className='w-full text-gray-500'>No Comments</div>
                    )
                }
            </section>
            {
                showToolbar && <StickyToolBar iconSize={iconSize}/>
            }
            <div ref={endRef} className='w-full h-100'>
                    should end here
            </div>

            {/* <h3>Related Blogs</h3> */}
        </div>

)
}

