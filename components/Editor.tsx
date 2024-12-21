import { Button } from "@/components/ui/button"
import type { Editor } from "@tiptap/core"

export function EditorMenu({ editor }: { editor: Editor }) {
  if (!editor) {
    return null
  }

  const addImage = () => {
    const url = window.prompt("Enter the URL of the image:")
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  const addLink = () => {
    const url = window.prompt("Enter the URL:")
    if (url) {
      editor.chain().focus().setLink({ href: url }).run()
    }
  }

  return (
    <div className="flex flex-wrap gap-2 p-2 bg-gray-700 rounded-t-md dark:bg-gray-700">
      <Button
        className={`px-2 py-1 text-sm ${
          editor.isActive("heading", { level: 1 })
            ? "bg-gray-400 dark:bg-gray-900"
            : "dark:bg-gray-700"
        }`}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        type="button"
      >
        H1
      </Button>
      <Button
        className={`px-2 py-1 text-sm ${
          editor.isActive("heading", { level: 2 })
            ? "bg-gray-300 dark:bg-gray-900"
            : "dark:bg-gray-700"
        }`}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        type="button"
      >
        H2
      </Button>
      <Button
        className={`px-2 py-1 text-sm ${
          editor.isActive("heading", { level: 3 })
            ? "bg-gray-300 dark:bg-gray-900"
            : "dark:bg-gray-700"
        }`}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        type="button"
      >
        H3
      </Button>
      <Button
        className={`px-2 py-1 text-sm ${
          editor.isActive("code") ? "bg-gray-300 dark:bg-gray-900" : "dark:bg-gray-700"
        }`}
        onClick={() => editor.chain().focus().toggleCode().run()}
        type="button"
      >
        Code
      </Button>
      <Button
        className={`px-2 py-1 text-sm ${
          editor.isActive("codeBlock")
            ? "bg-gray-300 dark:bg-gray-900"
            : "dark:bg-gray-700"
        }`}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        type="button"
      >
        Code Block
      </Button>
      <Button
        className={`px-2 py-1 text-sm ${
          editor.isActive("blockquote")
            ? "bg-gray-300 dark:bg-gray-900"
            : "dark:bg-gray-700"
        }`}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        type="button"
      >
        Blockquote
      </Button>
      <Button
        className={`px-2 py-1 text-sm ${
          editor.isActive("bold") ? "bg-gray-300 dark:bg-gray-900" : "dark:bg-gray-700"
        }`}
        onClick={() => editor.chain().focus().toggleBold().run()}
        type="button"
      >
        Bold
      </Button>
      <Button
        className={`px-2 py-1 text-sm ${
          editor.isActive("italic") ? "bg-gray-300 dark:bg-gray-900" : "dark:bg-gray-700"
        }`}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        type="button"
      >
        Italic
      </Button>
      <Button
        className={`px-2 py-1 text-sm ${
          editor.isActive("bulletList")
            ? "bg-gray-300 dark:bg-gray-900"
            : "dark:bg-gray-700"
        }`}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        type="button"
      >
        Bullet List
      </Button>
      <Button
        className={`px-2 py-1 text-sm ${
          editor.isActive("link") ? "bg-gray-300 dark:bg-gray-900" : "dark:bg-gray-700"
        }`}
        onClick={addLink}
        type="button"
      >
        Link
      </Button>
      <Button
        className="px-2 py-1 text-sm dark:bg-gray-700"
        onClick={addImage}
        type="button"
      >
        Image URL
      </Button>
    </div>
  )
}
