'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { useState } from 'react'

interface MarkdownProps {
  content: string
  className?: string
}

export default function Markdown({ content, className = '' }: MarkdownProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = (code: string, key: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(key)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  return (
    <div className={`markdown prose prose-invert max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          // Code blocks with syntax highlighting and copy button
          pre({ node, children, className, ...props }) {
            const language = className?.replace('language-', '') || ''
            const code = String(children).replace(/\n$/, '')
            const codeKey = `${code.slice(0, 10)}-${language}`

            return (
              <div className="relative group">
                <div className="flex items-center justify-between bg-gray-800 text-gray-400 text-xs px-4 py-2 rounded-t-lg border-b border-gray-700">
                  <span className="font-mono">{language || 'code'}</span>
                  <button
                    onClick={() => copyToClipboard(code, codeKey)}
                    className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-700 transition-colors"
                  >
                    {copiedCode === codeKey ? (
                      <>
                        <span>✓</span>
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <span>📋</span>
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className={`${className || ''} !mt-0 !rounded-t-none`} {...props}>
                  {children}
                </pre>
              </div>
            )
          },

          // Inline code
          code({ node, className, children, ...props }) {
            return (
              <code
                className={`${className || ''} bg-gray-800 text-purple-400 px-1.5 py-0.5 rounded font-mono text-sm`}
                {...props}
              >
                {children}
              </code>
            )
          },

          // Headings with anchor links
          h1({ node, children, ...props }) {
            return (
              <h1 className="text-4xl font-bold mt-8 mb-4 text-gradient" {...props}>
                {children}
              </h1>
            )
          },
          h2({ node, children, ...props }) {
            return (
              <h2 className="text-3xl font-bold mt-6 mb-3 text-gradient" {...props}>
                {children}
              </h2>
            )
          },
          h3({ node, children, ...props }) {
            return (
              <h3 className="text-2xl font-semibold mt-4 mb-2 text-gray-200" {...props}>
                {children}
              </h3>
            )
          },
          h4({ node, children, ...props }) {
            return (
              <h4 className="text-xl font-semibold mt-3 mb-2 text-gray-300" {...props}>
                {children}
              </h4>
            )
          },
          h5({ node, children, ...props }) {
            return (
              <h5 className="text-lg font-semibold mt-2 mb-1 text-gray-300" {...props}>
                {children}
              </h5>
            )
          },
          h6({ node, children, ...props }) {
            return (
              <h6 className="text-base font-semibold mt-2 mb-1 text-gray-400" {...props}>
                {children}
              </h6>
            )
          },

          // Paragraphs
          p({ node, children, ...props }) {
            return (
              <p className="my-4 text-gray-300 leading-relaxed" {...props}>
                {children}
              </p>
            )
          },

          // Links
          a({ node, href, children, ...props }) {
            return (
              <a
                href={href}
                className="text-purple-400 hover:text-purple-300 underline transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                {...props}
              >
                {children}
              </a>
            )
          },

          // Blockquotes
          blockquote({ node, children, ...props }) {
            return (
              <blockquote
                className="border-l-4 border-purple-500 pl-4 my-4 italic text-gray-400 bg-gray-800/50 py-2 pr-2 rounded-r"
                {...props}
              >
                {children}
              </blockquote>
            )
          },

          // Lists
          ul({ node, children, ...props }) {
            return (
              <ul className="list-disc list-inside my-4 space-y-2 text-gray-300" {...props}>
                {children}
              </ul>
            )
          },
          ol({ node, children, ...props }) {
            return (
              <ol className="list-decimal list-inside my-4 space-y-2 text-gray-300" {...props}>
                {children}
              </ol>
            )
          },
          li({ node, children, ...props }) {
            return (
              <li className="ml-4" {...props}>
                {children}
              </li>
            )
          },

          // Tables
          table({ node, children, ...props }) {
            return (
              <div className="overflow-x-auto my-6">
                <table className="min-w-full border-collapse border border-gray-700" {...props}>
                  {children}
                </table>
              </div>
            )
          },
          thead({ node, children, ...props }) {
            return (
              <thead className="bg-gray-800" {...props}>
                {children}
              </thead>
            )
          },
          th({ node, children, ...props }) {
            return (
              <th className="border border-gray-700 px-4 py-2 text-left text-gray-200 font-semibold" {...props}>
                {children}
              </th>
            )
          },
          td({ node, children, ...props }) {
            return (
              <td className="border border-gray-700 px-4 py-2 text-gray-300" {...props}>
                {children}
              </td>
            )
          },

          // Horizontal rule
          hr({ node, ...props }) {
            return <hr className="my-8 border-gray-700" {...props} />
          },

          // Images
          img({ node, src, alt, ...props }) {
            return (
              <img
                src={src}
                alt={alt}
                className="rounded-lg my-4 max-w-full h-auto"
                loading="lazy"
                {...props}
              />
            )
          },

          // Strong
          strong({ node, children, ...props }) {
            return (
              <strong className="font-bold text-white" {...props}>
                {children}
              </strong>
            )
          },

          // Emphasis
          em({ node, children, ...props }) {
            return (
              <em className="italic text-gray-300" {...props}>
                {children}
              </em>
            )
          },
        }}
      >
        {content}
      </ReactMarkdown>

      <style jsx global>{`
        @import 'highlight.js/styles/github-dark.css';

        .markdown pre {
          background-color: #1f2937;
          border-radius: 0.5rem;
          padding: 1rem;
          overflow-x: auto;
          margin-bottom: 1rem;
        }

        .markdown code {
          font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
          font-size: 0.875rem;
          line-height: 1.5;
        }

        .markdown pre code {
          background-color: transparent;
          padding: 0;
          color: #e5e7eb;
        }

        /* Syntax highlighting overrides */
        .hljs {
          background: transparent !important;
          color: #e5e7eb;
        }

        .hljs-comment,
        .hljs-quote {
          color: #6b7280;
          font-style: italic;
        }

        .hljs-keyword,
        .hljs-selector-tag,
        .hljs-subst {
          color: #f472b6;
        }

        .hljs-number,
        .hljs-literal,
        .hljs-variable,
        .hljs-template-variable,
        .hljs-tag .hljs-attr {
          color: #fbbf24;
        }

        .hljs-string,
        .hljs-doctag {
          color: #34d399;
        }

        .hljs-title,
        .hljs-section,
        .hljs-selector-id {
          color: #60a5fa;
          font-weight: bold;
        }

        .hljs-type,
        .hljs-class .hljs-title {
          color: #a78bfa;
        }

        .hljs-tag,
        .hljs-name,
        .hljs-attribute {
          color: #f472b6;
          font-weight: normal;
        }

        .hljs-regexp,
        .hljs-link {
          color: #34d399;
        }

        .hljs-symbol,
        .hljs-bullet {
          color: #fbbf24;
        }

        .hljs-built_in,
        .hljs-builtin-name {
          color: #60a5fa;
        }

        .hljs-meta {
          color: #6b7280;
        }

        .hljs-deletion {
          background: #fecaca;
        }

        .hljs-addition {
          background: #bbf7d0;
        }

        .hljs-emphasis {
          font-style: italic;
        }

        .hljs-strong {
          font-weight: bold;
        }
      `}</style>
    </div>
  )
}
