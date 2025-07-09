import Navbar from "@/components/layout/Navbar";
import BlogCard from "@/components/ui/BlogCard";
import { Fragment } from "react";


export default function Home() {
  return (
    <Fragment>
      <Navbar/>
      <div className="mx-4 flex flex-col">
        <h2 className="text-black font-bold text-lg">Latest Blogs</h2>
        <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, esse numquam. Deserunt quasi velit amet sint quidem ullam nisi magni</p>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-4"> 
        <BlogCard/>
        <BlogCard/>
        <BlogCard/>
      </div>
    </Fragment>
  );
}
