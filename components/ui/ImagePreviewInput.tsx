"use client"

import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import CustomSelect from './MultiSelect'
import { SingleValue, MultiValue } from 'react-select';

interface Option {
  value: string;
  label: string;
}

interface ImagePreviewInputProps {
  selectedImage: {value: string, label: string} | null;
  setSelectedImage: (image: {value: string, label: string} | null) => void;
}

export default function ImagePreviewInput(
    { selectedImage, setSelectedImage }: ImagePreviewInputProps
){
    const [imagePreview, setImagePreview] = useState("/assets/images/bg-1.jpg")
    const [imageOptions, setImageOptions] = useState<Option[]>([{value: 'bg-1.jpg', label:'bg-1.jpg'}])

    // Fetch images
    useEffect(() => {
    fetch('/api/images')
        .then(res => res.json())
        .then(images => {
        const options = images.map((img: string) => ({
            value: `${img}`,
            label: img
        }))
        setImageOptions(options)
        })
    }, [])

    // Fix the onChange handler with proper typing

    const handleImageSelect = (selectedOption: SingleValue<Option> | MultiValue<Option>) => {
    // Since isMulti={false}, we know it's SingleValue
        const option = selectedOption as SingleValue<Option>;
        
        if (!option) {
            setImagePreview("")
            setSelectedImage(null)
            return
        }

        setSelectedImage(option)
        setImagePreview(`/assets/images/${option.value}`)
        console.log("Selected image:", option.value)
    }

    return (
    <div>
        <CustomSelect
            options={imageOptions}
            isMulti={false}
            onChange={handleImageSelect}
            value={selectedImage}
            defaultValue={selectedImage}
            placeholder="Select an image..."
        />
            {
                imagePreview ? 
                <div className='mt-2 bg-slate-200 w-full lg:w-[1165px] h-30 md:h-70 lg:h-[600px] aspect-16/9 rounded-sm grow-0 relative overflow-hidden'>
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

