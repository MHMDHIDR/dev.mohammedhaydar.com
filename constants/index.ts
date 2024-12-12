import {
  IconBrandCodepen,
  IconBrandGithub,
  IconBrandGmail,
  IconBrandLinkedin,
  IconBrandX
} from "@tabler/icons-react"

export const navbarData = [
  { title: "Home", href: "/" },
  { title: "Services", href: "/services" },
  { title: "Resume", href: "/resume" },
  { title: "Projects", href: "/projects" },
  { title: "Blog", href: "/blog" }
]

export const dashboardNavbarData = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "Blogs", href: "/dashboard/blogs" },
  { title: "Settings", href: "/dashboard/settings" }
]

export const statsData = [
  { num: 12, title: "Years of experience" },
  { num: 25, title: "Projects completed" },
  { num: 8, title: "Technologies mastered" },
  { num: 500, title: "Code commits" }
]

export const servicesData = [
  {
    _id: "01",
    title: "Web Development",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, sequi distinctio minus esse consequatur fugit accusamus velit iste quisquam aut.",
    href: "https://www.youtube.com/@reactjsBD"
  },
  {
    _id: "02",
    title: "App Development",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, sequi distinctio minus esse consequatur fugit accusamus velit iste quisquam aut.",
    href: "https://www.youtube.com/@reactjsBD"
  },
  {
    _id: "03",
    title: "UI/UX Design",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, sequi distinctio minus esse consequatur fugit accusamus velit iste quisquam aut.",
    href: "https://www.youtube.com/@reactjsBD"
  },
  {
    _id: "04",
    title: "Logo Design",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, sequi distinctio minus esse consequatur fugit accusamus velit iste quisquam aut.",
    href: "https://www.youtube.com/@reactjsBD"
  }
]

export const SITE = {
  website: "https://mohammedhaydar.com",
  author: "Mohammed Haydar | mohammedhaydar.com",
  desc: "Mohammed Haydar Personal Portfolio Website Where I showcase My Projects, Work Experiences, and More...",
  title: "Mohammed Haydar",
  postPerPage: 5
}

export const SOCIALS = [
  {
    href: "https://github.com/MHMDHIDR",
    linkTitle: `${SITE.title} on Github`,
    active: true,
    icon: IconBrandGithub
  },
  {
    href: "https://www.linkedin.com/in/mohammedhaydar",
    linkTitle: `${SITE.title} on LinkedIn`,
    active: true,
    icon: IconBrandLinkedin
  },
  {
    href: "mailto:mr.hamood277@gmail.com",
    linkTitle: `Send an email to ${SITE.title}`,
    active: true,
    icon: IconBrandGmail
  },
  {
    href: "https://twitter.com/mohmdhidr",
    linkTitle: `${SITE.title} on Twitter`,
    active: true,
    icon: IconBrandX
  },
  {
    href: "https://codepen.io/mhmdhidr",
    linkTitle: `${SITE.title} on CodePen`,
    active: false,
    icon: IconBrandCodepen
  }
]
