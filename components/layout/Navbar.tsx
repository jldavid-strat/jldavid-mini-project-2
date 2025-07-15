import React from 'react'
import Link from 'next/link'

export default function Navbar(){
    return (
        <header className='bg-black'>
            <nav className='max-w-[1200px] mx-2 lg:mx-auto py-4 text-white font-bold'>
                <div className='flex justify-between items-center'>
                    <Link href={'/'}>
                        <h1>thinkthread</h1>
                    </Link>
                    <div className='flex gap-6 items-center'>
                        <Link
                            href={'/blog/add-blog'}
                        >
                            <div className='bg-white rounded-2xl text-black text-xs p-2'>
                                <p>Add Blog</p>
                            </div>
                        </Link>
                        <Link href={'/blog'}>
                            <p>Blogs</p>
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    )
}