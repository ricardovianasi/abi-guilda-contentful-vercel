import Link from 'next/link';
import Image from 'next/image';
import { Asset } from 'contentful';
import { getOptimizedImageUrl } from '@/lib/contentful';
import { TypeAuthor, TypeBlogPost } from '@/lib/contentful.types';

interface PostCardProps {
  post: TypeBlogPost;
}

export default function PostCard({ post }: PostCardProps) {
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

  return (
    <Link href={`/posts/${post.fields.slug}`}>
      <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
        {featuredImageUrl && (
          <div className="relative h-48 w-full">
            <Image
              src={getOptimizedImageUrl(featuredImageUrl, {
                width: 600,
                height: 400,
                fit: 'fill',
                quality: 80,
                format: 'webp',
              })}
              alt={post.fields.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="p-6 flex-grow flex flex-col">
          <h2 className="text-2xl font-bold mb-2 text-gray-900 hover:text-contentful-blue transition-colors">
            {post.fields.title}
          </h2>

          <div className="text-sm text-gray-500 mb-3">
            <time dateTime={post.sys.createdAt}>{formattedDate}</time>
            {author && (
              <>
                {' | '}
                <span>By {author.fields.name}</span>
              </>
            )}
          </div>

          {post.fields?.excerpt && (
            <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">{post.fields.excerpt}</p>
          )}

          {post.fields?.tags && post.fields?.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-auto">
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
        </div>
      </article>
    </Link>
  );
}
