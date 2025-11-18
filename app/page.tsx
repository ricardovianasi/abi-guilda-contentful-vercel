import { getAllPosts } from '@/lib/contentful';
import PostCard from '@/components/PostCard';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const posts = await getAllPosts(12);

  if (posts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Welcome to Contentful Blog Demo</h1>
          <p className="text-xl text-gray-600 mb-8">
            This is a demonstration of Contentful's headless CMS capabilities with Next.js.
          </p>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 text-left">
            <h2 className="text-lg font-semibold text-yellow-800 mb-2">🚀 Getting Started</h2>
            <p className="text-yellow-700 mb-4">No blog posts found. To see this demo in action:</p>
            <ol className="list-decimal list-inside space-y-2 text-yellow-700">
              <li>
                Create a Contentful account at{' '}
                <a
                  href="https://www.contentful.com"
                  className="underline"
                  target="_blank"
                  rel="noopener"
                >
                  contentful.com
                </a>
              </li>
              <li>Create a new space</li>
              <li>Add content types: "Blog Post" and "Author"</li>
              <li>Create some content</li>
              <li>
                Add your Space ID and API tokens to{' '}
                <code className="bg-yellow-100 px-2 py-1 rounded">.env.local</code>
              </li>
              <li>Restart the development server</li>
            </ol>
            <p className="text-yellow-700 mt-4 text-sm">
              Check the README.md file for detailed setup instructions.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-5xl font-bold mb-4 text-gray-900">Latest Blog Posts</h1>
        <p className="text-xl text-gray-600">Powered by Contentful Headless CMS</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <PostCard key={post.sys.id} post={post} />
        ))}
      </div>
    </div>
  );
}
