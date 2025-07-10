import React from 'react'
import { Label } from '@/components/ui/Label'
import { Input } from '@/components/ui/Input'
import ImagePreviewInput from '@/components/ui/ImagePreviewInput'
import MarkdownEditor from '@/components/ui/MardownEditor'

export default function Page(){
  return (
    <div>
        <div className='mt-4 border rounded-sm p-4'>
          <h2 className='text-2xl font-bold mb-2'>Create New Blog</h2>
          
          <form action="" className='flex flex-col gap-y-3'>
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
                <Label htmlFor='content'>Content</Label>
                <span className='text-red-700'>*</span>
              </div>
              <MarkdownEditor/>
            </div>
          </form>
        </div>
    </div>
  )
}
