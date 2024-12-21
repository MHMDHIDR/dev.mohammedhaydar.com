"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from "next/image"

interface UploadedMediaButtonProps {
  savedMedia: {
    preview: string
    type: string
  }[]
}

const MediaGrid = ({ savedMedia }: UploadedMediaButtonProps) => {
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 gap-4 p-4">
      {savedMedia.map((media, index) => {
        if (media.type === "image") {
          return (
            <Image
              key={index}
              src={media.preview}
              alt={`Preview ${index}`}
              className="aspect-square object-cover rounded-md"
              width={200}
            />
          )
        } else if (media.type === "video") {
          return (
            <video
              key={index}
              src={media.preview}
              className="aspect-square object-cover rounded-md"
            />
          )
        } else if (media.type === "audio") {
          return (
            <div
              key={index}
              className="aspect-square bg-gray-200 rounded-md flex items-center justify-center"
            >
              🎵
            </div>
          )
        }
        return null
      })}
    </div>
  )
}

export function UploadedMediaButton({ savedMedia }: UploadedMediaButtonProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const ModalContent = () => (
    <ScrollArea className="h-[300px] md:h-[400px] w-full">
      <MediaGrid savedMedia={savedMedia} />
    </ScrollArea>
  )

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline" className="text-black">
            View Saved Media
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DialogTitle>Saved Media</DialogTitle>
          <ModalContent />
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-black">
          View Saved Media
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>Saved Media</DialogTitle>
        <ModalContent />
      </DialogContent>
    </Dialog>
  )
}
