import BlogCard from "@/components/ui/BlogCard";
import { db } from "@/db/db";
import {blogs} from '@/db/schema'
import React from 'react'

export default async function BlogPage(){
    const blogList = await db.select().from(blogs).orderBy(blogs.created_at);
    return (
        <div>
            <h2>All Blogs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 "> 
            {
                blogList.map((blog) => (
                <BlogCard 
                    key={blog.id}
                    id={blog.id}
                    title={blog.title}
                    author={blog.author}
                    description={blog.description}
                    category={blog.category}
                    created_at={blog.created_at.toDateString()}
                />
                ))
            }
            </div>
        </div>
    )
}

