"use client"

import React  from 'react'
import { Label } from '@/components/ui/Label'
import { Input } from '@/components/ui/Input'
import ImagePreviewInput from '@/components/ui/ImagePreviewInput'
import MarkdownEditor from '@/components/ui/MardownEditor'
import { mkdStr } from '@/components/ui/MardownEditor'
import createBlog from '@/db/actions/blogActions'

// interface BlogForm {
//   title: string;
//   author: string;
//   category: string;
//   tags: string;
//   description: string;
//   image_link: string;
//   content: string;
// }


export default function Page(){

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title") as string,
      author: formData.get("author") as string,
      description: formData.get("description") as string,
      category: formData.get("category") as string,
      // tags: formData.get("tags") as string,
      image_link: '/assets/images/blog_image_example.jpg' as string,
      content: mkdStr as string,
      created_at: new Date(),
    };

    console.log("Submitted:", data);
    await createBlog(data);
    console.log("successfully submitted data");
  };



  return (
    <div>
        <div className='mt-4 border rounded-sm p-4'>
          <h2 className='text-2xl font-bold mb-2'>Create New Blog</h2>
          
          <form onSubmit={handleSubmit} className='flex flex-col gap-y-3'>
            {/* title */}
            <div>
              <div className='inline-flex gap-1'>
                <Label htmlFor='title'>Title</Label>
                <span className='text-red-700'>*</span>
              </div>
              <Input name='title' type='text' placeholder='Title'></Input>
            </div>
            {/* author */}
            <div>
              <div className='inline-flex gap-1'>
                <Label htmlFor='author'>Author</Label>
                <span className='text-red-700'>*</span>
              </div>
              <Input name='author' type='text' placeholder='Author'></Input>
            </div>
            <div>
              <div className='inline-flex gap-1'>
                <Label htmlFor='description'>Description</Label>
                <span className='text-red-700'>*</span>
              </div>
              <Input name='description' type='text' placeholder='Write a brief description...'></Input>
            </div>
            {/* category */}
            <div>
              <div className='inline-flex gap-1'>
                <Label htmlFor='category'>Category</Label>
                <span className='text-red-700'>*</span>
              </div>
              <Input name='category' type='text' placeholder='software etc.'></Input>
            </div>
            {/* tags */}
            <div>
              <div className='inline-flex gap-1'>
                <Label htmlFor='tags'>Tags</Label>
                <span className='text-red-700'>*</span>
              </div>
              <Input name='tags' type='text' placeholder='programming, ui/ux, etc.'></Input>
            </div>
            {/* cover_image */}
            <div>
              <div className='inline-flex gap-1'>
                <Label htmlFor='cover-image'>Cover Image</Label>
                <span className='text-red-700'>*</span>
              </div>
              <ImagePreviewInput/>

            </div>

            {/* content */}
            <div>
              <div className='inline-flex gap-1'>
                <Label htmlFor='content'>Content (Formatted as Markdown)</Label>
                <span className='text-red-700'>*</span>
              </div>
              <MarkdownEditor/>
            </div>
            <div className='flex flex-row-reverse gap-2'>
              <button type="submit" className='border border-black w-fit p-2 rounded-2xl font-bold'>Create Blog</button>
              <button className='border border-red-400 w-fit p-2 rounded-2xl font-bold'>Cancel</button>
            </div>
          </form>
        </div>
    </div>
  )
}
