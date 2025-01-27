import type { Project, ProjectFiltersProps, WorkEducationProps } from "types";

export const workEducationData: WorkEducationProps[] = [
  {
    id: 1,
    title:
      "Bachelor of Science with First Class Honours in Information Technology",
    year: "2023 - 2024",
    meta: "Middlesex University London",
    text: "Middlesex University is a renowned institution celebrated for its academic excellence and commitment to innovation. It provides a dynamic learning environment for students from diverse backgrounds.\nI have undertaken a variety of courses at Middlesex University, including Advanced Web Development with Big Data, Digital Media Engineering, Web-Based Mobile App Development, and the Undergraduate Individual Project. These courses collectively contribute to my academic foundation, enhancing my capabilities in the field of computer science and technology.",
  },
  {
    id: 3,
    title: "Higher Diploma in Software Engineering",
    year: "2014 - 2017",
    meta: "Aptech Qatar Education",
    text: "The Higher Diploma in Software Engineering offered by Aptech Qatar Education is a specialized program that delivers comprehensive training in software development and engineering principles. It emphasizes equipping students with the essential skills and knowledge to design, develop, test, and maintain software systems.",
  },
  {
    id: 2,
    title: "High School Certificate",
    year: "2011 - 2014",
    meta: "Computer Department, Sudanese School - Doha, Qatar",
    text: "During my secondary school education, I graduated with high grades and displayed a keen interest in computer-related subjects. While I did well academically, I am genuinely passionate about the field, particularly in the area of programming, such as web development. I'm eager to continue learning and further develop my skills as I embark on a journey in this dynamic and ever-evolving field.",
  },
];

export const jobExperienceData: WorkEducationProps[] = [
  {
    id: 1,
    title: "Shms Agricultural",
    meta: "Shms Agricultural Services",
    link: "https://shmsagricultural.com",
    text: "Engineered a sleek agricultural website for peanuts with Next.js, Amazon Web Service, and MySQL RDS, amplifying user engagement and content richness through expert collaboration and innovative design.",
    year: "Jan 2024 - Mar 2024",
  },
  {
    id: 2,
    title: "Front-end Developer",
    meta: "INLINE Company",
    link: "https://inline.qa",
    text: "Designed a professional, user-friendly website for INLINE marketing company using WordPress, and JavaScript, working closely with the marketing team to develop a comprehensive content strategy and implement interactive features, data visualization tools, and mobile-responsive design.",
    year: "Jan 2023 - Mar 2023",
  },
  {
    id: 3,
    title: "Web Developer",
    meta: "Sudan Academic Journal for Research and Science",
    link: "http://sudanacademicjournalresearch.online/index?page=1",
    text: "Designed and developed an academic journal web application using PHP, JavaScript, and Bootstrap, collaborating with the editorial team to create a user-friendly platform with easy navigation, search functionality, and security measures. Conducted regular updates, maintenance, and improvements based on user feedback, contributing to the journal's growth and success.",
    year: "Jun 2016 - May 2021",
  },
  {
    id: 4,
    meta: "Qatar University",
    link: "https://sesri.qu.edu.qa",
    text: "Utilized statistical analysis and data collection tools to input accurate and complete information into databases, organized and analyzed data to identify patterns and trends, collaborated with team members to develop efficient data entry processes, communicated findings to inform decision making, monitored processes for improvement and met strict deadlines.",
    year: "Sep 2016 - Mar 2017",
    title: "Data Entry",
  },
];

export const filteredProjectsData: ProjectFiltersProps[] = [
  {
    _id: "type-php",
    title: "PHP",
    value: "PHP",
  },
  {
    _id: "type-expressjs",
    title: "ExpressJS",
    value: "ExpressJS",
  },
  {
    _id: "type-wordpress",
    title: "WordPress",
    value: "WordPress",
  },
  {
    _id: "type-bootstrap",
    title: "Bootstrap",
    value: "Bootstrap",
  },
  {
    _id: "type-nextjs",
    title: "NextJS",
    value: "NextJS",
  },
];

export const projectsData: Project[] = [
  {
    _createdAt: "2024-03-21T12:22:48Z",
    title: "Shms Agricultural Services",
    slug: null,
    coverimage: "shms.svg",
    imagegallery: ["shms.svg"],
    videogallery: null,
    description:
      "Engineered a sleek agricultural website for peanuts with Next.js, Amazon Web Service, and MySQL RDS, amplifying user engagement and content richness through expert collaboration and innovative design.",
    _id: "23412345-2f27-4446-8266-6056e60051fe",
    subtitle: null,
    url: "https://shmsagricultural.com",
    github: "",
    filter: [
      {
        _ref: "type-nextjs",
        _type: "reference",
        _key: "3b3e8ee8e2b2",
      },
    ],
  },
  {
    _createdAt: "2024-03-21T12:22:48Z",
    title: "Stay Makan Booking",
    slug: null,
    coverimage: "stay-makan.png",
    imagegallery: ["stay-makan.png"],
    videogallery: null,
    description:
      "Stay Makan Booking is a web application that allows users to book hotels, hostels, and guesthouses. The application is built using Next.js, Tailwind CSS, and PrismaORM. It features a user-friendly interface, and real-time booking updates. I collaborated with a team of developers to design and develop the application, ensuring a seamless user experience and efficient booking process.",
    _id: "453633245-2f27-4446-8266-6056Rex0051fe",
    subtitle: null,
    url: "https://staymakan.mohammedhaydar.com",
    github: "https://github.com/MHMDHIDR/staymakan",
    filter: [
      {
        _ref: "type-nextjs",
        _type: "reference",
        _key: "3b3e8ee8e2b2",
      },
    ],
  },
  {
    _createdAt: "2023-05-21T12:22:48Z",
    title: "Academic Journal for Research and Science",
    slug: null,
    coverimage: "saj.jpg",
    imagegallery: ["saj-lg.jpg"],
    videogallery: null,
    description:
      "During the period of June 2016 to May 2017, I designed and developed the Sudan Academic Journal Research website. Using PHP, JavaScript, and Bootstrap, I created a user-friendly platform that facilitated the publication of research work for scholars and researchers. Working closely with the editorial team, I ensured the website's design and functionality met the needs of the academic community, providing a seamless experience for authors to showcase their work.",
    _id: "03562b37-2f27-4446-8266-6056e60051fe",
    subtitle: null,
    url: "http://sudanacademicjournalresearch.online",
    github: "https://github.com/MHMDHIDR/saj-online",
    filter: [
      {
        _ref: "type-php",
        _type: "reference",
        _key: "c793ef590fb3",
      },
      {
        _ref: "type-bootstrap",
        _type: "reference",
        _key: "093af2c87343",
      },
    ],
  },
  {
    title: "Data Management Center",
    coverimage: "dmc-lg.jpg",
    imagegallery: null,
    url: "https://dmcqtr.com",
    filter: [
      {
        _ref: "type-wordpress",
        _type: "reference",
        _key: "e6e013f95b43",
      },
    ],
    _id: "523e7bc9-ee9e-4d3e-b5b2-a6c35de9db26",
    _createdAt: "2023-12-08T20:05:00Z",
    subtitle: null,
    slug: null,
    videogallery: null,
    github: null,
    description: null,
  },
  {
    _id: "6e6b2c10-e622-454d-8c51-e8da51b9bbce",
    title: "INLINE Marketing Agency",
    videogallery: null,
    filter: [
      {
        _ref: "type-wordpress",
        _type: "reference",
        _key: "ef9814b528fb",
      },
    ],
    description:
      "I designed a visually appealing and user-friendly website for INLINE, specializing in marketing solutions to empower businesses and enhance workflow. Collaborating closely with the marketing team, I developed a comprehensive content strategy featuring case studies, testimonials, and informative blog posts. Interactive features like forms and chatbots were implemented for seamless user engagement, and data visualization tools were built to showcase INLINE's analytics expertise, offering valuable insights to clients and prospects.",
    _createdAt: "2023-05-21T12:22:03Z",
    slug: null,
    imagegallery: ["inline-lg.jpg"],
    subtitle: null,
    coverimage: "inline.jpg",
    url: "https://inline.qa",
    github: null,
  },
  {
    _id: "b6f8c0c8-6034-47ef-b713-e26abe714ee1",
    title: "Restaurant App",
    imagegallery: ["mhmdhidr-restaurant-next-lg.jpg"],
    videogallery: null,
    url: "https://restaurant.technodevlabs.com",
    github: "https://github.com/MHMDHIDR/restaurant-app",
    _createdAt: "2023-05-21T12:07:57Z",
    subtitle: null,
    slug: null,
    coverimage: "mhmdhidr-restaurant-next.jpg",
    filter: [
      {
        _ref: "type-nextjs",
        _type: "reference",
        _key: "3b3e8ee8e2b2",
      },
    ],
    description:
      "From September 2021 to December 2022, I developed and maintained restaurant webapp, focusing on delivering a seamless user experience. By employing Next.js, I ensured smooth functionality and implemented an intuitive design to enhance usability and satisfaction for users.",
  },
  {
    title: "eCcommerce Web Application",
    subtitle: null,
    _id: "bf84a665-d8fa-4eea-acf2-a71c58a9f55b",
    videogallery: null,
    url: "https://ecommerce-mhmdhidr.vercel.app",
    github: "https://github.com/MHMDHIDR/ecommerce",
    slug: null,
    coverimage: "e-commerce.jpg",
    filter: [
      {
        _ref: "type-expressjs",
        _type: "reference",
        _key: "13bdb6d4b6b8",
      },
    ],
    imagegallery: ["e-commerce-lg.jpg"],
    description:
      "I developed an e-commerce platform, accessible at eCommerce app, using Express, React, and Tailwind CSS. By leveraging these technologies, I created a dynamic and visually appealing platform. The website offers a seamless shopping experience, incorporating intuitive navigation, responsive design, and stylish elements to enhance user engagement and satisfaction.",
    _createdAt: "2023-05-21T12:24:36Z",
  },
];
