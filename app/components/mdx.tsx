"use client"

import { MDXRemote } from "next-mdx-remote/rsc"
import React, { useEffect, useState } from "react"
import { MDXComponents } from "mdx/types"

export function CustomMDX(props: { source: string; components?: MDXComponents }) {
  const [content, setContent] = useState<React.ReactNode>(null)

  useEffect(() => {
    const loadContent = async () => {
      const loadedContent = await MDXRemote({
        source: props.source,
        components: props.components
      })
      setContent(loadedContent)
    }

    loadContent()
  }, [props.source, props.components])

  return <>{content}</>
}
