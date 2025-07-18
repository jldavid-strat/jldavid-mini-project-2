import React from 'react'
import { db } from '@/db/db';
import { blogs } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { getCommentsByBlogId } from '@/db/actions/commentActions';
import {formatDate} from '@/helpers/helper';
import BlogDetailPage from '@/components/layout/BlogDetailPage';
import generateIndividualBlogMetadata from '@/helpers/generateMetadata';
import { Metadata } from 'next';

type BlogDetailPageProps = {
    params: {
        slug: string;
    }
}

async function getBlogData(blogId: number):Promise<Blog> {
  const blogResult = await db.select().from(blogs).where(eq(blogs.id, blogId));
  return blogResult[0] || null;
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const slug = await params;
  const blogId = parseInt(slug.slug);
  
  if (isNaN(blogId)) {
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
    };
  }
  
  const blog = await getBlogData(blogId);
  
  if (!blog) {
    return {
      title: 'Blog Not Found',
      description: 'The requested blog post could not be found.',
    };
  }
  
  const metadata = generateIndividualBlogMetadata(blog);

  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      title: metadata.openGraph.title,
      description: metadata.openGraph.description,
      images: [
        {
          url: metadata.openGraph.images[0].url,
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.twitter.title,
      images: [metadata.twitter.images[0]],
    },
  };
}

export default async function BDetailPage({ params }: BlogDetailPageProps) {
  const slug = await params;
  const blogId = parseInt(slug.slug);
  
  if (isNaN(blogId)) {
    notFound();
  }
  
  const blog = await getBlogData(blogId);
  
  if (!blog) {
    notFound();
  }
  
  const commentList = await getCommentsByBlogId(blogId);
  const [formattedDate] = formatDate(blog.created_at);
  
  return (
    <BlogDetailPage
      blog={blog}
      commentList={commentList}
      formattedDate={formattedDate}
    />
  );
}
