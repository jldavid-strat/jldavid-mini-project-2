import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface BlogCardProps {
    id: number;
    author: string;
    title: string;
    description: string;
    category: string;
    created_at: string;
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
    return (
        <Link 
            className={className}
            href={"/"}>
                <div className='flex flex-col max-w-70 border rounded-sm'>
                    {/* blog image */}
                    <div className='h-40 relative rounded-sm overflow-hidden'>
                        <Image
                            src="/assets/images/blog_image_example.jpg"
                            alt="blog image example"
                            fill
                        >
                        </Image>
                    </div>
                    {/* blog category */}
                    {/* blog details*/}
                    {/* blog author */}
                    {/* blog title */}
                    <div className='flex flex-col mt-2 gap-1'>
                        <p className='text-xs'> {author} <span className='font-bold'>·</span> {created_at} </p>
                        <h3 className='line-clamp-2 font-bold text-lg'>{title}</h3>
                        {/* preview text */}
                        <p className='text-xs line-clamp-3 mb-2'>{description}</p>
                        <p className='text-xs line-clamp-3 mb-2'>{category}</p>
                    </div>
                </div>
        </Link>
    )
}
