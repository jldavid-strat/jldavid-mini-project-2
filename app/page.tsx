import Navbar from "@/components/layout/Navbar";
import BlogCard from "@/components/ui/BlogCard";
import { Fragment } from "react";
import { db } from "@/db/db";
import {blogs} from '@/db/schema'

export default async function Home() {
  const blogList = await db.select().from(blogs).orderBy(blogs.created_at);
  console.log(blogList)
  return (
    <Fragment>
      <Navbar/>
      <div className="mx-4 flex flex-col">
        <h2 className="text-black font-bold text-lg">Latest Blogs</h2>
        <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, esse numquam. Deserunt quasi velit amet sint quidem ullam nisi magni</p>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-4"> 
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
    </Fragment>
  );
}
