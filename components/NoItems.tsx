import Image from "next/image"

export default function NoItems({ children }: { children: React.ReactNode | string }) {
  return (
    <div className="flex flex-col items-center justify-center h-96 gap-y-6">
      <Image src="/no-items.svg" alt="No items found" width={200} height={200} />
      <h1>{children || "No items found"}</h1>
    </div>
  )
}
