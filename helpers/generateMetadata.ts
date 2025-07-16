// Individual Blog Metadata Generator

export default function generateIndividualBlogMetadata(blog) {
  const {
    id,
    title,
    description,
    author,
    category,
    created_at,
    updated_at,
    img_link,
  } = blog;

  // Create URL-friendly slug if not provided
  const blogSlug = title.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  const blogUrl = `https://thinkthread.com/${blogSlug}`;
  const imageUrl = img_link

  return {
    title: title,
    description: description || `Read "${title}" by ${author}`,
    
    openGraph: {
      title: title,
      description: description || `Read "${title}" by ${author}`,
      url: blogUrl,
      siteName: 'thinkthread',
      type: 'article',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        }
      ],
      article: {
        author: author,
        publishedTime: created_at,
        modifiedTime: updated_at || created_at,
        section: category,
      }
    },
    
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description || `Read "${title}" by ${author}`,
      images: [imageUrl],
    },
    
    // Schema.org structured data
    structuredData: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": title,
      "description": description,
      "author": {
        "@type": "Person",
        "name": author
      },
      "datePublished": created_at,
      "dateModified": updated_at || created_at,
      "image": imageUrl,
      "publisher": {
        "@type": "Organization",
        "name": "thinkthream",
        "logo": {
          "@type": "ImageObject",
          "url": "/assets/icon/logo.ico"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": blogUrl
      },
      "articleSection": category
    }
  };
}

