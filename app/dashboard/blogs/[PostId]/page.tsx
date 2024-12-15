"use client"

import AddBlogButton from "@/app/components/add-blog-btn"
import { getPostById } from "@/app/data-access/posts/get-post-byId"
import { EditorMenu } from "@/components/Editor"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Image } from "@tiptap/extension-image"
import { EditorContent, useEditor } from "@tiptap/react"
import { StarterKit } from "@tiptap/starter-kit"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { editPost } from "./actions"
import { uploadToS3 } from "@/lib/s3-upload"
import { updatePostContent } from "../actions"

export default function EditBlogPost() {
  const { postId } = useParams<{ postId: string }>() as { postId: string }

  const { push } = useRouter()

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [published, setPublished] = useState(false)
  const [uploadedImages, setUploadedImages] = useState<
    {
      file: File
      preview: string
    }[]
  >([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const editor = useEditor({
    extensions: [StarterKit, Image.configure({ inline: true, allowBase64: true })],
    content,
    editorProps: {
      attributes: { class: "min-h-72 max-h-72 p-3 overflow-y-auto leading-loose" }
    },
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newImagePreviews = Array.from(files).map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }))

    setUploadedImages(prev => [...prev, ...newImagePreviews])

    // Add images to editor
    newImagePreviews.forEach(img => {
      editor?.commands.setImage({
        src: img.preview
      })
    })
  }

  const handleEditButton = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // Upload images to S3
      const imageUrls = await Promise.all(
        uploadedImages.map(img => uploadToS3(img.file, postId))
      )

      // Replace temporary image URLs with S3 URLs
      let updatedContent = content
      uploadedImages.forEach((img, index) => {
        updatedContent = updatedContent.replace(img.preview, imageUrls[index])
      })

      // Prepare form data
      const formData = new FormData()
      formData.append("title", title)
      formData.append("content", updatedContent)
      formData.append("published", published ? "true" : "false")

      // Update post
      const editedPostId = await editPost(formData, postId)

      // Update content with final S3 image URLs if needed
      await updatePostContent(editedPostId, title, updatedContent)

      push(`/dashboard/blogs/${editedPostId}`)
    } catch (error) {
      console.error("Error editing post", error)
    }
  }

  return !editor ? null : (
    <>
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
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              multiple
              className="hidden"
            />
            <Button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="my-2"
            >
              Upload Images
            </Button>
            <EditorContent
              className="border border-white/10 focus:border-primary"
              editor={editor}
              required
            />
          </label>
        </div>

        {/* Optional: Preview uploaded images */}
        <div className="flex gap-2">
          {uploadedImages.map((img, index) => (
            <img
              key={index}
              src={img.preview}
              alt={`Preview ${index}`}
              className="w-20 h-20 object-cover"
            />
          ))}
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
    </>
  )
}
