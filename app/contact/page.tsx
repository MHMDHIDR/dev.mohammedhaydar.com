import ContactForm from "@/components/ContactForm"
import Container from "@/components/Container"
import PageLayout from "@/components/PageLayout"
import { Mail } from "lucide-react"
import Link from "next/link"

const infoData = [
  { title: "email", description: "info@mohammedhaydar.com", icon: <Mail /> }
]

export default function ContactPage() {
  return (
    <PageLayout>
      <Container className="py-6 md:py-12 flex flex-col md:flex-row gap-6 md:gap-14">
        <div className="w-full md:w-2/3">
          <ContactForm />
        </div>
        <div className="w-full md:w-1/3 flex flex-col justify-center gap-4 md:gap-8">
          {infoData?.map(item => (
            <div key={item?.title} className="flex items-center space-x-4">
              <span className="bg-lightSky/5 p-4 rounded-md">{item?.icon}</span>
              <div>
                <h3 className="text-white/60 text-sm font-semibold capitalize">
                  {item?.title}
                </h3>
                <p>
                  {item?.title === "email" ? (
                    <Link
                      href={`mailto:${item?.description}`}
                      className="text-white/80 hover:text-lightSky/80"
                    >
                      {item?.description}
                    </Link>
                  ) : (
                    item?.description
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </PageLayout>
  )
}
