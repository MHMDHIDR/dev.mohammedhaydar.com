"use client"

import { Input } from "@/components/ui/input"
import { useState } from "react"
import { EditorContent, useEditor } from "@tiptap/react"
import { StarterKit } from "@tiptap/starter-kit"
import { Image } from "@tiptap/extension-image"
import { EditorMenu } from "@/components/Editor"
import { Button } from "@/components/ui/button"
import Container from "@/components/Container"
import { createPost } from "./actions"
import { useRouter } from "next/navigation"

export default function NewBlogPost() {
  const { push } = useRouter()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [published, setPublished] = useState(false)

  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: "",
    editorProps: { attributes: { class: "min-h-72 max-h-72 p-3 overflow-y-auto" } },
    onUpdate: ({ editor }) => setContent(editor.getHTML()),
    immediatelyRender: false
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("title", title)
    formData.append("content", content)
    formData.append("published", published ? "true" : "false")

    try {
      const newPost = await createPost(formData)
      push(`/dashboard/blogs/${newPost}`)
    } catch (error) {
      console.error("Error creating post", error)
    }
  }

  return !editor ? null : (
    <Container>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title">
            Title:
            <Input
              type="text"
              value={title}
              id="title"
              onChange={e => setTitle(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label htmlFor="content">
            Content:
            <EditorMenu editor={editor} />
            <EditorContent
              className="border border-white/10 focus:border-primary"
              editor={editor}
              required
            />
          </label>
        </div>
        <div>
          <label htmlFor="published">
            Published:
            <input
              className="w-5 h-5 ml-4 align-middle"
              type="checkbox"
              checked={published}
              id="published"
              onChange={e => setPublished(e.target.checked)}
            />
          </label>
        </div>
        <Button>Add Post</Button>
      </form>
    </Container>
  )
}
