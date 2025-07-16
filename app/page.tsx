import { FeatureCard, FeatureHorizontalCard } from "@/components/ui/FeatureCards";
import { getFeaturedBlogs } from "@/db/actions/blogActions";
import { Fragment } from "react";

export default async function Home() {
  const featuredBlogs = await getFeaturedBlogs()
  
  const topFeaturedBlog = featuredBlogs.data[0]
  
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
              id={topFeaturedBlog.id}
              title={topFeaturedBlog.title}
              author={topFeaturedBlog.author}
              description={topFeaturedBlog.description}
              category={topFeaturedBlog.category}
              img_link={topFeaturedBlog.img_link}
              created_at={topFeaturedBlog.created_at}
              className="w-full"
            />
        <div className="flex mt-10 md:mt-0 flex-col gap-2">
          <h3 className="font-bold text-2xl p-2">Featured Blogs</h3>
          {featuredBlogs.data.slice(1, 4).map((blog) => (
              <FeatureHorizontalCard
                key={blog.id}
                id={blog.id}
                title={blog.title}
                author={blog.author}
                description={blog.description}
                category={blog.category}
                created_at={blog.created_at}
                className="w-full"
              />
          ))}

        </div>
      </section>
    </Fragment>
  );
}


