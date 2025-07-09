import Navbar from "@/components/layout/Navbar";
import BlogCard from "@/components/ui/BlogCard";
import { Fragment } from "react";


export default function Home() {
  return (
    <Fragment>
      <Navbar/>
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-4"> 
        <BlogCard/>
        <BlogCard/>
        <BlogCard/>
      </div>
    </Fragment>
  );
}
