import {formatDate} from '@/helpers/helper';
import React from 'react'

export default function Comment({
    written_by,
    created_at,
    detail,
}: CommentData) {
    
    const [formattedDate, formattedTime] = formatDate(created_at)

    return (
        <div className='w-full flex flex-col hover:bg-gray-100 hover:rounded-md  hover:p-4 hover:border'>
            <div className='flex flex-col md:flex-row md:justify-between gap-1 md:gap-2 text-sm text-gray-500'>
                <p>{written_by}</p>
                <p>Posted on {formattedDate} at {formattedTime}</p>
            </div>
            <p>{detail}</p>

        </div>
    )
}
