"use client"

import React, {useState} from 'react'
import Image from 'next/image'
import { Input } from './Input'

export default function ImagePreviewInput(){
    const [imagePreview, setImagePreview] = useState("")

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return console.log("No image uploaded")

        const previewUrl = URL.createObjectURL(file)
        console.log(previewUrl)
        setImagePreview(previewUrl)
    }
    
    return (
        <div>
            <Input 
                name='cover-image' 
                type='file' 
                accept='image'
                multiple={false}
                onChange={handleImageUpload}
            >
            </Input>
            {
                imagePreview ? 
                <div className='mt-2 bg-slate-200 min-w-50 h-50 rounded-sm relative overflow-hidden'>
                    <Image
                        src={imagePreview}
                        alt='uploaded cover image preview'
                        fill
                        className='object-cover'
                    />
                </div>
                :
                <div className='mt-2 bg-slate-200 min-w-50 h-50 rounded-sm text-xs flex text-center text-slate-500 items-center justify-center'>
                    Your image preview will be displayed here
                </div>
            }
        </div>
    )
}

