"use client"

import { Input } from "@/components/ui/input"
import { useState, useRef } from "react"
import { EditorContent, useEditor } from "@tiptap/react"
import { StarterKit } from "@tiptap/starter-kit"
import { Image as TipTapImage } from "@tiptap/extension-image"
import { EditorMenu } from "@/components/Editor"
import { Button } from "@/components/ui/button"
import { createPost } from "./actions"
import { useRouter } from "next/navigation"
import { uploadToS3 } from "@/lib/s3-upload"
import Image from "next/image"
import { updatePostContent } from "../actions"
import { MAX_FILE_SIZE } from "@/constants"

export default function NewBlogPost() {
  const { push } = useRouter()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [published, setPublished] = useState(false)
  const [uploadedMedia, setUploadedMedia] = useState<
    {
      file: File
      preview: string
      type: string
    }[]
  >([])

  const fileInputRef = useRef<HTMLInputElement>(null)

  const editor = useEditor({
    extensions: [StarterKit, TipTapImage.configure({ inline: true, allowBase64: true })],
    content: "",
    editorProps: {
      attributes: { class: "min-h-72 max-h-72 p-3 overflow-y-auto leading-loose" }
    },
    onUpdate: ({ editor }) => setContent(editor.getHTML()),
    immediatelyRender: false
  })

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files) return

    const newMediaPreviews = await Promise.all(
      Array.from(files).map(async file => {
        try {
          // Validate file size before processing
          if (file.size > MAX_FILE_SIZE) {
            alert(`File ${file.name} exceeds ${MAX_FILE_SIZE / 1024 / 1024} MB limit`)
            return null
          }

          const fileType = file.type.split("/")[0]
          let preview = ""

          if (fileType === "image") {
            preview = URL.createObjectURL(file)
          } else if (fileType === "video") {
            preview = URL.createObjectURL(file)
          } else if (fileType === "audio") {
            preview = "/audio-play.svg"
          }

          return {
            file,
            preview,
            type: fileType
          }
        } catch (error) {
          console.error("Error processing file:", error)
          return null
        }
      })
    )

    // Filter out any null entries (failed uploads)
    const validMediaPreviews = newMediaPreviews.filter(media => media !== null)

    setUploadedMedia(prev => [...prev, ...validMediaPreviews])

    // Add files to editor based on type
    validMediaPreviews.forEach(media => {
      if (!media) return

      if (media.type === "image") {
        editor?.commands.setImage({
          src: media.preview
        })
      } else if (media.type === "video") {
        editor?.commands.setContent(
          editor.getHTML() + `<video src="${media.preview}" controls></video>`
        )
      } else if (media.type === "audio") {
        editor?.commands.setContent(
          editor.getHTML() + `<audio src="${media.preview}" controls></audio>`
        )
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const newPostId = await createPost()

      const mediaUrls = await Promise.all(
        uploadedMedia.map(async media => {
          const uploadResult = await uploadToS3(media.file, newPostId)
          return uploadResult
        })
      )

      const formData = new FormData()
      formData.append("title", title)
      formData.append("content", content)
      formData.append("published", published ? "true" : "false")

      let updatedContent = content
      uploadedMedia.forEach((media, index) => {
        updatedContent = updatedContent.replace(media.preview, mediaUrls[index].url)
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
            onChange={handleFileUpload}
            accept="image/*,video/mp4,video/quicktime,audio/mpeg,audio/wav"
            multiple
            className="hidden"
          />
          <Button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="my-2"
          >
            Upload Media
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
        {uploadedMedia.map((media, index) => {
          if (media.type === "image") {
            return (
              <Image
                key={index}
                src={media.preview}
                alt={`Preview ${index}`}
                width={80}
                height={80}
                className="w-20 h-20 object-cover rounded-md"
              />
            )
          } else if (media.type === "video") {
            return (
              <video
                key={index}
                src={media.preview}
                width={80}
                height={80}
                className="w-20 h-20 object-cover rounded-md"
              />
            )
          } else if (media.type === "audio") {
            return (
              <div
                key={index}
                className="w-20 h-20 bg-gray-200 rounded-md flex items-center justify-center"
              >
                🎵 Audio
              </div>
            )
          }
          return null
        })}
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
