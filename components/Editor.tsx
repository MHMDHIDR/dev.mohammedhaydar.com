import { Button } from "@/components/ui/button"
import type { Editor } from "@tiptap/core"

export function EditorMenu({ editor }: { editor: Editor }) {
  if (!editor) {
    return null
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
    </div>
  )
}
