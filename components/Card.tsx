import Link from "next/link"
import { formatDate } from "@/lib/format-date"
import { CalendarClock } from "lucide-react"

interface CardProps {
  id?: string
  title: string
  slug?: string
  publishedAt: string
}

export function BlogPostCard({ id, title, slug, publishedAt }: CardProps) {
  return (
    <li className="my-6 list-none">
      <Link
        href={id ? `/dashboard/blogs/${id}` : `/blog/${slug}`}
        className="inline-block text-lg font-medium text-blue-600 decoration-dashed underline-offset-4 hover:underline"
      >
        <h2 className="text-lg font-medium hover:decoration-wavy">{title}</h2>
      </Link>
      <div className="flex items-center space-x-2 opacity-80 text-sm">
        <CalendarClock className="w-4 h-4" />
        <time dateTime={publishedAt} className="italic -z-10">
          {formatDate(publishedAt)}
        </time>
      </div>
    </li>
  )
}
