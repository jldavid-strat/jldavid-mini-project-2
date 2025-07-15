import { Badge } from "@/components/ui/Badge";
import BlogCard from "@/components/ui/BlogCard";
import { db } from "@/db/db";
import {blogs} from '@/db/schema'
import { formatDate } from "@/helpers/helper";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

export default async function Home() {
  const blogList = await db.select().from(blogs).orderBy(blogs.created_at);
  return (
    <Fragment>
      <div className="mt-4 mb-8 mx-2 flex flex-row justify-center">
        <div className="min-w-[150px] max-w-[600px] flex flex-col justify-center items-center">
          <h2 className="text-black font-bold text-4xl">Welcome to ThinkThread</h2>
          <p className="text-sm text-center mt-2">Your space to explore insightful threads on programming, tech trends, and creative development ideas. Whether you&apos;re here to learn, share, or just stay inspired — we&apos;re glad you&apos;re here. Dive in and discover what the tech world is thinking.</p>
        </div>
      </div>
      <section className="mx-2 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-2">
          <FeatureCard 
              id={1}
              title={'blog.title'}
              author={'Welcome to ThinkThread'}
              description={'Your space to explore insightful threads on programming, tech trends, and creative development ideas. Whether you&apos;re here to learn, share, or just stay inspired — we&apos;re glad you&apos;re here. Dive in and discover what the tech world is thinking.'}
              category={'Software'}
              created_at={new Date()}
              className="w-full"
            />
        <div className="flex mt-10 md:mt-0 flex-col gap-2">
          <h3 className="font-bold text-2xl">Featured Blogs</h3>
          <FeatureHorizontalCard 
              id={1}
              title={'blog.title'}
              author={'Welcome to ThinkThread'}
              description={'Your space to explore insightful threads on programming, tech trends, and creative development ideas. Whether you&apos;re here to learn, share, or just stay inspired — we&apos;re glad you&apos;re here. Dive in and discover what the tech world is thinking.'}
              category={'Software'}
              created_at={new Date()}
              className="w-full"
            />
          <FeatureHorizontalCard 
              id={1}
              title={'blog.title'}
              author={'Welcome to ThinkThread'}
              description={'Your space to explore insightful threads on programming, tech trends, and creative development ideas. Whether you&apos;re here to learn, share, or just stay inspired — we&apos;re glad you&apos;re here. Dive in and discover what the tech world is thinking.'}
              category={'Software'}
              created_at={new Date()}
              className="w-full"
            />
          <FeatureHorizontalCard 
              id={1}
              title={'blog.title'}
              author={'Welcome to ThinkThread'}
              description={'Your space to explore insightful threads on programming, tech trends, and creative development ideas. Whether you&apos;re here to learn, share, or just stay inspired — we&apos;re glad you&apos;re here. Dive in and discover what the tech world is thinking.'}
              category={'Software'}
              created_at={new Date()}
              className="w-full"
            />
        </div>
      </section>
    </Fragment>
  );
}

interface BlogCardProps {
    id: number;
    author: string;
    title: string;
    description: string;
    category: string;
    created_at: Date;
    className?: string;
}

function FeatureCard({
    author,
    className,
    title,
    description,
    category,
    created_at,
    }: BlogCardProps){

    const [formattedDate] = formatDate(created_at)
    return (
        <Link 
            className={className}
            href={"/"}>
                <div className='h-auto ring-0 hover:ring hover:rounded-xl'>
                    <div className='h-[400px] relative rounded-t-xl overflow-hidden'>
                        <Image
                            src="/assets/images/bg-1.jpg"
                            alt="blog image example"
                            className='object-cover'
                            fill
                        >
                        </Image>
                    </div>
                    <div className='flex flex-col mt-2 gap-2 p-2'>
                        <p className='text-xs text-gray-500'> {author} <span className='font-bold'>·</span> {formattedDate} </p>
                        <h3 className='font-bold text-4xl'>{title}</h3>
                        <p className='text-xs line-clamp-3 mb-2'>{description}</p>
                        <Badge>{category}</Badge>
                    </div>
                </div>
        </Link>
    )
}
function FeatureHorizontalCard({
    author,
    className,
    title,
    description,
    category,
    created_at,
    }: BlogCardProps){

    const [formattedDate] = formatDate(created_at)
    return (
        <Link 
            className={className}
            href={"/"}>
                <div className='ring-0 hover:ring rounded-xs'>
                    <div className='p-2 flex flex-col gap-2'>
                        <p className='text-xs text-gray-500'> {author} <span className='font-bold'>·</span> {formattedDate} </p>
                        <h3 className='font-bold text-2xl'>{title}</h3>
                        <p className='text-xs line-clamp-3 mb-2'>{description}</p>
                        <Badge>{category}</Badge>
                    </div>
                </div>
        </Link>
    )
}
