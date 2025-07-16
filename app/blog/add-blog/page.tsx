"use client"

import React, {useRef, useState}  from 'react'
import { Input } from '@/components/ui/Input'
import { CustomLabel } from '@/components/ui/Label'
import ImagePreviewInput from '@/components/ui/ImagePreviewInput'
import MarkdownEditor from '@/components/ui/MardownEditor'
import {createBlog} from '@/db/actions/blogActions'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

interface Option {
  value: string;
  label: string;
}

export default function AddBlogPage(){

  const [markdownContent, setMarkdownContent] = useState("") 
  const [selectedImage, setSelectedImage] = useState<Option | null>(null)
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter()

  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        title: formData.get("title") as string,
        author: formData.get("author") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        image_filename: `${selectedImage?.value}` || 'default.jpg',
        content: markdownContent as string,
        created_at: new Date(),
      }

      console.log("Submitted:", data);
      const newBlogId = await createBlog(data);
    
      // reset the form
      formRef.current?.reset();
      setSelectedImage(null);
      setMarkdownContent('');
      
      toast.success('Blog post created successfully!');
      console.log("successfully submitted data");

      router.push(`/blog/${newBlogId}`)
      
    } 
    catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to create blog post. Please try again.');
    }
  }



  return (
    <div>
        <div className='mt-4 border rounded-sm p-4'>
          <h2 className='text-2xl font-bold mb-2'>Create New Blog</h2>
          
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
                  required></Input>
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
              <button type="submit" className='border border-black w-fit p-2 rounded-2xl font-bold cursor-pointer'>Create Blog</button>
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
