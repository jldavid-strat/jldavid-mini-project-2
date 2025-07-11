import React from 'react'


export default function Comment(){
    return (
        <div className='w-full flex flex-col'>
            <div className='flex flex-col md:flex-row md:justify-between gap-1 md:gap-2 text-sm text-gray-500'>
                <p>Anonymous</p>
                <p className='pr-10'>Written on July 11, 2025 at 11:56 AM</p>
            </div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque repudiandae sunt, vitae et con.</p>

        </div>
    )
}
