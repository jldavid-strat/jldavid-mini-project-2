"use client"

import React, {useRef, useState}  from 'react'
import { Input } from '@/components/ui/Input'
import { CustomLabel } from '@/components/ui/Label'
import ImagePreviewInput from '@/components/ui/ImagePreviewInput'
import MarkdownEditor from '@/components/ui/MardownEditor'
import {createBlog, updateBlog} from '@/db/actions/blogActions'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

interface Option {
  value: string;
  label: string;
}

interface BlogProps {
  id: number;
  title: string;
  author: string;
  category: string;
  description: string;
  img_link: string;
  content: string;
}

export default function BlogForm({BlogData}:{BlogData?: BlogProps}){

    // get the file name from the filepath (i.e 'assets/images/${filename}')
    console.log(BlogData)
    const [markdownContent, setMarkdownContent] = useState(BlogData?.content ?? "")
    const [selectedImage, setSelectedImage] = useState<Option | null>(
    BlogData
        ? { label: BlogData.img_link, value: BlogData.img_link }
        : null
    )

    const formRef = useRef<HTMLFormElement>(null)
    const router = useRouter()


    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = {
            title: formData.get("title") as string,
            author: formData.get("author") as string,
            description: formData.get("description") as string,
            category: formData.get("category") as string,
            image_filename: selectedImage?.value || '/assets/default/default_cover_image.jpg',
            content: markdownContent,
            created_at: new Date(),
        }

        try {
            if (BlogData) {
                await updateBlog(BlogData.id, data);
                toast.success('Blog post updated!');
                router.push(`/blog/${BlogData.id}`);
            }
            else {
                const newBlogId = await createBlog(data);
                toast.success('Blog post created!');
                formRef.current?.reset();
                setSelectedImage(null);
                setMarkdownContent('');
                router.push(`/blog/${newBlogId}`);
            }
        } 
        catch (error) {
                console.error('Error submitting form:', error);
                toast.error('Failed to save blog post.');
            }
    }

    return (
        <div>
            <div className='mt-4 border rounded-sm p-4'>
                <h2 className='text-2xl font-bold mb-2'>
                    {BlogData ? 'Edit Blog Post' : 'Create New Blog'}
                </h2>
                
                <form ref= {formRef} onSubmit={handleSubmit} className='flex flex-col gap-y-3'>
                {/* title */}
                <div className='grid grid-cols-1 md:grid-cols-2 md:gap-8 gap-y-3'>
                    <div>
                    <CustomLabel
                        htmlFor='title'
                        label='Title'
                        required={true}
                    />
                    <Input 
                        name='title' 
                        type='text' 
                        placeholder='Title'
                        defaultValue={BlogData?.title}
                        required
                    ></Input>
                    </div>
                    {/* author */}
                    <div>
                    <CustomLabel
                        htmlFor='author'
                        label='Author'
                        required={true}
                    />
                    <Input 
                        name='author' 
                        type='text' 
                        placeholder='Author'
                        defaultValue={BlogData?.author}
                        required
                    ></Input>
                    </div>
                </div>
                {/* description & category */}
                <div className='grid grid-cols-1 md:grid-cols-2 md:gap-8 gap-y-3 '>
                    <div>
                    <CustomLabel
                        htmlFor='description'
                        label='Description'
                        required={true}
                    />
                    <Input 
                        name='description' 
                        type='text' 
                        placeholder='Write a brief description...'
                        defaultValue={BlogData?.description}
                        required
                    ></Input>
                    </div>
                    <div>
                    <CustomLabel
                        htmlFor='category'
                        label='Category'
                        required={true}
                        />
                    <Input 
                        name='category' 
                        type='text' 
                        placeholder='programming, ui/ux, etc.' 
                        required
                        defaultValue={BlogData?.category}
                        ></Input>
                    </div>
                </div>
                {/* cover_image */}
                <div>
                    <CustomLabel
                    htmlFor='cover-image'
                    label='Cover Image (JPEG, JPG, PNG)'
                    required={true}
                    />
                    <ImagePreviewInput 
                        selectedImage={selectedImage}
                        setSelectedImage={setSelectedImage}
                    />
                </div>

                {/* markdown content */}
                <div>
                    <CustomLabel
                    htmlFor='content'
                    label='Content (written in Markdown)'
                    required={true}
                    />
                    <MarkdownEditor value={markdownContent} onValueChange={setMarkdownContent}/>
                </div>
                <div className='flex flex-row-reverse gap-2'>
                    <button type="submit" className='border border-black w-fit p-2 rounded-2xl font-bold cursor-pointer'>
                        {BlogData ? "Edit Blog": "Create Blog"}
                    </button>
                    <button className='border border-red-400 w-fit p-2 rounded-2xl font-bold cursor-pointer'>Cancel</button>
                </div>
                </form>
                <Toaster 
                position="top-center"
                toastOptions={{
                    duration: 4000,
                    style: {
                    background: '#363636',
                    color: '#fff',
                    },
                }}
                />
            </div>
        </div>
    )
}