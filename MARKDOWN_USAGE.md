# Markdown Rendering Component Usage Guide

## 📦 What's Installed

Your blog now has a powerful Markdown rendering system with:

- **react-markdown** - Core Markdown parser
- **remark-gfm** - GitHub Flavored Markdown support (tables, strikethrough, task lists)
- **rehype-highlight** - Syntax highlighting for 180+ programming languages
- **remark-rehype** & **rehype-stringify** - HTML transformation pipeline

## 🎯 Features

### ✨ Core Features
- Full GitHub Flavored Markdown support
- Syntax highlighting for code blocks
- One-click copy button for code
- Auto-linked headings
- Responsive tables
- Dark mode optimized
- Custom styled components
- Loading and error states

### 🎨 Styling
- Glass morphism design matching your site
- Gradient text effects
- Smooth animations with Framer Motion
- Responsive on all screen sizes
- Custom syntax highlighting colors

## 🚀 Usage

### 1. Basic Usage

```tsx
import Markdown from '@/components/Markdown'

export default function MyPage() {
  const markdownContent = `
# Hello World

This is **bold** and *italic* text.

\`\`\`typescript
const greeting = "Hello, World!"
console.log(greeting)
\`\`\`
`

  return <Markdown content={markdownContent} />
}
```

### 2. With External Markdown File

```tsx
import BlogPost from '@/components/BlogPost'

export default function BlogPage() {
  return (
    <BlogPost
      markdownPath="/posts/my-first-post.md"
      title="My First Blog Post"
      date="2026-02-15"
      author="Skippy"
      tags={['tutorial', 'markdown']}
    />
  )
}
```

### 3. View the Demo

Visit `/blog` to see a live demo with all features!

```bash
npm run dev
# Go to http://localhost:3000/blog
```

## 📝 Supported Markdown Features

### Basic Formatting
- **Bold text** with `**text**`
- *Italic text* with `*text*`
- ~~Strikethrough~~ with `~~text~~`
- `Inline code` with backticks
- [Links](https://example.com) with `[text](url)`

### Headings
```markdown
# H1 Heading
## H2 Heading
### H3 Heading
#### H4 Heading
##### H5 Heading
###### H6 Heading
```

### Code Blocks
\`\`\`typescript
interface User {
  id: number
  name: string
}

const user: User = { id: 1, name: "Alice" }
\`\`\`

### Lists

**Unordered:**
```markdown
- Item 1
- Item 2
  - Nested item
```

**Ordered:**
```markdown
1. First item
2. Second item
3. Third item
```

### Tables
```markdown
| Feature | Status |
|---------|--------|
| GFM | ✅ |
| Highlighting | ✅ |
```

### Blockquotes
```markdown
> This is a blockquote
> with multiple lines
```

### Task Lists
```markdown
- [x] Completed task
- [ ] Pending task
```

## 🎨 Customization

### Modifying Styles

Edit `/src/components/Markdown.tsx` to customize:

1. **Colors** - Change the syntax highlighting colors in the `<style jsx>` section
2. **Layout** - Modify component props (padding, margins, etc.)
3. **Typography** - Adjust font sizes and families
4. **Animations** - Add Framer Motion animations to elements

### Adding New Features

The component uses a plugin-based architecture:

```tsx
// Add more remark plugins
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

<ReactMarkdown
  remarkPlugins={[remarkGfm, remarkMath]}
  rehypePlugins={[rehypeHighlight, rehypeKatex]}
  // ...
>
```

## 📂 File Structure

```
src/
├── components/
│   ├── Markdown.tsx       # Core Markdown renderer
│   └── BlogPost.tsx       # Blog post wrapper component
└── app/
    └── blog/
        └── page.tsx        # Demo page
```

## 🔧 Troubleshooting

### Code Not Highlighting
Make sure your code block has a language specified:

\`\`\`typescript  // ← Language tag required
const x = 1
\`\`\`

### Styles Not Applied
Clear your Next.js cache:

```bash
rm -rf .next
npm run dev
```

### Copy Button Not Working
Ensure you're using HTTPS or localhost (clipboard API requires secure context)

## 🚀 Next Steps

1. Create a `/posts` directory in your `public` folder
2. Add markdown files with `.md` extension
3. Use `BlogPost` component to load them
4. Add routing for individual blog posts

Example:
```tsx
// app/blog/[slug]/page.tsx
export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return (
    <BlogPost
      markdownPath={`/posts/${params.slug}.md`}
      title="My Post"
      date="2026-02-15"
    />
  )
}
```

## 📚 Resources

- [react-markdown docs](https://github.com/remarkjs/react-markdown)
- [remark-gfm docs](https://github.com/remarkjs/remark-gfm)
- [rehype-highlight docs](https://github.com/rehypejs/rehype-highlight)
- [highlight.js languages](https://github.com/highlightjs/highlight.js#supported-languages)

---

Made with 🦞 by Skippy
