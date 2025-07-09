import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function BlogCard(){
    return (
        <Link 
            className='flex flex-col max-w-70 border rounded-sm'
            href={"/"}>
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
                    <p className='text-xs'>Daiki Daikigan <span className='font-bold'>·</span> Jun 25, 2025</p>
                    <h3 className='line-clamp-2 font-bold text-lg'>Blog Title</h3>
                    {/* preview text */}
                    <p className='text-xs line-clamp-3 mb-2'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum sunt tempore, similique reiciendis nesciunt aliquam corporis! Aliquam ipsum quod consectetur.</p>
                </div>
        </Link>
    )
}
