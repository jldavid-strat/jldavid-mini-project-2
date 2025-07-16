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
    className?: string;
}

export default function BlogCard({
    author,
    className,
    title,
    description,
    category,
    created_at,
    }: BlogCardProps){

    const [formattedDate] = formatDate(created_at)
    return (
        <Link 
            className={className}
            href={"/"}>
                <div className='min-h-70 max-w-98 rounded-sm border-2 overflow-hidden hover:shadow-sm'>
                    <div className='h-[150px] relative overflow-hidden'>
                        <Image
                            src="/assets/images/bg-1.jpg"
                            alt="blog image example"
                            className='object-cover'
                            fill
                        >
                        </Image>
                    </div>
                    <div className='flex flex-col mt-2 gap-1 p-2'>
                        <p className='text-xs text-gray-500'> {author} <span className='font-bold'>·</span> {formattedDate} </p>
                        <h3 className='line-clamp-2 font-bold text-lg'>{title}</h3>
                        <p className='text-xs line-clamp-3 mb-2'>{description}</p>
                        <Badge>{category}</Badge>
                    </div>
                </div>
        </Link>
    )
}
