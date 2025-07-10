import React from 'react'
import { Label } from '@/components/ui/Label'
import { Input } from '@/components/ui/Input'
import MarkdownEditor from '@/components/ui/MardownEditor'

export default function Page(){
  return (
    <div>
        <div className='mt-4 border rounded-sm p-4'>
          <h2 className='text-xl font-bold'>Create New Blog</h2>
          
          <form action="">
            {/* title */}
            <div className='inline-flex gap-1'>
              <Label htmlFor='title'>Title</Label>
              <span className='text-red-700'>*</span>
            </div>
            <Input name='title' type='text' placeholder='Ttile'></Input>
            {/* author */}
            <div className='inline-flex gap-1'>
              <Label htmlFor='author'>Author</Label>
              <span className='text-red-700'>*</span>
            </div>
            <Input name='author' type='text' placeholder='Author'></Input>
            {/* category */}
            {/* tags */}
            {/* cover_image */}
            {/* content */}
            <div className='inline-flex gap-1'>
              <Label htmlFor='content'>Content</Label>
              <span className='text-red-700'>*</span>
            </div>
            <MarkdownEditor/>
          </form>
        </div>
    </div>
  )
}

