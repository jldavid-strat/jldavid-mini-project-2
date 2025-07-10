import BlogCard from "@/components/ui/BlogCard";
import { Fragment } from "react";
import { db } from "@/db/db";
import {blogs} from '@/db/schema'

export default async function Home() {
  const blogList = await db.select().from(blogs).orderBy(blogs.created_at);
  console.log(blogList)
  return (
    <Fragment>
      <div className="flex flex-col mt-4">
        <h2 className="text-black font-bold text-xl">Latest Blogs</h2>
        <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, saepe. Sapiente sed reiciendis saepe doloribus modi voluptatibus sunt numquam nobis dolorum. At corrupti veniam quam vel sequi! Fugit impedit recusandae iusto, ab velit illo tempore corporis voluptate ullam delectus exercitationem non minima consequuntur tenetur mollitia eaque eligendi debitis ea magnam beatae nihil praesentium molestiae. Officiis, rem praesentium. Cumque aut modi, ea voluptates sunt nisi architecto. Doloribus rerum tempore dolor voluptas!</p>
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
              created_at={blog.created_at.toDateString()}
            />
          ))
        }
      </div>
    </Fragment>
  );
}
