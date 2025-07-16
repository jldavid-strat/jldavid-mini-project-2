'use client'

import { startTransition, useOptimistic, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faHeartOutline } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import { dislikeBlog, likeBlog } from '@/db/actions/blogActions'
import { Fragment } from 'react'

interface LikeButtonProps {
  blogId: number
  iconSize: number
  likeCount: number
  initialLiked?: boolean
}

export default function LikeButton({ 
  blogId, 
  iconSize, 
  likeCount, 
  initialLiked = false 
}: LikeButtonProps) {
  const [isLiked, setLiked] = useState(initialLiked)
  const [optimisticLikes, addOptimisticLikes] = useOptimistic(
    { likeCount, sending: false },
    (state, action: { type: 'like' | 'unlike' }) => ({
      ...state,
      likeCount: action.type === 'like' 
        ? state.likeCount + 1 
        : state.likeCount - 1,
      sending: true,
    })
  )

  const handleLikeToggle = async () => {
    const newLikedState = !isLiked
    
    setLiked(newLikedState)
    
    startTransition(() => {
      addOptimisticLikes({
        type: newLikedState ? 'like' : 'unlike'
      })
    })

    try {
      if (newLikedState) {
        await likeBlog(blogId)
      } else {
        await dislikeBlog(blogId)
      }
    } catch (error) {
      setLiked(isLiked)
      console.error('Failed to update like counter:', error)
    }
  }

  return (
    <Fragment>
        <div className='flex flex-row justify-center items-center gap-2'>
            <button 
                onClick={handleLikeToggle}
                disabled={optimisticLikes.sending}
                className={optimisticLikes.sending ? 'opacity-50 flex justify-center' : 'flex justify-center'}
            >
                <FontAwesomeIcon
                icon={isLiked ? faHeartSolid : faHeartOutline}
                fontSize={iconSize}
                className="cursor-pointer"
                />
            </button>
            <div className="text-lg">{optimisticLikes.likeCount}</div>
        </div>
    </Fragment>
  )
}

