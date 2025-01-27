import type socialIcons from "@assets/socialIcons";

export type WorkEducationProps = {
  id: number;
  title: string;
  meta: string;
  link?: string;
  text: string;
  year: string;
};

export type Project = {
  _id: string;
  _createdAt: string;
  title: string;
  subtitle: string | null;
  slug: string | null;
  coverimage: string;
  imagegallery: string[] | null;
  videogallery: string[] | null;
  filter: {
    _ref: string;
    _type: string;
    _key: string;
  }[];
  url: string;
  github: string | null;
  description: string | null;
};

export type ProjectFiltersProps = {
  _id: string;
  title: string;
  value: string;
};

export type Site = {
  website: string;
  author: string;
  desc: string;
  title: string;
  ogImage?: string;
  lightAndDarkMode: boolean;
  postPerPage: number;
  scheduledPostMargin: number;
};

export type SocialObjects = {
  name: keyof typeof socialIcons;
  href: string;
  active: boolean;
  linkTitle: string;
}[];
