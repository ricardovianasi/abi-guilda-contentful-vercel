import { notFound } from 'next/navigation';
import { Asset } from 'contentful';
import { getAllPosts, getPostBySlug } from '@/lib/contentful';
import { ContentfulPreviewProvider } from '@/components/ContentfulPreviewProvider';
import PostContent from '@/components/PostContent';

export const dynamic = 'force-dynamic';

// Generate static params for all posts
export async function generateStaticParams() {
  const posts = await getAllPosts(100);

  return posts.map((post) => ({
    slug: post.fields.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const featuredImage = post.fields.featuredImage as Asset | undefined;
  const featuredImageUrl = featuredImage?.fields?.file?.url
    ? `https:${featuredImage.fields.file.url}`
    : undefined;

  return {
    title: `${post.fields.title} | Contentful Blog Demo`,
    description: post.fields.excerpt || post.fields.title,
    openGraph: {
      title: post.fields.title,
      description: post.fields.excerpt,
      images: featuredImageUrl ? [featuredImageUrl] : [],
    },
  };
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <ContentfulPreviewProvider locale="en-US" enableLiveUpdates enableInspectorMode>
      <PostContent post={post} />
    </ContentfulPreviewProvider>
  );
}
