'use client'

import AddBlogButton from '@/app/components/add-blog-btn'
import { getPostById } from '@/app/data-access/posts/get-post-byId'
import { EditorMenu } from '@/components/Editor'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Image as TipTapImage } from '@tiptap/extension-image'
import { Link } from '@tiptap/extension-link'
import { EditorContent, useEditor } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { Node } from '@tiptap/core'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { editPost } from './actions'
import { uploadToS3 } from '@/lib/s3-upload'
import { updatePostContent } from '../actions'
import { UploadedMediaButton } from '@/components/uploaded-media-button'
import {
  MAX_FILE_SIZE,
  SUPPORTED_AUDIO_TYPES,
  SUPPORTED_IMAGE_TYPES,
  SUPPORTED_VIDEO_TYPES,
} from '@/constants'

// Constants for file handling
const SUPPORTED_TYPES = [
  ...SUPPORTED_IMAGE_TYPES,
  ...SUPPORTED_VIDEO_TYPES,
  ...SUPPORTED_AUDIO_TYPES,
]

const Video = Node.create({
  name: 'video',
  group: 'block',
  atom: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      controls: {
        default: true,
      },
      width: {
        default: 600,
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'video',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['video', { ...HTMLAttributes, controls: true }]
  },
})

const Audio = Node.create({
  name: 'audio',
  group: 'block',
  atom: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      controls: {
        default: true,
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'audio',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['audio', { ...HTMLAttributes, controls: true }]
  },
})

export default function EditBlogPost() {
  const { postId } = useParams<{ postId: string }>() as { postId: string }
  const { push } = useRouter()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [published, setPublished] = useState(false)
  const [uploadedMedia, setUploadedMedia] = useState<
    (
      | {
          preview: string
          type: string
          isNew: boolean
        }
      | {
          file: File
          preview: string
          type: string
          isNew: boolean
        }
    )[]
  >([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const editor = useEditor({
    extensions: [
      StarterKit,
      TipTapImage.configure({ inline: true, allowBase64: true }),
      Link.configure({ openOnClick: false }),
      Video,
      Audio,
    ],
    content,
    editorProps: {
      attributes: {
        class: 'min-h-72 max-h-72 p-3 overflow-y-auto leading-loose',
      },
    },
    onUpdate: ({ editor }) => {
      const newContent = editor.getHTML()
      setContent(newContent)
    },
    immediatelyRender: false,
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

        // Extract and set saved media from content
        const mediaMatches = post.content.match(/src="([^"]*)"/g)
        if (mediaMatches) {
          const mediaFiles = mediaMatches.map((src: string) => {
            const url = src.replace('src="', '').replace('"', '')
            const type = getMediaType(url)
            return {
              preview: url,
              type: type,
              isNew: false,
            }
          })
          setUploadedMedia(mediaFiles)
        }
      }
    }
    fetchPost()
  }, [postId, editor])

  // Helper function to determine media type
  const getMediaType = (url: string): string => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp']
    const videoExtensions = ['.mp4', '.mov']
    const audioExtensions = ['.mp3', '.wav']

    const ext = url.toLowerCase().split('.').pop()
    if (imageExtensions.some(e => e === `.${ext}`)) return 'image'
    if (videoExtensions.some(e => e === `.${ext}`)) return 'video'
    if (audioExtensions.some(e => e === `.${ext}`)) return 'audio'
    return 'image'
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newMediaPreviews = await Promise.all(
      Array.from(files).map(async file => {
        // Validate file size
        if (file.size > MAX_FILE_SIZE) {
          alert(`File ${file.name} exceeds ${MAX_FILE_SIZE / 1024 / 1024} MB limit`)
          return null
        }

        // Validate file type
        if (!SUPPORTED_TYPES.includes(file.type)) {
          alert(`Unsupported file type: ${file.name}`)
          return null
        }

        const fileType = file.type.split('/')[0]
        const preview = URL.createObjectURL(file)

        return {
          file,
          preview,
          type: fileType,
          isNew: true,
        }
      })
    )

    const validMediaPreviews = newMediaPreviews.filter(media => media !== null)
    setUploadedMedia(prev => [...prev, ...validMediaPreviews])

    validMediaPreviews.forEach(media => {
      if (!media) return

      if (media.type === 'image') {
        editor?.chain().focus().setImage({ src: media.preview }).run()
      } else if (media.type === 'video') {
        editor
          ?.chain()
          .focus()
          .insertContent({
            type: 'video',
            attrs: { src: media.preview },
          })
          .run()
      } else if (media.type === 'audio') {
        editor
          ?.chain()
          .focus()
          .insertContent({
            type: 'audio',
            attrs: { src: media.preview },
          })
          .run()
      }
    })
  }

  const handleEditButton = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      let updatedContent = content

      // Only upload media files that are new (isNew: true) and have a File object
      const newMedia = uploadedMedia.filter(
        (media): media is { file: File; preview: string; type: string; isNew: boolean } =>
          media.isNew === true && 'file' in media && media.file instanceof File
      )

      if (newMedia.length > 0) {
        const mediaUrls = await Promise.all(
          newMedia.map(async media => {
            const uploadResult = await uploadToS3(media.file, postId)
            return uploadResult
          })
        )

        // Replace only new media URLs with S3 URLs
        newMedia.forEach((media, index) => {
          updatedContent = updatedContent.replace(media.preview, mediaUrls[index].url)
        })
      }

      // Prepare form data
      const formData = new FormData()
      formData.append('title', title)
      formData.append('content', updatedContent)
      formData.append('published', published ? 'true' : 'false')

      // Update post
      const editedPostId = await editPost(formData, postId)
      await updatePostContent(editedPostId, title, updatedContent)

      push(`/dashboard/blogs/${editedPostId}`)
    } catch (error) {
      console.error('Error editing post', error)
    }
  }

  return !editor ? null : (
    <>
      <AddBlogButton />
      <form onSubmit={handleEditButton} className='space-y-4 mt-4'>
        <div>
          <label htmlFor='title'>
            Title:
            <Input
              type='text'
              value={title}
              id='title'
              onChange={e => setTitle(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label htmlFor='content'>
            Content:
            <EditorMenu editor={editor} />
            <input
              type='file'
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept={SUPPORTED_TYPES.join(',')}
              multiple
              className='hidden'
            />
            <Button
              type='button'
              onClick={() => fileInputRef.current?.click()}
              className='my-2'
            >
              Upload Media
            </Button>
            <EditorContent
              className='border border-white/10 focus:border-primary'
              editor={editor}
              required
            />
          </label>
        </div>

        <div className='flex gap-2'>
          <UploadedMediaButton savedMedia={uploadedMedia} />
        </div>

        <div>
          <label htmlFor='published'>
            Published:
            <input
              className='w-5 h-5 ml-4 align-middle'
              type='checkbox'
              checked={published}
              id='published'
              onChange={e => setPublished(e.target.checked)}
            />
          </label>
        </div>
        <Button>Update Post</Button>
      </form>
    </>
  )
}
