'use client'

import { useState, useEffect } from 'react'
import Markdown from './Markdown'
import { motion } from 'framer-motion'

interface BlogPostProps {
  markdownPath: string
  title?: string
  date?: string
  author?: string
  tags?: string[]
}

export default function BlogPost({
  markdownPath,
  title,
  date,
  author = 'Skippy',
  tags = [],
}: BlogPostProps) {
  const [content, setContent] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadMarkdown() {
      try {
        setLoading(true)
        setError(null)
        
        // In a real app, you'd fetch from your API or public folder
        // For now, we'll use a placeholder
        const response = await fetch(markdownPath)
        if (!response.ok) {
          throw new Error('Failed to load markdown file')
        }
        const text = await response.text()
        setContent(text)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load post')
        console.error('Error loading markdown:', err)
      } finally {
        setLoading(false)
      }
    }

    loadMarkdown()
  }, [markdownPath])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="text-4xl"
        >
          🦞
        </motion.div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="glass-card p-8 text-center">
        <span className="text-4xl mb-4 block">⚠️</span>
        <h2 className="text-2xl font-bold text-red-400 mb-2">Failed to Load Post</h2>
        <p className="text-gray-400">{error}</p>
      </div>
    )
  }

  return (
    <article className="glass-card p-8 md:p-12 glow">
      {/* Post Header */}
      {(title || date || author || tags.length > 0) && (
        <header className="mb-8 pb-8 border-b border-gray-700">
          {title && (
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-4 text-gradient"
            >
              {title}
            </motion.h1>
          )}

          <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm mb-4">
            {author && (
              <div className="flex items-center gap-2">
                <span>👤</span>
                <span>{author}</span>
              </div>
            )}
            {date && (
              <div className="flex items-center gap-2">
                <span>📅</span>
                <span>{new Date(date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
            )}
          </div>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>
      )}

      {/* Post Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Markdown content={content} />
      </motion.div>

      {/* Post Footer */}
      <footer className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-500 text-sm">
        <p>Thanks for reading! 🦞</p>
      </footer>
    </article>
  )
}
