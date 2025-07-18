
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment as faCommentOutline} from '@fortawesome/free-regular-svg-icons';
import { faPenToSquare as faPenToSquareOutline} from '@fortawesome/free-regular-svg-icons';
import { faTrashCan as faTrashCanOutline} from '@fortawesome/free-regular-svg-icons';
import styles from '@/styles/StickyMenuBar.module.css';
import Link from 'next/link';
import { deleteBlog } from '@/db/actions/blogActions';
import { useRouter } from 'next/navigation'
import LikeButton from '../ui/LikeButton';
import toast from 'react-hot-toast';


export default function StickyMenuBar(
    {
        iconSize, 
        blogId, 
        likeCounter
    }: {iconSize: number, blogId:number, likeCounter: number}
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