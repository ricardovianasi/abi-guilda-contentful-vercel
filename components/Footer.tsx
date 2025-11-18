export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-3">Contentful Demo</h3>
            <p className="text-gray-400 text-sm">
              A demonstration project showcasing Contentful's powerful headless CMS capabilities
              with Next.js.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://www.contentful.com/developers/docs/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contentful Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/contentful"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contentful on GitHub
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-3">Tech Stack</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Next.js 14 (App Router)</li>
              <li>• TypeScript</li>
              <li>• Contentful SDK</li>
              <li>• Tailwind CSS</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

