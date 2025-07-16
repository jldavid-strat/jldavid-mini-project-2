import { FeatureCard, FeatureHorizontalCard } from "@/components/ui/FeatureCards";
// import { db } from "@/db/db";
// import {blogs} from '@/db/schema'
import { Fragment } from "react";

export default async function Home() {
  // const blogList = await db.select().from(blogs).orderBy(blogs.created_at);
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
          <h3 className="font-bold text-2xl p-2">Featured Blogs</h3>
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


