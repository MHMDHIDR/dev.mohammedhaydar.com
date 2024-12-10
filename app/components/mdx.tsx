"use client"

import Link from "next/link"
import Image, { ImageProps } from "next/image"
import { MDXRemote } from "next-mdx-remote/rsc"
import { highlight } from "sugar-high"
import React, { Suspense } from "react"
import { MDXComponents } from "mdx/types"

function Table({ data }: { data: { headers: string[]; rows: string[][] } }) {
  const headers = data.headers.map((header, index) => <th key={index}>{header}</th>)
  const rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ))

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

const CustomLink: React.FC<
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href?: string
    children?: React.ReactNode
  }
> = ({ href, children, ...props }) => {
  if (!href) return null

  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    )
  }

  if (href.startsWith("#")) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    )
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  )
}

const RoundedImage: React.FC<ImageProps> = props => (
  <Image
    {...props}
    className={`rounded-lg ${props.className || ""}`}
    alt={props.alt ?? ""}
  />
)

type CodeProps = React.HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode
}

const Code: React.FC<CodeProps> = ({ children, ...props }) => {
  if (!children) return null
  const codeHTML = highlight(String(children))
  return <code {...props} dangerouslySetInnerHTML={{ __html: codeHTML }} />
}

function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/&/g, "-and-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
}

function createHeading(level: number) {
  const Heading: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    if (!children) return null
    const slug = slugify(String(children))
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor"
        })
      ],
      children
    )
  }

  return Heading
}

const components: MDXComponents = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  code: Code,
  Table
}

export function CustomMDX(props: { source: string; components?: MDXComponents }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* @ts-expect-error MDXRemote is not compatible with MDXRemote */}
      <MDXRemote
        source={props.source}
        components={{
          ...components,
          ...(props.components || {})
        }}
      />
    </Suspense>
  )
}
