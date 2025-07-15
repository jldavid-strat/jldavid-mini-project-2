import BlogCard from "@/components/ui/BlogCard";
import { db } from "@/db/db";
import {blogs} from '@/db/schema'
import { Fragment } from "react";

export default async function Home() {
  const blogList = await db.select().from(blogs).orderBy(blogs.created_at);
  console.log(blogList)
  return (
    <Fragment>
      <div className="mt-4 mx-2 flex flex-row justify-center">
        <div className="min-w-[150px] max-w-[600px] flex flex-col justify-center items-center">
          <h2 className="text-black font-bold text-2xl">Welcome to ThinkThread</h2>
          <p className="text-sm text-center mt-2">Your space to explore insightful threads on programming, tech trends, and creative development ideas. Whether you&apos;re here to learn, share, or just stay inspired — we&apos;re glad you&apos;re here. Dive in and discover what the tech world is thinking.</p>
        </div>
      </div>
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
              created_at={blog.created_at}
            />
          ))
        }
      </div>
    </Fragment>
  );
}
