import { SOCIALS } from "@/constants"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"

const SocialLinks = () => {
  return (
    <TooltipProvider>
      <div className="flex items-center gap-3">
        {SOCIALS.filter(social => social.active).map(social => (
          <Tooltip key={social.linkTitle}>
            <TooltipTrigger asChild>
              <div className="text-blue-400 border border-primary/30 p-2.5 rounded-full hover:bg-primary/10 hover:border-primary hoverEffect">
                <Link href={social?.href} target="_blank">
                  <social.icon className="w-6 h-6" />
                </Link>
              </div>
            </TooltipTrigger>
            <TooltipContent className="bg-primary font-semibold">
              {social?.linkTitle}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  )
}

export default SocialLinks
