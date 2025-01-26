"use client"

import { useEffect } from "react"
import Prism from "prismjs"
import "prismjs/themes/prism-tomorrow.css" // Dark theme
import "prismjs/plugins/line-numbers/prism-line-numbers.css"
import "prismjs/plugins/line-numbers/prism-line-numbers"
// Core languages
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-typescript"
import "prismjs/components/prism-jsx"
import "prismjs/components/prism-tsx"
import "prismjs/components/prism-css"
import "prismjs/components/prism-json"
import "prismjs/components/prism-markdown"
import "prismjs/components/prism-python"
import "prismjs/components/prism-bash"
import "prismjs/components/prism-yaml"
import "prismjs/components/prism-sql"
import "prismjs/components/prism-graphql"
import "prismjs/components/prism-c"
import "prismjs/components/prism-cpp"
import "prismjs/components/prism-java"
import "prismjs/components/prism-processing"
import PreCopyHandler from "@/app/blog/[slug]/copy-handler"

export function SyntaxHighlighter({ content }: { content: string }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Process code blocks to ensure they have proper language classes
      const tempDiv = document.createElement("div")
      tempDiv.innerHTML = content

      // Find all pre > code elements
      const codeBlocks = tempDiv.querySelectorAll("pre > code")
      codeBlocks.forEach(codeBlock => {
        // Get language from class (e.g., "language-javascript")
        const classes = [...codeBlock.classList]
        const languageClass = classes.find(c => c.startsWith("language-"))

        if (!languageClass) {
          // If no language is specified, add a default one
          codeBlock.classList.add("language-plaintext")
        }

        // Ensure parent pre has the language class too
        const preElement = codeBlock.parentElement
        if (preElement) {
          if (languageClass) {
            preElement.classList.add(languageClass)
          } else {
            preElement.classList.add("language-plaintext")
          }
        }
      })

      // Update the content with processed code blocks
      const processedContent = tempDiv.innerHTML

      // Update the article content
      const article = document.getElementById("article")
      if (article) {
        article.innerHTML = processedContent
        // Re-run Prism on the updated content
        Prism.highlightAllUnder(article)
      }
    }
  }, [content])

  return (
    <>
      <PreCopyHandler />
      <article
        id="article"
        role="article"
        className="prose mx-auto mt-8 min-w-full"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </>
  )
}
