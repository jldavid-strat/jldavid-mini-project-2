import BlogCard from "@/components/ui/BlogCard";
import { db } from "@/db/db";
import {blogs} from '@/db/schema'
import React from 'react'

export default async function BlogPage(){
    const blogList = await db.select().from(blogs).orderBy(blogs.created_at);
    return (
        <div>
            <section className="mx-2 mt-4 mb-4">
                <h2 className="text-black font-bold text-4xl">All Blogs</h2>
                <p className="text-sm mt-2">Check out the latest posts from the ThinkThread community — from coding tips to tech thoughts and everything in between.</p>
            </section>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 "> 
            {
                blogList.map((blog) => (
                <BlogCard 
                    key={blog.id}
                    id={blog.id}
                    title={blog.title}
                    author={blog.author}
                    description={blog.description}
                    category={blog.category}
                    created_at={blog.created_at}
                />
                ))
            }
            </div>
        </div>
    )
}

