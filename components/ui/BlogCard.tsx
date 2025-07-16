import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Badge } from './Badge';
import {formatDate} from '@/helpers/helper';

interface BlogCardProps {
    id: number;
    author: string;
    title: string;
    description: string;
    category: string;
    created_at: Date;
    img_link: string;
    className?: string;
}

export default function BlogCard({
    id,
    author,
    className,
    title,
    description,
    category,
    img_link,
    created_at,
    }: BlogCardProps){

    const [formattedDate] = formatDate(created_at)
    return (
        <Link 
            className={className}
            href={`/blog/${id}`}>
                <div className='h-80 max-w-98 rounded-sm border-2 overflow-hidden hover:shadow-sm flex flex-col'>
                    <div className='h-[150px] relative overflow-hidden flex-shrink-0'>
                        <Image
                            src={`/assets/images/${img_link}`}
                            alt="blog image example"
                            className='object-cover'
                            fill
                        />
                    </div>
                    <div className='flex flex-col mt-2 gap-1 p-2 flex-1'>
                        <p className='text-xs text-gray-500'> {author} <span className='font-bold'>·</span> {formattedDate} </p>
                        <h3 className='line-clamp-2 font-bold text-lg'>{title}</h3>
                        <p className='text-xs line-clamp-3 mb-2 flex-1'>{description}</p>
                        <Badge className='mt-auto mb-2'>{category}</Badge>
                    </div>
                </div>
        </Link>
    )
}
