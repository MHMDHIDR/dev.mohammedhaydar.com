"use client"

import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import { EditorContent, useEditor } from "@tiptap/react"
import { StarterKit } from "@tiptap/starter-kit"
import { Image } from "@tiptap/extension-image"
import { EditorMenu } from "@/components/Editor"
import { Button } from "@/components/ui/button"
import Container from "@/components/Container"
import { editPost } from "./actions"
import { useParams, useRouter } from "next/navigation"
import { getPostById } from "@/app/data-access/posts/get-post-byId"
import AddBlogButton from "@/app/components/add-blog-btn"

export default function EditBlogPost() {
  const { postId } = useParams<{ postId: string }>() as { postId: string }

  const { push } = useRouter()

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [published, setPublished] = useState(false)

  const editor = useEditor({
    extensions: [StarterKit, Image],
    content,
    editorProps: { attributes: { class: "min-h-72 max-h-72 p-3 overflow-y-auto" } },
    onUpdate: ({ editor }) => {
      const newContent = editor.getHTML()
      setContent(newContent)
    },
    immediatelyRender: false
  })

  useEffect(() => {
    const fetchPost = async () => {
      const post = await getPostById({ postId })
      if (!post) return

      setTitle(post.title)
      setContent(post.content)
      setPublished(post.published)

      if (editor) {
        editor.commands.setContent(post.content)
      }
    }
    fetchPost()
  }, [postId, editor])

  const handleEditButton = async (e: React.FormEvent) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("title", title)
    formData.append("content", content)
    formData.append("published", published ? "true" : "false")

    try {
      const editedPostId = await editPost(formData, postId)
      push(`/dashboard/blogs/${editedPostId}`)
    } catch (error) {
      console.error("Error creating post", error)
    }
  }

  return !editor ? null : (
    <Container>
      <AddBlogButton />
      <form onSubmit={handleEditButton} className="space-y-4 mt-4">
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
        <Button>Update Post</Button>
      </form>
    </Container>
  )
}
