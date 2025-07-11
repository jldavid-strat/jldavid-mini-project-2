"use client"

import React, {useState}  from 'react'
import { Input } from '@/components/ui/Input'
import { CustomLabel } from '@/components/ui/Label'
import ImagePreviewInput from '@/components/ui/ImagePreviewInput'
import MarkdownEditor from '@/components/ui/MardownEditor'
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


export default function AddBlogPage(){

  const [markdownContent, setMarkdownContent] = useState("");

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
      content: markdownContent as string,
      created_at: new Date(),
    };
    console.log(data.content)

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
              <CustomLabel
                htmlFor='title'
                label='Title'
                required={true}
              />
              <Input name='title' type='text' placeholder='Title'></Input>
            </div>
            {/* author */}
            <div>
              <CustomLabel
                htmlFor='author'
                label='Author'
                required={true}
              />
              <Input name='author' type='text' placeholder='Author'></Input>
            </div>
            <div>
              <CustomLabel
                htmlFor='description'
                label='Description'
                required={true}
              />
              <Input name='description' type='text' placeholder='Write a brief description...'></Input>
            </div>
            {/* category */}
            <div>
              <CustomLabel
                htmlFor='category'
                label='Category'
                required={true}
              />
              <Input name='category' type='text' placeholder='software etc.'></Input>
            </div>
            {/* tags */}
            <div>
              <CustomLabel
                htmlFor='tags'
                label='Tags'
                required={false}
              />
              <Input name='tags' type='text' placeholder='programming, ui/ux, etc.'></Input>
            </div>
            {/* cover_image */}
            <div>
              <CustomLabel
                htmlFor='cover-image'
                label='Cover Image (JPEG, JPG, PNG)'
                required={true}
              />
              <ImagePreviewInput/>
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
              <button type="submit" className='border border-black w-fit p-2 rounded-2xl font-bold'>Create Blog</button>
              <button className='border border-red-400 w-fit p-2 rounded-2xl font-bold'>Cancel</button>
            </div>
          </form>
        </div>
    </div>
  )
}
