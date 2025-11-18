import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-6xl font-bold mb-4 text-gray-900">404</h1>
        <h2 className="text-3xl font-bold mb-4 text-gray-700">Post Not Found</h2>
        <p className="text-xl text-gray-600 mb-8">
          Sorry, we couldn't find the blog post you're looking for.
        </p>
        <Link
          href="/"
          className="inline-block bg-contentful-blue text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

