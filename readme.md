# Detailed Setup Guide for Contentful Demo

This guide provides step-by-step instructions to set up the Contentful demo for your presentation.

## Table of Contents

1. [Contentful Setup](#contentful-setup)
2. [Content Model Creation](#content-model-creation)
3. [Sample Content](#sample-content)
4. [Local Development Setup](#local-development-setup)
5. [Webhook Configuration](#webhook-configuration)

---

## Contentful Setup

### 1. Create Account

1. Visit [contentful.com](https://www.contentful.com)
2. Click "Sign up" or "Start for free"
3. Choose your preferred sign-up method (Email, GitHub, Google)
4. Verify your email if required

### 2. Create a Space

1. After logging in, click **"Create space"**
2. Select **"Empty space"** (not from template)
3. Name your space: `Blog Demo` (or any name you prefer)
4. Choose "Free" plan
5. Click **"Create space"**

---

## Content Model Creation

### Content Type 1: Author

1. Go to **Content model** in the top navigation
2. Click **"Add content type"**
3. Configure:
   - **Name:** `Author`
   - **API Identifier:** `author` (auto-generated, don't change)
   - **Description:** "Blog post authors"
4. Click **"Create"**

5. Add fields:

   **Field 1: Name**
   - Click **"Add field"**
   - Type: **Text** → **Short text**
   - Name: `Name`
   - Field ID: `name`
   - Check **"This field represents the Entry title"**
   - Check **"Required field"**
   - Click **"Create and configure"**
   - In Validation tab: Max length: 100
   - Click **"Confirm"**

   **Field 2: Bio**
   - Click **"Add field"**
   - Type: **Text** → **Long text**
   - Name: `Bio`
   - Field ID: `bio`
   - Help text: "Short biography of the author"
   - Click **"Create and configure"**
   - In Validation tab: Max length: 500
   - Click **"Confirm"**

   **Field 3: Avatar**
   - Click **"Add field"**
   - Type: **Media** → **One file**
   - Name: `Avatar`
   - Field ID: `avatar`
   - Help text: "Author profile picture"
   - Click **"Create and configure"**
   - In Validation tab: File type: Images only
   - Click **"Confirm"**

6. Click **"Save"** at the top right

### Content Type 2: Blog Post

1. Go to **Content model** in the top navigation
2. Click **"Add content type"**
3. Configure:
   - **Name:** `Blog Post`
   - **API Identifier:** `blogPost` (must be exactly this)
   - **Description:** "Blog posts with rich content"
4. Click **"Create"**

5. Add fields:

   **Field 1: Title**
   - Click **"Add field"**
   - Type: **Text** → **Short text**
   - Name: `Title`
   - Field ID: `title`
   - Check **"This field represents the Entry title"**
   - Check **"Required field"**
   - Click **"Create and configure"**
   - In Validation tab: Max length: 200
   - Click **"Confirm"**

   **Field 2: Slug**
   - Click **"Add field"**
   - Type: **Text** → **Short text**
   - Name: `Slug`
   - Field ID: `slug`
   - Help text: "URL-friendly identifier (e.g., my-first-post)"
   - Check **"Required field"**
   - Check **"Unique field"**
   - Click **"Create and configure"**
   - In Validation tab:
     - Add custom validation: `/^[a-z0-9]+(?:-[a-z0-9]+)*$/`
     - Error message: "Slug must be lowercase letters, numbers, and hyphens only"
   - Click **"Confirm"**

   **Field 3: Excerpt**
   - Click **"Add field"**
   - Type: **Text** → **Long text**
   - Name: `Excerpt`
   - Field ID: `excerpt`
   - Help text: "Short summary of the post"
   - Click **"Create and configure"**
   - In Validation tab: Max length: 300
   - Click **"Confirm"**

   **Field 4: Body**
   - Click **"Add field"**
   - Type: **Rich text**
   - Name: `Body`
   - Field ID: `body`
   - Check **"Required field"**
   - Click **"Create and configure"**
   - In Validation tab:
     - Enable all formatting options
     - Enable hyperlinks
     - Enable embedded entries and assets
   - Click **"Confirm"**

   **Field 5: Featured Image**
   - Click **"Add field"**
   - Type: **Media** → **One file**
   - Name: `Featured Image`
   - Field ID: `featuredImage`
   - Help text: "Main image for the post"
   - Click **"Create and configure"**
   - In Validation tab: File type: Images only
   - Click **"Confirm"**

   **Field 6: Author**
   - Click **"Add field"**
   - Type: **Reference** → **One reference**
   - Name: `Author`
   - Field ID: `author`
   - Click **"Create and configure"**
   - Under "Accept only specified entry type":
     - Select **Author**
   - Click **"Confirm"**

   **Field 7: Publish Date**
   - Click **"Add field"**
   - Type: **Date and time**
   - Name: `Publish Date`
   - Field ID: `publishDate`
   - Help text: "When this post should be published"
   - Check **"Required field"**
   - Click **"Create and configure"**
   - In Appearance tab: Select "Date and time"
   - Click **"Confirm"**

   **Field 8: Tags**
   - Click **"Add field"**
   - Type: **Text** → **Short text, list**
   - Name: `Tags`
   - Field ID: `tags`
   - Help text: "Categories or topics (e.g., Technology, Tutorial)"
   - Click **"Create and configure"**
   - In Validation tab: Max items: 5
   - Click **"Confirm"**

6. Click **"Save"** at the top right

---

## Sample Content

Now let's create some sample content for the demo.

### Create Authors

1. Go to **Content** in the top navigation
2. Click **"Add entry"** → **Author**

**Author 1:**

- Name: `Jane Doe`
- Bio: `Senior software engineer with 10 years of experience in web development. Passionate about React and modern JavaScript.`
- Avatar: Upload any profile image (you can use [placeholder images](https://i.pravatar.cc/300?img=1))
- Click **"Publish"**

**Author 2:**

- Name: `John Smith`
- Bio: `Full-stack developer and technical writer. Loves building scalable applications and sharing knowledge.`
- Avatar: Upload any profile image
- Click **"Publish"**

### Create Blog Posts

1. Go to **Content** in the top navigation
2. Click **"Add entry"** → **Blog Post**

**Post 1:**

- Title: `Getting Started with Contentful`
- Slug: `getting-started-with-contentful`
- Excerpt: `Learn how to set up and use Contentful, a powerful headless CMS, in your next project.`
- Body: (Use rich text editor)

  ```
  # Welcome to Contentful

  Contentful is a headless CMS that allows you to manage your content with a powerful API.

  ## Why Choose Contentful?

  - **API-First**: Access your content via REST or GraphQL
  - **Flexible**: Use any frontend framework
  - **Scalable**: Built for teams of all sizes

  ## Getting Started

  1. Create an account
  2. Set up your content model
  3. Start creating content
  4. Integrate with your app

  It's that simple!
  ```

- Featured Image: Upload any image
- Author: Select `Jane Doe`
- Publish Date: Today's date
- Tags: `Tutorial`, `Getting Started`, `Contentful`
- Click **"Publish"**

**Post 2:**

- Title: `Building Modern Web Apps with Next.js`
- Slug: `building-modern-web-apps-nextjs`
- Excerpt: `Discover how Next.js and Contentful work together to create fast, scalable web applications.`
- Body:

  ````
  # Next.js and Contentful: A Perfect Match

  Next.js is a React framework that makes building web applications a breeze.

  ## Key Features

  - Server-Side Rendering (SSR)
  - Static Site Generation (SSG)
  - API Routes
  - Image Optimization

  ## Integrating with Contentful

  Using Contentful with Next.js is straightforward:

  ```javascript
  import { createClient } from 'contentful';

  const client = createClient({
    space: 'YOUR_SPACE_ID',
    accessToken: 'YOUR_ACCESS_TOKEN',
  });
  ````

  That's all you need to get started!

  ```

  ```

- Featured Image: Upload an image
- Author: Select `John Smith`
- Publish Date: Today's date
- Tags: `Next.js`, `React`, `Tutorial`
- Click **"Publish"**

**Post 3:**

- Title: `The Future of Content Management`
- Slug: `future-of-content-management`
- Excerpt: `Explore how headless CMS platforms are revolutionizing the way we manage and deliver content.`
- Body:

  ```
  # The Evolution of CMS

  Content Management Systems have come a long way from the days of WordPress and Drupal.

  ## Traditional vs Headless

  Traditional CMS platforms couple your content with presentation, while headless CMS separates them.

  ### Benefits of Going Headless

  1. **Omnichannel delivery**: Use the same content everywhere
  2. **Better performance**: Serve static content from CDN
  3. **Developer freedom**: Choose your own tech stack
  4. **Future-proof**: Easy to adopt new technologies

  ## Real-World Use Cases

  - E-commerce platforms
  - Marketing websites
  - Mobile applications
  - IoT devices
  - Voice assistants

  The possibilities are endless!
  ```

- Featured Image: Upload an image
- Author: Select `Jane Doe`
- Publish Date: Today's date
- Tags: `CMS`, `Technology`, `Future`
- Click **"Publish"**

Create 2-3 more posts using similar patterns to have enough content for the demo.

---

## Local Development Setup

### 1. Get API Keys

1. In Contentful, go to **Settings** → **API keys**
2. Click **"Add API key"**
3. Name it: `Blog Demo App`
4. Copy the following values:
   - **Space ID**
   - **Content Delivery API - access token**
   - **Content Preview API - access token**
5. Click **"Save"**

### 2. Configure Environment Variables

1. Navigate to the demo folder:

   ```bash
   cd demo
   ```

2. Copy the example env file:

   ```bash
   cp .env.example .env.local
   ```

3. Open `.env.local` and add your credentials:
   ```
   CONTENTFUL_SPACE_ID=your_space_id_here
   CONTENTFUL_ACCESS_TOKEN=your_delivery_api_token
   CONTENTFUL_PREVIEW_TOKEN=your_preview_api_token
   ```

### 3. Install and Run

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start development server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000)

4. You should see your blog posts! 🎉

---

## Webhook Configuration

Set up webhooks to automatically trigger rebuilds when content changes.

### For Vercel

1. In Contentful, go to **Settings** → **Webhooks**
2. Click **"Add webhook"**
3. Configure:
   - **Name:** `Vercel Deploy Hook`
   - **URL:** Your Vercel deploy hook URL
     - Get this from Vercel: Settings → Git → Deploy Hooks
   - **Triggers:** Select:
     - `Entry.publish`
     - `Entry.unpublish`
     - `Entry.delete`
     - `Asset.publish`
4. Click **"Save"**

### For Netlify

1. In Contentful, go to **Settings** → **Webhooks**
2. Click **"Add webhook"**
3. Configure:
   - **Name:** `Netlify Build Hook`
   - **URL:** Your Netlify build hook URL
     - Get this from Netlify: Site settings → Build & deploy → Build hooks
   - **Triggers:** Same as above
4. Click **"Save"**

### Test the Webhook

1. Edit any blog post in Contentful
2. Click **"Publish"**
3. Watch your deployment platform automatically rebuild
4. After build completes, verify the changes are live

---

## Tips for Presentation

### Demo Preparation

1. **Create quality content** - Use real images and well-written content
2. **Test everything** - Make sure all features work before presenting
3. **Have backup** - Keep screenshots in case of connectivity issues
4. **Clear cache** - Clear browser cache before demo to show real load times

### During Demo

1. **Start with Contentful UI** - Show how easy it is to manage content
2. **Create content live** - Create and publish a post during the demo
3. **Show the code** - Walk through key files
4. **Show the result** - Navigate the built site
5. **Discuss architecture** - Explain how everything connects

### Common Questions to Prepare For

- "How much does Contentful cost?" → Show pricing page
- "Can we self-host?" → Explain SaaS model and alternatives
- "How do we migrate content?" → Discuss migration scripts
- "What about localization?" → Show built-in i18n features
- "How do webhooks work?" → Demonstrate real-time updates

---

## Troubleshooting

### Content Not Showing

- Ensure content is **published** (not draft)
- Check API keys are correct
- Verify content type IDs match code
- Restart dev server after env changes

### Images Not Loading

- Check Contentful image URLs are accessible
- Verify `next.config.js` image configuration
- Look for CORS errors in console

### TypeScript Errors

- Ensure field IDs match exactly
- Run `npm install` to get latest types
- Check `lib/types.ts` definitions

---

## Additional Resources

- [Contentful Docs](https://www.contentful.com/developers/docs/)
- [Next.js Docs](https://nextjs.org/docs)
- [Demo GitHub Repository](#) - Your repo link here

---

**You're all set! 🚀**

Good luck with your presentation!

