"use client"

import { Input } from "@/components/ui/input"
import { useState, useRef } from "react"
import { EditorContent, useEditor } from "@tiptap/react"
import { StarterKit } from "@tiptap/starter-kit"
import { Image as TipTapImage } from "@tiptap/extension-image"
import { EditorMenu } from "@/components/Editor"
import { Button } from "@/components/ui/button"
import { createPost, updatePostContent } from "./actions"
import { useRouter } from "next/navigation"
import { uploadToS3 } from "@/lib/s3-upload"
import Image from "next/image"

export default function NewBlogPost() {
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
    extensions: [StarterKit, TipTapImage.configure({ inline: true, allowBase64: true })],
    content: "",
    editorProps: { attributes: { class: "min-h-72 max-h-72 p-3 overflow-y-auto" } },
    onUpdate: ({ editor }) => setContent(editor.getHTML()),
    immediatelyRender: false
  })

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const newPostId = await createPost()

      const imageUrls = await Promise.all(
        uploadedImages.map(img => uploadToS3(img.file, newPostId))
      )

      const formData = new FormData()
      formData.append("title", title)
      formData.append("content", content)
      formData.append("published", published ? "true" : "false")

      let updatedContent = content
      uploadedImages.forEach((img, index) => {
        updatedContent = updatedContent.replace(img.preview, imageUrls[index])
      })

      await updatePostContent(newPostId, title, updatedContent)

      push(`/dashboard/blogs/${newPostId}`)
    } catch (error) {
      console.error("Error creating post", error)
    }
  }

  return !editor ? null : (
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
            id="content"
            required
          />
        </label>
      </div>

      <div className="flex gap-2">
        {uploadedImages.map((img, index) => (
          <Image
            key={index}
            src={img.preview}
            alt={`Preview ${index}`}
            width={80}
            height={80}
            className="w-20 h-20 object-cover rounded-md"
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

      <Button type="submit">Add Post</Button>
    </form>
  )
}
