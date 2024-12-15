"use client"

import PageLayout from "@/components/PageLayout"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"
import Link from "next/link"
import { ArrowUpRight, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { projects } from "./projects"
import { Badge } from "@/components/ui/badge"

export default function Project() {
  return (
    <div className="py-6 md:py-12">
      <PageLayout>
        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent>
            {projects?.map((project, index) => (
              <CarouselItem key={index}>
                <Card className="bg-bodyColor border-lightSky/20">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:space-x-8 group">
                      <div className="w-full md:w-1/2 order-2 md:order-1 mb-8 md:mb-0">
                        <div className="space-y-3 md:space-y-2 mt-4 md:mt-0">
                          <h2 className="text-3xl md:text-6xl leading-none font-extrabold text-transparent text-outline select-none">
                            {index + 1}
                          </h2>
                          <h3 className="text-xl md:text-3xl font-bold leading-none text-white group-hover:text-primary hoverEffect">
                            <Link href={project.liveUrl} target="_blank">
                              {project.title}
                            </Link>
                          </h3>
                          <Badge>{project.category}</Badge>
                          <p className="text-white/60 text-sm md:text-base leading-6 md:leading-normal">
                            {project.description}
                          </p>
                          <ul className="flex flex-wrap gap-2 md:gap-4 items-center">
                            {project.stack?.map((item, index) => (
                              <li
                                key={index}
                                className="text-xs md:text-base text-primary/80 bg-primary/10 px-1.5 py-0.5 rounded-sm select-none"
                              >
                                {item}
                                {index !== project.stack?.length - 1 && ""}
                              </li>
                            ))}
                          </ul>
                          <Separator className="bg-gray-700" />
                          <div className="flex items-center space-x-4">
                            <TooltipProvider>
                              <Tooltip>
                                <Link href={project.liveUrl} target="_blank">
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      className="bg-lightSky/5 text-white/80 border border-lightSky/20 hover:bg-lightSky/20 hover:border-lightSky hover:text-hoverColor hoverEffect"
                                    >
                                      <ArrowUpRight />
                                      <span className="sr-only">View Live Project</span>
                                    </Button>
                                  </TooltipTrigger>
                                </Link>
                                <TooltipContent className="bg-white text-black font-semibold">
                                  <p>View Live Project</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                              <Tooltip>
                                <Link href={project.githubUrl} target="_blank">
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      className="bg-lightSky/5 text-white/80 border border-lightSky/20 hover:bg-lightSky/20 hover:border-lightSky hover:text-hoverColor hoverEffect"
                                    >
                                      <Github />
                                      <span className="sr-only">
                                        View Github Repository
                                      </span>
                                    </Button>
                                  </TooltipTrigger>
                                </Link>
                                <TooltipContent className="bg-white text-black font-semibold">
                                  <p>View Github Repository</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>
                      </div>
                      <div className="w-full md:w-1/2 order-1 md:order-2">
                        <Link
                          href={project.liveUrl}
                          target="_blank"
                          className="relative h-72 sm:h-96 bg-gray-700 rounded-lg overflow-hidden flex"
                        >
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover"
                          />
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute right-10 -bottom-8">
            <CarouselPrevious className="rounded-md bg-transparent border border-lightSky/20 hover:bg-hoverColor/20 hover:text-white hover:border-hoverColor p-5 hoverEffect" />
            <CarouselNext className="rounded-md bg-transparent border border-lightSky/20 hover:bg-hoverColor/20 hover:text-white hover:border-hoverColor p-5 hoverEffect" />
          </div>
        </Carousel>
      </PageLayout>
    </div>
  )
}
