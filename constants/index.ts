import {
  IconBrandCodepen,
  IconBrandGithub,
  IconBrandGmail,
  IconBrandLinkedin,
  IconBrandX,
} from '@tabler/icons-react'

export const navbarData = [
  { title: 'Home', href: '/' },
  { title: 'Services', href: '/services' },
  { title: 'Resume', href: '/resume' },
  { title: 'Projects', href: '/projects' },
  { title: 'Blog', href: '/blog' },
]

export const dashboardNavbarData = [
  { title: 'Dashboard', href: '/dashboard/blogs' },
  { title: 'Blogs', href: '/dashboard/blogs' },
  { title: 'Settings', href: '/dashboard/settings' },
]

export const statsData = [
  { num: 12, title: 'Years of experience' },
  { num: 25, title: 'Projects completed' },
  { num: 8, title: 'Technologies mastered' },
  { num: 500, title: 'Code commits' },
]

export const SITE = {
  website: 'https://mohammedhaydar.com',
  author: 'Mohammed Haydar | mohammedhaydar.com',
  desc: 'Mohammed Haydar Personal Portfolio Website Where I showcase My Projects, Work Experiences, and More...',
  title: 'Mohammed Haydar',
  postPerPage: 5,
}

export const SOCIALS = [
  {
    href: 'https://github.com/MHMDHIDR',
    linkTitle: `${SITE.title} on Github`,
    active: true,
    icon: IconBrandGithub,
  },
  {
    href: 'https://www.linkedin.com/in/mohammedhaydar',
    linkTitle: `${SITE.title} on LinkedIn`,
    active: true,
    icon: IconBrandLinkedin,
  },
  {
    href: 'mailto:mr.hamood277@gmail.com',
    linkTitle: `Send an email to ${SITE.title}`,
    active: true,
    icon: IconBrandGmail,
  },
  {
    href: 'https://twitter.com/mohmdhidr',
    linkTitle: `${SITE.title} on Twitter`,
    active: true,
    icon: IconBrandX,
  },
  {
    href: 'https://codepen.io/mhmdhidr',
    linkTitle: `${SITE.title} on CodePen`,
    active: false,
    icon: IconBrandCodepen,
  },
]

export const MAX_FILE_SIZE = 10 * 1024 * 1024
export const SUPPORTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
]
export const SUPPORTED_VIDEO_TYPES = ['video/mp4', 'video/quicktime', 'video/mpeg']
export const SUPPORTED_AUDIO_TYPES = ['audio/mpeg', 'audio/wav', 'audio/mp3']
