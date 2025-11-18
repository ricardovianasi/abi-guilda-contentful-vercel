import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Asset } from 'contentful';
import { getAllPosts, getPostBySlug, getOptimizedImageUrl } from '@/lib/contentful';
import RichText from '@/components/RichText';
import { TypeAuthor } from '@/lib/contentful.types';

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

  const formattedDate = new Date(post.sys.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const featuredImage = post.fields.featuredImage as Asset | undefined;
  const featuredImageUrl = featuredImage?.fields?.file?.url
    ? `https:${featuredImage.fields.file.url}`
    : undefined;

  const author = post.fields.author as TypeAuthor | undefined;
  const authorAvatar = author?.fields.avatar as Asset | undefined;
  const authorAvatarUrl = authorAvatar?.fields?.file?.url
    ? `https:${authorAvatar.fields.file.url}`
    : undefined;

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Back button */}
      <Link href="/" className="inline-flex items-center text-contentful-blue hover:underline mb-8">
        ← Back to all posts
      </Link>

      {/* Featured Image */}
      {featuredImageUrl && (
        <div className="relative w-full h-96 mb-8 rounded-xl overflow-hidden">
          <Image
            src={getOptimizedImageUrl(featuredImageUrl, {
              width: 1200,
              height: 600,
              fit: 'fill',
              quality: 85,
              format: 'webp',
            })}
            alt={post.fields.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Title and Meta */}
      <header className="mb-8">
        <h1 className="text-5xl font-bold mb-4 text-gray-900">{post.fields.title}</h1>

        <div className="flex items-center gap-4 text-gray-600 mb-4">
          <time dateTime={post.sys.createdAt}>{formattedDate}</time>

          {author && (
            <>
              <span>|</span>
              <div className="flex items-center gap-2">
                {authorAvatarUrl && (
                  <Image
                    src={authorAvatarUrl}
                    alt={author.fields.name}
                    width={32}
                    height={32}
                    className="rounded-full object-cover w-[32px] h-[32px]"
                  />
                )}
                <span>By {author.fields.name}</span>
              </div>
            </>
          )}
        </div>

        {post.fields.tags && post.fields.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.fields.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-blue-100 text-contentful-blue text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Excerpt */}
      {post.fields.excerpt && (
        <div className="text-xl text-gray-600 mb-8 pb-8 border-b">{post.fields.excerpt}</div>
      )}

      {/* Body Content */}
      {post.fields.body && (
        <div className="prose prose-lg max-w-none">
          <RichText content={post.fields.body} />
        </div>
      )}

      {/* Author Bio */}
      {author && author.fields.bio && (
        <div className="mt-12 pt-8 border-t">
          <h3 className="text-2xl font-bold mb-4">About the Author</h3>
          <div className="grid grid-cols-[auto_auto] items-start gap-4">
            {authorAvatarUrl && (
              <Image
                src={authorAvatarUrl}
                alt={author.fields.name}
                width={80}
                height={80}
                className="rounded-full object-cover w-[80px] h-[80px]"
              />
            )}
            <div>
              <p className="font-semibold text-lg mb-2">{author.fields.name}</p>
              <p className="text-gray-600">{author.fields.bio}</p>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
