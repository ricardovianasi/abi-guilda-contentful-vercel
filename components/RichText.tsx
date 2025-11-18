import { documentToReactComponents, Options } from '@contentful/rich-text-react-renderer';
import { Document, BLOCKS, INLINES } from '@contentful/rich-text-types';
import Image from 'next/image';

interface RichTextProps {
  content: Document;
}

const richTextOptions: Options = {
  renderNode: {
    [BLOCKS.HEADING_1]: (node, children) => (
      <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (node, children) => (
      <h2 className="text-3xl font-bold mt-6 mb-3">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (node, children) => (
      <h3 className="text-2xl font-bold mt-4 mb-2">{children}</h3>
    ),
    [BLOCKS.PARAGRAPH]: (node, children) => (
      <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>
    ),
    [BLOCKS.UL_LIST]: (node, children) => (
      <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (node, children) => (
      <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (node) => {
      const unwrappedChildren = documentToReactComponents(
        { nodeType: BLOCKS.DOCUMENT, content: node.content, data: {} } as Document,
        {
          renderNode: {
            [BLOCKS.PARAGRAPH]: (_, children) => <>{children}</>, // Remove o <p> wrapper
            [BLOCKS.HEADING_1]: (node, children) => children,
            [BLOCKS.HEADING_2]: (node, children) => children,
            [BLOCKS.HEADING_3]: (node, children) => children,
          },
        }
      );

      return <li className="text-gray-700 leading-relaxed">{unwrappedChildren}</li>;
    },
    [BLOCKS.QUOTE]: (node, children) => (
      <blockquote className="border-l-4 border-contentful-blue pl-4 py-2 my-4 italic text-gray-600">
        {children}
      </blockquote>
    ),
    [BLOCKS.HR]: () => <hr className="my-8 border-gray-300" />,
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const { file, title } = node.data.target.fields;
      const url = file?.url;
      const isImage = file?.contentType?.startsWith('image/');

      if (isImage && url) {
        return (
          <div className="my-8">
            <Image
              src={`https:${url}`}
              alt={title || 'Embedded asset'}
              width={800}
              height={500}
              className="rounded-lg w-full"
            />
            {title && <p className="text-center text-sm text-gray-500 mt-2">{title}</p>}
          </div>
        );
      }

      // For non-image assets (PDFs, etc.)
      return (
        <div className="my-4 p-4 bg-gray-100 rounded">
          <a
            href={`https:${url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-contentful-blue hover:underline"
          >
            📎 {title || 'Download attachment'}
          </a>
        </div>
      );
    },
    [BLOCKS.EMBEDDED_ENTRY]: (node) => {
      // Handle embedded entries (like blog posts within blog posts)
      const entryTitle = node.data.target.fields.title;
      return (
        <div className="my-6 p-4 bg-blue-50 border-l-4 border-contentful-blue">
          <p className="font-semibold text-contentful-blue">{entryTitle}</p>
        </div>
      );
    },
    [INLINES.HYPERLINK]: (node, children) => {
      const url = node.data.uri;
      return (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-contentful-blue hover:underline"
        >
          {children}
        </a>
      );
    },
    [INLINES.ENTRY_HYPERLINK]: (node, children) => {
      // Handle links to other entries
      return (
        <a href="#" className="text-contentful-blue hover:underline">
          {children}
        </a>
      );
    },
  },
};

export default function RichText({ content }: RichTextProps) {
  if (!content) {
    return null;
  }

  return (
    <div className="rich-text prose prose-lg max-w-none">
      {documentToReactComponents(content, richTextOptions)}
    </div>
  );
}
