import { createClient } from 'contentful';
import { TypeBlogPost, TypeBlogPostSkeleton } from './contentful.types';

if (!process.env.CONTENTFUL_SPACE_ID) {
  throw new Error('CONTENTFUL_SPACE_ID is not defined');
}

if (!process.env.CONTENTFUL_ACCESS_TOKEN) {
  throw new Error('CONTENTFUL_ACCESS_TOKEN is not defined');
}

// ============================================================================
// CONTENTFUL CLIENTS
// ============================================================================

/**
 * Contentful host configuration
 * - cdn.contentful.com: Production (cached, fast)
 * - preview.contentful.com: Preview (includes draft content)
 */
const CONTENTFUL_HOST = process.env.CONTENTFUL_HOST || 'cdn.contentful.com';

// Create a Contentful client
export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  environment: process.env.CONTENTFUL_ENV_ID || 'master',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  host: CONTENTFUL_HOST,
});

// Create a Preview client (for draft content)
// Uses CONTENTFUL_PREVIEW_TOKEN and preview.contentful.com host
export const previewClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  environment: process.env.CONTENTFUL_ENV_ID || 'master',
  accessToken: process.env.CONTENTFUL_PREVIEW_TOKEN || process.env.CONTENTFUL_ACCESS_TOKEN,
  host: 'preview.contentful.com',
});

// ============================================================================
// API FUNCTIONS
// ============================================================================

/**
 * Fetch all blog posts
 * @param limit - Maximum number of posts to fetch
 * @param preview - Whether to fetch draft content
 */
export async function getAllPosts(
  limit: number = 10,
  preview: boolean = false
): Promise<TypeBlogPost[]> {
  const activeClient = preview ? previewClient : client;

  try {
    const response = await activeClient.getEntries<TypeBlogPostSkeleton>({
      content_type: 'blogPost',
      order: ['-sys.createdAt'],
      limit,
      include: 2, // Include referenced entries (author)
    });

    return response.items as TypeBlogPost[];
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

/**
 * Fetch a single blog post by slug
 * @param slug - The slug of the post
 * @param preview - Whether to fetch draft content
 */
export async function getPostBySlug(
  slug: string,
  preview: boolean = false
): Promise<TypeBlogPost | null> {
  const activeClient = preview ? previewClient : client;

  try {
    const response = await activeClient.getEntries<TypeBlogPostSkeleton>({
      content_type: 'blogPost',
      'fields.slug': slug,
      limit: 1,
      include: 2,
    });

    if (response.items.length === 0) {
      return null;
    }

    return response.items[0] as TypeBlogPost;
  } catch (error) {
    console.error(`Error fetching post with slug "${slug}":`, error);
    return null;
  }
}

/**
 * Fetch all unique tags from blog posts
 */
export async function getAllTags(): Promise<string[]> {
  try {
    const response = await client.getEntries<TypeBlogPostSkeleton>({
      content_type: 'blogPost',
      select: ['fields.tags'],
    });

    const tagsSet = new Set<string>();

    response.items.forEach((item) => {
      if (item.fields.tags) {
        item.fields.tags.forEach((tag) => tagsSet.add(tag));
      }
    });

    return Array.from(tagsSet).sort();
  } catch (error) {
    console.error('Error fetching tags:', error);
    return [];
  }
}

/**
 * Fetch posts by tag
 * @param tag - The tag to filter by
 */
export async function getPostsByTag(tag: string): Promise<TypeBlogPost[]> {
  try {
    const response = await client.getEntries<TypeBlogPostSkeleton>({
      content_type: 'blogPost',
      'fields.tags[in]': [tag],
      order: ['-sys.createdAt'],
      include: 2,
    });

    return response.items as TypeBlogPost[];
  } catch (error) {
    console.error(`Error fetching posts with tag "${tag}":`, error);
    return [];
  }
}

/**
 * Generate Contentful image URL with transformations
 * @param url - Original image URL
 * @param options - Image transformation options
 */
export function getOptimizedImageUrl(
  url: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'jpg' | 'png' | 'webp';
    fit?: 'pad' | 'fill' | 'scale' | 'crop' | 'thumb';
  } = {}
): string {
  const params = new URLSearchParams();

  if (options.width) params.append('w', options.width.toString());
  if (options.height) params.append('h', options.height.toString());
  if (options.quality) params.append('q', options.quality.toString());
  if (options.format) params.append('fm', options.format);
  if (options.fit) params.append('fit', options.fit);

  const queryString = params.toString();
  return queryString ? `${url}?${queryString}` : url;
}
