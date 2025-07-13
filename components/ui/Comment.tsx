import {formatDate} from '@/helpers/helper';
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
    
    const [formattedDate, formattedTime] = formatDate(created_at)

    return (
        <div className='w-full flex flex-col hover:bg-gray-100 hover:rounded-md  hover:p-4 hover:border'>
            <div className='flex flex-col md:flex-row md:justify-between gap-1 md:gap-2 text-sm text-gray-500'>
                <p>{name}</p>
                <p>Posted on {formattedDate} at {formattedTime}</p>
            </div>
            <p>{message}</p>

        </div>
    )
}
