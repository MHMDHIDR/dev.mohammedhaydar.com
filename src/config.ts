import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://mohammedhaydar.com",
  author: "Mohammed Haydar | mohammedhaydar.com",
  desc: "Mohammed Haydar Personal Portfolio Website Where I showcase My Projects, Work Experiences, and More...",
  title: "Mohammed Haydar",
  ogImage: "MohammedHaydar-og.jpg",
  lightAndDarkMode: true,
  postPerPage: 5,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
};

export const LOCALE = {
  lang: "en", // html lang code. Set this empty and default will be "en"
  langTag: ["en-EN"], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export const LOGO_IMAGE = {
  enable: true,
  svg: true,
  width: 50,
  height: 50,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/MHMDHIDR",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/mohammedhaydar",
    linkTitle: `${SITE.title} on LinkedIn`,
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:mr.hamood277@gmail.com",
    linkTitle: `Send an email to ${SITE.title}`,
    active: true,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/mohmdhidr",
    linkTitle: `${SITE.title} on Twitter`,
    active: true,
  },
  {
    name: "CodePen",
    href: "https://codepen.io/mhmdhidr",
    linkTitle: `${SITE.title} on CodePen`,
    active: false,
  },
];
