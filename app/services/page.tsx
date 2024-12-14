import PageLayout from "@/components/PageLayout"
import Title from "@/components/Title"
import { Separator } from "@/components/ui/separator"
import { ArrowUp } from "lucide-react"
import Link from "next/link"
import React from "react"
import { services } from "./services"

const ServicesPage = () => {
  return (
    <section className="min-h-[80vh] flex flex-col w-full py-5 md:py-10">
      <PageLayout>
        <Title>Services I Provide</Title>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-12">
          {services?.map((service, index) => (
            <Link
              key={index}
              href="/contact"
              className="flex flex-col p-6 bg-lightSky/5 border border-lightSky/20 hover:border-lightSky/30 rounded-lg shadow-md group hover:shadow-lg gap-2.5 hoverEffect"
            >
              <div className="w-full flex items-center justify-between">
                <p className="text-5xl font-extrabold text-outline text-transparent group-hover:text-outline-hover hoverEffect">
                  {index + 1}
                </p>
                <span>
                  <ArrowUp className="rotate-45" />
                </span>
              </div>
              <h2 className="font-semibold text-white">{service.title}</h2>
              <p className="text-sm md:text-base">{service.description}</p>
              <Separator className="bg-white/20" />
            </Link>
          ))}
        </div>
      </PageLayout>
    </section>
  )
}

export default ServicesPage
