import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AddBlogButton() {
  return (
    <Link href="/dashboard/blogs/new" className="inline-flex">
      <Button className="bg-primary/50 py-2 px-4 rounded-md hover:bg-lightSky">
        Create Blog
      </Button>
    </Link>
  )
}
