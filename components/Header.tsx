import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/">
            <h1 className="text-2xl font-bold text-contentful-blue hover:opacity-80 transition-opacity">
              Contentful Blog Demo
            </h1>
          </Link>

          <div className="flex gap-6">
            <Link href="/" className="text-gray-600 hover:text-contentful-blue transition-colors">
              Home
            </Link>
            <a
              href="https://www.contentful.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-contentful-blue transition-colors"
            >
              About Contentful
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}

