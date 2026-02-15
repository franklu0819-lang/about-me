'use client'

import Markdown from '@/components/Markdown'
import { motion } from 'framer-motion'

const sampleMarkdown = `# Welcome to My Blog 🚀

This is a **sample blog post** to demonstrate the Markdown rendering capabilities.

## Features

- ✨ Full GitHub Flavored Markdown support
- 🎨 Syntax highlighting for code blocks
- 📋 Copy code button with one click
- 🔗 Auto-linked headings
- 📊 Tables support
- 🖼️ Images with responsive sizing

### Code Example

Here's a TypeScript example with syntax highlighting:

\`\`\`typescript
interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'user' | 'guest'
}

async function fetchUser(id: number): Promise<User> {
  const response = await fetch(\`/api/users/\${id}\`)
  if (!response.ok) {
    throw new Error('User not found')
  }
  return response.json()
}

// Usage
const user = await fetchUser(1)
console.log(\`Hello, \${user.name}!\`)
\`\`\`

### Python Example

\`\`\`python
def fibonacci(n: int) -> int:
    """Calculate the nth Fibonacci number."""
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

# Generate first 10 Fibonacci numbers
fib_sequence = [fibonacci(i) for i in range(10)]
print(fib_sequence)
\`\`\`

## Tables

| Feature | Status | Notes |
|---------|--------|-------|
| GFM Support | ✅ | Full support |
| Syntax Highlighting | ✅ | 180+ languages |
| Dark Mode | ✅ | Eye-friendly colors |
| Copy Button | ✅ | One-click copy |

## Blockquotes

> "The best way to predict the future is to create it."
> — Peter Drucker

## Lists

### Unordered List

- First item
- Second item with **bold text**
  - Nested item
  - Another nested item
- Third item with *italic text*

### Ordered List

1. Setup the project
2. Install dependencies
3. Configure the app
4. Deploy to production

## Inline Elements

You can use **bold**, *italic*, \`inline code\`, and [links](https://github.com) in the middle of text.

## Image

Here's a random image:

![Random Image](https://picsum.photos/600/400)

---

*Thanks for reading! This Markdown component is powered by react-markdown, remark-gfm, and rehype-highlight.* 🦞
`

export default function BlogPage() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute right-0 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 80, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glass-card p-8 md:p-12 glow"
        >
          <div className="flex items-center gap-2 mb-6">
            <span className="text-4xl">📝</span>
            <h1 className="text-4xl font-bold text-gradient">Blog Demo</h1>
          </div>
          
          <p className="text-gray-400 mb-8">
            This page demonstrates the Markdown rendering component with full support for:
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {['GFM', 'Syntax Highlighting', 'Copy Button', 'Tables', 'Dark Mode', 'Responsive'].map((feature) => (
              <span
                key={feature}
                className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm"
              >
                {feature}
              </span>
            ))}
          </div>

          <Markdown content={sampleMarkdown} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 text-center text-gray-500 text-sm"
        >
          <p>💡 Tip: Click the "Copy" button on code blocks to copy the code!</p>
        </motion.div>
      </div>
    </main>
  )
}
