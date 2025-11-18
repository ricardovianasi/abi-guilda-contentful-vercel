import { config } from 'dotenv';
import { createClient as createManagementClient } from 'contentful-management';
import type { Document } from '@contentful/rich-text-types';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';

config({ path: './.env' });

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID!;
const ENVIRONMENT_ID = process.env.CONTENTFUL_ENV_ID || 'master';
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN!;

// Helper to create Rich Text nodes
function createRichText(content: any[]): Document {
  return {
    nodeType: BLOCKS.DOCUMENT,
    data: {},
    content,
  };
}

function heading1(text: string) {
  return {
    nodeType: BLOCKS.HEADING_1,
    data: {},
    content: [{ nodeType: 'text', value: text, marks: [], data: {} }],
  };
}

function heading2(text: string) {
  return {
    nodeType: BLOCKS.HEADING_2,
    data: {},
    content: [{ nodeType: 'text', value: text, marks: [], data: {} }],
  };
}

function paragraph(text: string, marks: any[] = []) {
  return {
    nodeType: BLOCKS.PARAGRAPH,
    data: {},
    content: [{ nodeType: 'text', value: text, marks, data: {} }],
  };
}

function paragraphWithMarks(segments: { text: string; marks?: any[] }[]) {
  return {
    nodeType: BLOCKS.PARAGRAPH,
    data: {},
    content: segments.map((seg) => ({
      nodeType: 'text',
      value: seg.text,
      marks: seg.marks || [],
      data: {},
    })),
  };
}

function unorderedList(items: string[]) {
  return {
    nodeType: BLOCKS.UL_LIST,
    data: {},
    content: items.map((item) => ({
      nodeType: BLOCKS.LIST_ITEM,
      data: {},
      content: [paragraph(item)],
    })),
  };
}

function code(text: string) {
  return {
    nodeType: BLOCKS.PARAGRAPH,
    data: {},
    content: [
      {
        nodeType: 'text',
        value: text,
        marks: [{ type: MARKS.CODE }],
        data: {},
      },
    ],
  };
}

interface SamplePost {
  title: string;
  slug: string;
  excerpt: string;
  body: Document;
  tags: string[];
}

const samplePosts: SamplePost[] = [
  {
    title: 'Building Modern Web Apps with Next.js 14',
    slug: 'building-modern-web-apps-nextjs-14',
    excerpt:
      'Discover the latest features in Next.js 14 including Server Actions, improved performance, and the new App Router.',
    body: createRichText([
      heading1('Next.js 14: The Future of React Development'),
      paragraph(
        'Next.js 14 brings exciting new features that make building modern web applications easier than ever.'
      ),
      heading2('Key Features'),
      unorderedList([
        'Server Actions: Write server-side code directly in your components',
        'App Router: New routing system with layouts and nested routes',
        'Turbopack: Faster build times with the new bundler',
        'Partial Prerendering: Best of both worlds - static and dynamic content',
      ]),
      heading2('Getting Started'),
      code('npx create-next-app@latest my-app'),
      paragraph('Start building amazing web applications today!'),
    ]),
    tags: ['nextjs', 'react', 'web-development', 'javascript'],
  },
  {
    title: 'TypeScript Best Practices for 2024',
    slug: 'typescript-best-practices-2024',
    excerpt:
      'Learn the essential TypeScript patterns and practices that will make your code more maintainable and type-safe.',
    body: createRichText([
      heading1('TypeScript Best Practices'),
      paragraph(
        'Writing great TypeScript code requires understanding key patterns and practices.'
      ),
      heading2('Essential Practices'),
      paragraphWithMarks([
        { text: '1. Use Strict Mode', marks: [{ type: MARKS.BOLD }] },
      ]),
      paragraph(
        'Always enable strict mode in your tsconfig.json for better type safety.'
      ),
      paragraphWithMarks([
        { text: '2. Avoid Any', marks: [{ type: MARKS.BOLD }] },
      ]),
      paragraph(
        'The any type defeats the purpose of TypeScript. Use unknown when you need flexibility.'
      ),
      paragraphWithMarks([
        { text: '3. Leverage Union Types', marks: [{ type: MARKS.BOLD }] },
      ]),
      paragraph('Union types are powerful for modeling real-world scenarios:'),
      code("type Status = 'pending' | 'approved' | 'rejected';"),
      paragraphWithMarks([
        { text: '4. Use Type Guards', marks: [{ type: MARKS.BOLD }] },
      ]),
      paragraph('Type guards help TypeScript understand your runtime checks.'),
      paragraphWithMarks([
        { text: '5. Prefer Interfaces for Objects', marks: [{ type: MARKS.BOLD }] },
      ]),
      paragraph(
        'Interfaces are better for defining object shapes and can be extended.'
      ),
      heading2('Conclusion'),
      paragraph(
        'Following these practices will lead to more robust and maintainable code.'
      ),
    ]),
    tags: ['typescript', 'javascript', 'best-practices', 'web-development'],
  },
  {
    title: 'API-First Development with GraphQL',
    slug: 'api-first-development-graphql',
    excerpt:
      'Explore how GraphQL revolutionizes API development with its flexible, efficient approach to data fetching.',
    body: createRichText([
      heading1('GraphQL: The Modern API Solution'),
      paragraph('GraphQL has transformed how we build and consume APIs.'),
      heading2('Why GraphQL?'),
      paragraphWithMarks([
        { text: 'Flexible Queries', marks: [{ type: MARKS.BOLD }] },
      ]),
      paragraph('Request exactly the data you need, nothing more, nothing less.'),
      paragraphWithMarks([
        { text: 'Single Endpoint', marks: [{ type: MARKS.BOLD }] },
      ]),
      paragraph(
        'No more managing multiple REST endpoints - one endpoint for everything.'
      ),
      paragraphWithMarks([
        { text: 'Strong Typing', marks: [{ type: MARKS.BOLD }] },
      ]),
      paragraph('Built-in schema and type system for better developer experience.'),
      heading2('Example Query'),
      code(
        `query GetUser {\n  user(id: "123") {\n    name\n    email\n    posts {\n      title\n      excerpt\n    }\n  }\n}`
      ),
      heading2('Benefits'),
      unorderedList([
        'Reduced over-fetching and under-fetching',
        'Better performance on mobile networks',
        'Excellent developer tools',
        'Self-documenting API',
      ]),
      paragraph('GraphQL is the future of API development!'),
    ]),
    tags: ['graphql', 'api', 'web-development', 'backend'],
  },
  {
    title: 'Tailwind CSS: Utility-First Styling',
    slug: 'tailwind-css-utility-first-styling',
    excerpt:
      'Learn how Tailwind CSS utility-first approach can speed up your development and create consistent designs.',
    body: createRichText([
      heading1('Tailwind CSS: A New Way to Style'),
      paragraph(
        'Tailwind CSS has changed how developers approach styling web applications.'
      ),
      heading2('What is Utility-First?'),
      paragraph(
        'Instead of writing custom CSS, you compose styles using utility classes:'
      ),
      code(
        '<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">\n  Click me\n</button>'
      ),
      heading2('Advantages'),
      paragraphWithMarks([
        { text: '1. Rapid Development', marks: [{ type: MARKS.BOLD }] },
      ]),
      paragraph(
        'Build UIs faster without context switching between HTML and CSS files.'
      ),
      paragraphWithMarks([
        { text: '2. Consistency', marks: [{ type: MARKS.BOLD }] },
      ]),
      paragraph(
        'Design tokens built into the framework ensure consistent spacing, colors, and typography.'
      ),
      paragraphWithMarks([
        { text: '3. Performance', marks: [{ type: MARKS.BOLD }] },
      ]),
      paragraph('PurgeCSS removes unused styles, resulting in tiny CSS bundles.'),
      paragraphWithMarks([
        { text: '4. Responsive Design', marks: [{ type: MARKS.BOLD }] },
      ]),
      paragraph('Mobile-first approach with intuitive breakpoint prefixes:'),
      code(
        '<div class="text-sm md:text-base lg:text-lg">\n  Responsive text\n</div>'
      ),
      heading2('Customization'),
      paragraph('Tailwind is fully customizable through tailwind.config.js:'),
      code(
        `module.exports = {\n  theme: {\n    extend: {\n      colors: {\n        brand: '#FF6B6B'\n      }\n    }\n  }\n}`
      ),
      paragraph('Try Tailwind CSS in your next project!'),
    ]),
    tags: ['tailwindcss', 'css', 'web-development', 'frontend'],
  },
];

async function createPosts() {
  console.log('🚀 Creating sample posts in Contentful...\n');

  try {
    const client = createManagementClient({
      accessToken: MANAGEMENT_TOKEN,
    });

    const space = await client.getSpace(SPACE_ID);
    const environment = await space.getEnvironment(ENVIRONMENT_ID);

    console.log(`📍 Space: ${space.name}`);
    console.log(`📍 Environment: ${ENVIRONMENT_ID}\n`);

    for (const post of samplePosts) {
      try {
        console.log(`📝 Creating: "${post.title}"`);

        // Create the entry
        const entry = await environment.createEntry('blogPost', {
          fields: {
            title: {
              'en-US': post.title,
            },
            slug: {
              'en-US': post.slug,
            },
            excerpt: {
              'en-US': post.excerpt,
            },
            body: {
              'en-US': post.body,
            },
            tags: {
              'en-US': post.tags,
            },
          },
        });

        console.log(`   ✅ Entry created with ID: ${entry.sys.id}`);

        // Publish the entry
        const publishedEntry = await entry.publish();
        console.log(`   ✅ Published successfully`);
        console.log(`   🔗 Slug: ${post.slug}\n`);
      } catch (error: any) {
        if (error.message.includes('already exists')) {
          console.log(`   ⚠️  Post already exists, skipping...\n`);
        } else {
          console.error(`   ❌ Error creating post:`, error.message);
          console.log('');
        }
      }
    }

    console.log('✨ All posts processed successfully!\n');
    console.log('📊 Summary:');
    console.log(`   - Total posts: ${samplePosts.length}`);
    console.log(
      `   - Tags: ${Array.from(new Set(samplePosts.flatMap((p) => p.tags))).join(', ')}`
    );
    console.log('\n🎉 Done! Check your Contentful space.');
  } catch (error: any) {
    console.error('\n❌ Fatal error:', error.message);
    process.exit(1);
  }
}

createPosts();

