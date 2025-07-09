import React from 'react'

export default function Navbar(){
    return (
        <nav className='w-full p-4 bg-black text-white font-bold'>
            <div className='flex justify-between'>
                <header>thinkthread</header>
                <div className='flex gap-2'>
                    <p>Home</p>
                    <p>Blogs</p>
                </div>
            </div>
        </nav>
    )
}