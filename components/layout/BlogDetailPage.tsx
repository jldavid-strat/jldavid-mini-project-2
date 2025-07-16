"use client"
import React, { useEffect, useRef, useState } from 'react'
import MarkdownContent from '@/components/ui/MardownContent';
import CommentForm from '@/components/layout/CommentForm';
import Comment from '@/components/ui/Comment';
import { Badge } from '@/components/ui/Badge';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment as faCommentOutline} from '@fortawesome/free-regular-svg-icons';
import { faPenToSquare as faPenToSquareOutline} from '@fortawesome/free-regular-svg-icons';
import { faTrashCan as faTrashCanOutline} from '@fortawesome/free-regular-svg-icons';
import styles from '@/styles/StickyMenuBar.module.css';
import Link from 'next/link';
import { deleteBlog } from '@/db/actions/blogActions';
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast';
import LikeButton from '../ui/LikeButton';


interface BlogProps {
  id: number;
  title: string;
  author: string;
  category: string;
  description: string;
  img_link: string;
  likes:number;
  content: string;
  created_at: Date;
  updated_at: Date | null;
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
}



function StickyMenuBar(
    {iconSize, blogId, likeCounter}: {iconSize: number, blogId:number, likeCounter: number}
){
    const router = useRouter()
    async function handleDelete(){
        try{
            console.log('blogid to be deleted',blogId)   
            await deleteBlog(blogId)
            
            toast.success('Blog post successfully deleted!');
            router.push('/blog')
        }
        catch (error) {
            console.error('Error submitting form:', error);
            toast.error('Failed to create blog post. Please try again.');
        }

    }
    return(
        <div className={`sticky bottom-5 w-[980px] z-50 ${styles.popIn}`}>
            <div className='rounded-full bg-black text-slate-50 h-12 w-68 mx-auto'>
                <div className='flex flex-row justify-center items-center w-full gap-4 h-full'>
                        <LikeButton
                            blogId={blogId}
                            likeCount={likeCounter}
                            iconSize={iconSize}
                        />
                    <div className='w-0.5 h-7 bg-white'></div>
                    <div>
                        <Link href='#comment-section'>
                            <FontAwesomeIcon icon={faCommentOutline} fontSize={iconSize} className='hover:scale-[1.5] cursor-pointer'/>
                        </Link>
                    </div>
                    <div className='w-0.5 h-7 bg-white'></div>
                    <div>
                        <Link href={`${blogId}/edit-blog`}>
                            <FontAwesomeIcon icon={faPenToSquareOutline} fontSize={iconSize} className='hover:scale-[1.5] cursor-pointer'/>
                        </Link>
                    </div>
                    <div className='w-0.5 h-7 bg-white'></div>
                    <div>
                        <button onClick={handleDelete}type='button'>
                            <FontAwesomeIcon icon={faTrashCanOutline} fontSize={iconSize} className='hover:scale-[1.5] cursor-pointer'/>
                        </button>
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
        <div className='mx-2 lg:mx-auto mt-8 max-w-[980px]'>
            <div ref={startRef}  className='mb-4 group flex flex-col md:relative md:flex-row-reverse justify-between'>
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
            <div className='mt-2 mb-4 bg-slate-200 w-full lg:w-[980x] h-30 md:h-70 lg:h-[250px] aspect-16/9 rounded-sm grow-0 relative overflow-hidden'>
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
            <div className='mt-8 w-full border mb-4'></div>
            <h3 id='comment-section' className='mb-4 text-2xl font-bold'>Comments</h3>
            <section className='grid grid-cols-1 gap-4 mb-10 '>
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
                showToolbar && <StickyMenuBar iconSize={iconSize} blogId={blog.id} likeCounter={blog.likes}/>
            }
            <div ref={endRef} className='w-full h-20'>
                
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

