import React from 'react'


interface CommentProps {
    name: string;
    created_at: Date;
    message: string;
}

export default function Comment({
    name,
    created_at,
    message,
}: CommentProps) {
    return (
        <div className='w-full flex flex-col'>
            <div className='flex flex-col md:flex-row md:justify-between gap-1 md:gap-2 text-sm text-gray-500'>
                <p>{name}</p>
                <p className='pr-10'>{created_at.toLocaleString()}</p>
            </div>
            <p>{message}</p>

        </div>
    )
}
