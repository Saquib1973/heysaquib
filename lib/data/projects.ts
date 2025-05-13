import type { ProjectInterface } from '.'
//nyaylok
import nyaylok from '@/public/assets/projects/nyaylok/nyaylok.jpeg'
//academia
import academia from '@/public/assets/projects/academiastacks/academia.png'
//vallet
import vallet1 from '@/public/assets/projects/vallet/vallet1.png'
import vallet2 from '@/public/assets/projects/vallet/vallet2.png'
//multimeter
import multimeter1 from '@/public/assets/projects/multimeter/multimeter1.png'
import multimeter2 from '@/public/assets/projects/multimeter/multimeter2.png'
//issuetracker
import issuetracker from '@/public/assets/projects/others/Issuetracker.png'
//blogig
import blogig from '@/public/assets/projects/blogig/blogigg.png'
import blogig1 from '@/public/assets/projects/blogig/blogig1.png'
import blogig2 from '@/public/assets/projects/blogig/blogig2.png'
import blogig3 from '@/public/assets/projects/blogig/blogig3.png'
import blogig4 from '@/public/assets/projects/blogig/blogig4.png'
//urlwee
import urlwee1 from '@/public/assets/projects/urlwee/urlwee1.png'
import urlwee2 from '@/public/assets/projects/urlwee/urlwee2.png'
import urlwee3 from '@/public/assets/projects/urlwee/urlwee3.png'
import urlwee4 from '@/public/assets/projects/urlwee/urlwee4.png'
//news4u
import news4u1 from '@/public/assets/projects/news4u/news4u1.png'
import news4u2 from '@/public/assets/projects/news4u/news4u2.png'
import news4u3 from '@/public/assets/projects/news4u/news4u3.png'
//yourHR
import urhr1 from '@/public/assets/projects/urhr/urhr1.png'
import urhr2 from '@/public/assets/projects/urhr/urhr2.png'
import urhr3 from '@/public/assets/projects/urhr/urhr3.png'
//quillBot
import quillBot from '@/public/assets/projects/others/quillbot.png'
//recalll
import recalll1 from '@/public/assets/projects/recalll/1.png'
import recalll2 from '@/public/assets/projects/recalll/2.png'
import recalll3 from '@/public/assets/projects/recalll/3.png'
import recalll4 from '@/public/assets/projects/recalll/4.png'
import recalll5 from '@/public/assets/projects/recalll/5.png'
import recalll6 from '@/public/assets/projects/recalll/6.png'
import recalll7 from '@/public/assets/projects/recalll/7.png'
//BreakBricks
import breakbricks1 from "@/public/assets/projects/breakbricks/breakbricks1.gif"
const Recall: ProjectInterface = {
  id: 'recalll',
  name: 'Recalll',
  status:'live',
  description: [
    'Recalll: Your Second Brain, Organized and Effortless',
    'Recalll is a powerful web application designed to help you capture, organize, and revisit content from across the web. Whether it’s tweets, YouTube videos, Pinterest pins, Instagram posts, or custom links, Recalll acts as your personal knowledge hub, making it easy to save everything in one place and access it later with just a few clicks.',
    'It is built with NextJS for Frontend , tailwindCSS for styling , Framer-Motion for animations ,NodeJS for backend and MongoDB for database. It is on Typescript to ensure type safety and better code quality.',
    'User can save links and content .User will be able to preview Instagram , Pinterest , Youtube and Twitter posts directly on the website .Will be adding more soon.',
  ],
  type: ['frontend', 'design', 'backend', 'fullstack'],
  img: [
    { src: recalll1, text: 'Home Page' },
    { src: recalll2, text: 'Page 2' },
    { src: recalll3, text: 'Page 3' },
    { src: recalll4, text: 'Page 4' },
    { src: recalll5, text: 'Page 5' },
    { src: recalll6, text: 'Page 6' },
    { src: recalll7, text: 'Page 7' },
  ],
  detail:
    'A web application designed to act as your second brain, helping you save and organize content from tweets, YouTube videos, Pinterest pins, Instagram posts, or custom links.',
  tags: [
    'NextJS',
    'MongoDB',
    'TailwindCSS',
    'NodeJS',
    'Typescript',
    'Framer-Motion',
  ],
  link: 'https://recalll.vercel.app/',
  git: 'https://github.com/Saquib1973/recall-fe',
  date: 'Jan 2025',
  featured: false,
}
const Nyaylok: ProjectInterface = {
  id: 'nyaylokSIH',
  name: 'Nyaylok',
  status: 'archived',

  description: [
    'Nyaylok is a cutting-edge case management website developed for the Smart India Hackathon 2023.',
    'It revolutionizes the Indian judicial system by prioritizing cases, facilitating timely resolutions, and enhancing overall efficiency.',
    'With advanced algorithms for case prioritization, Nyaylok ensures critical matters receive prompt attention.',
    'Its user-friendly interface empowers legal professionals to track case progress, manage documents, and engage with stakeholders seamlessly.',
    'By emphasizing victim engagement and transparency, Nyaylok fosters trust within the legal framework.',
    'Moving forward, Nyaylok aims to modernize further, incorporating feedback and adapting to legal advancements, ultimately contributing to a more efficient and equitable judicial system in India.',
  ],
  type: ['frontend', 'design'],
  img: [{ src: nyaylok, text: 'Home Page' }],

  detail:
    'Streamlined case management system developed for Smart India Hackathon 2023. Prioritized cases, facilitated resolutions, and enhanced judiciary efficiency.',
  tags: ['ReactJS', 'Redux', 'TailwindCSS', 'Express', 'Redis', 'MongoDB'],
  link: 'https://nyaylok.onrender.com/',
  git: 'https://github.com/Saquib1973/Nyaylok-Frontend',
  date: `Mar-Aug 2023`,
  featured: false,
}
const Vallet: ProjectInterface = {
  id: 'Vallet',
  name: 'Vallet',
  status: 'building',

  description: [
    'It is a wallet that generates a hierarchical tree-like structure of keys from a single master key, which is used to derive keys for different cryptocurrencies.',
    'It generates Solana and Ethereum like wallets',
  ],
  type: ['web3', 'frontend', 'design'],
  img: [
    { src: vallet1, text: 'Home Page' },
    { src: vallet2, text: 'Wallet' },
  ],
  detail:
    'Web3 based wallet app to demostrate the working of HD wallet , It is a wallet that generates a hierarchical tree-like structure of keys from a single master key, which is used to derive keys for different cryptocurrencies.',
  tags: [
    'NextJS',
    'NextUI',
    'TailwindCSS',
    'bip39',
    'bs58',
    'ed25519-hd-key',
    'tweetnacl',
  ],
  link: 'https://vallet-sacube.vercel.app/',
  git: 'https://github.com/Saquib1973/vallet',
  date: 'Sep 2024',
  featured: false,
}
const Urlwee: ProjectInterface = {
  id: 'urlwee',
  name: 'urlwee',
  status: 'live',

  description: [
    'URLwee is an advanced URL shortening service designed to simplify and enhance link sharing.',
    'Users can create shortened URLs, which they can easily copy, share, or generate a corresponding QR code for quick access.',
    'A login system allows users to manage their URLs through a personalized dashboard, where they can also update their username and password if available.',
    'URLwee provides detailed analytics with a map feature, helping users visualize where their traffic is coming from.',
    'Users can access comprehensive logs that record the time and location of URL hits, and download these logs for statistical analysis or model training.',
    'The application supports both dark and light modes, ensuring a comfortable user experience across different environments.',
  ],
  img: [
    { src: urlwee1, text: 'Home' },
    { src: urlwee2, text: 'QR code and other options' },
    { src: urlwee3, text: 'Map View' },
    { src: urlwee4, text: 'Logs' },
  ],
  type: ['frontend', 'backend', 'design', 'fullstack'],
  detail:
    'A versatile URL shortening service offering features like QR code generation, traffic analytics, and user management.',
  tags: [
    'ReactJS',
    'NodeJS',
    'geoip-lite',
    'MongoDB',
    'TailwindCSS',
    '@editorjs',
    'Recoil',
    'Framer Motion',
    'zod',
  ],
  link: 'https://urlwee.vercel.app/',
  git: 'https://github.com/Saquib1973/urlwee',
  date: 'May-Aug 2024',
  featured: false,
}
const AcademiaStacks: ProjectInterface = {
  id: 'academiaStacksCollege',
  name: 'Academia Stacks',
  status: 'archived',

  description: [
    'One stop solution for all your notes related issue',
    'Developed a college note aggregation website in 20 days with a friend.',
    'As primary frontend developer, created an intuitive user interface and played key role in connecting backend to frontend.',
  ],
  img: [{ src: academia, text: 'test' }],

  type: ['frontend', 'design'],
  detail:
    'Crafted college note aggregation website in 20 days. Led frontend development, connecting backend for seamless user experience.',
  tags: ['scss', 'react', 'framer-motion'],
  link: 'https://academia-stacks.vercel.app/',
  git: 'https://github.com/hellovaibhav/AcademiaStacks',
  date: '2021-25',
  featured: false,
}
const YourHR: ProjectInterface = {
  id: 'yourHR',
  name: 'yourHR',
  status: 'building',

  description: [
    'yourHR is a site for people to look for job and post jobs.',
    'You can save your skills and jobs will be filtered according to your skills.',
  ],
  img: [
    { src: urhr1, text: 'Home Page' },
    { src: urhr2, text: 'Add Job' },
    { src: urhr3, text: 'Sign In' },
  ],
  type: ['frontend', 'design', 'backend', 'fullstack'],
  detail:
    'yourHR simplifies job searching by matching opportunities to your saved skills. Find and apply for jobs aligned with your expertise all in one place.',
  tags: ['NextJS', 'Framer Motion', 'TailwindCSS', 'Prisma', 'Postgresql'],
  link: 'https://urhr.vercel.app/',
  git: 'https://github.com/Saquib1973/yourHR',
  date: '2021-25',
  featured: false,
}
const IssueTracker: ProjectInterface = {
  id: 'issueTracker',
  name: 'IssueTracker',
  status: 'live',

  description: [
    'Issue Tracker is a dynamic web application designed to revolutionize the blogging experience.',
    'With its user-friendly interface and intuitive editor powered by EditorJs, Blogig offers a seamless platform for writers to create and share engaging content effortlessly.',
    'The website boasts a meticulously crafted UI/UX design, leveraging the power of Framer Motion and Tailwind CSS to deliver a visually stunning and immersive user experience.',
    'Through Blogig, users can not only write and publish blogs but also explore a range of customization options to enhance their content.',
    'From dynamic animations to responsive layouts, Blogig prioritizes both aesthetics and functionality, ensuring that bloggers can express themselves creatively while reaching a wider audience.',
  ],
  img: [{ src: issuetracker, text: 'Home' }],

  type: ['frontend', 'backend', 'design', 'fullstack'],
  detail:
    'A user-friendly web app for writing and sharing blogs. Featuring an intuitive editor, beautiful UI/UX design, and integration of Framer Motion and Tailwind CSS.',
  tags: [
    'editor-js',
    'framer-motion',
    'mern',
    'tailwind',
    'aws-sdk',
    'firebase',
  ],
  link: 'https://issuehelp.vercel.app/',
  git: 'https://github.com/Saquib1973/tracker',
  date: '2023-24',
  featured: false,
}
const Blogig: ProjectInterface = {
  id: 'blogig',
  name: 'Blogig',
  status: 'live',

  description: [
    'Blogig is a dynamic web application designed to revolutionize the blogging experience.',
    'With its user-friendly interface and intuitive editor powered by EditorJs, Blogig offers a seamless platform for writers to create and share engaging content effortlessly.',
    'The website boasts a meticulously crafted UI/UX design, leveraging the power of Framer Motion and Tailwind CSS to deliver a visually stunning and immersive user experience.',
    'Through Blogig, users can not only write and publish blogs but also explore a range of customization options to enhance their content.',
    'From dynamic animations to responsive layouts, Blogig prioritizes both aesthetics and functionality, ensuring that bloggers can express themselves creatively while reaching a wider audience.',
  ],
  img: [
    { src: blogig1, text: 'Home' },
    { src: blogig2, text: 'Post' },
    { src: blogig3, text: 'User Profile' },
    { src: blogig4, text: 'User Dashboard' },
  ],
  type: ['frontend', 'backend', 'design', 'fullstack'],
  detail:
    'A user-friendly web app for writing and sharing blogs. Featuring an intuitive editor, beautiful UI/UX design, and integration of Framer Motion and Tailwind CSS.',
  tags: [
    'editor-js',
    'framer-motion',
    'mern',
    'tailwind',
    'aws-sdk',
    'firebase',
  ],
  link: 'https://blogig.vercel.app/',
  git: 'https://github.com/Saquib1973/bloggingWebsite',
  date: '2021-25',
  featured: false,
}
const News4U: ProjectInterface = {
  id: 'news4U',
  name: 'News For You',
  status: 'live',

  img: [
    { src: news4u1, text: 'Home' },
    { src: news4u2, text: 'News' },
    { src: news4u3, text: 'Admin Dashboard' },
  ],
  description: [
    'News website template with admin dashboard',
    'Project name is News4U',
    'It is a news website template.',
    'It includes an Admin dashboard UI as well',
  ],
  type: ['frontend', 'design'],

  detail:
    'Designed and developed a news website template with an integrated admin dashboard. The project, named News4U, offers a user-friendly interface for both general users browsing news articles and administrators managing the platform.',
  tags: ['tailwind', 'react'],
  link: 'https://news4u-sacube.vercel.app/',
  git: 'https://github.com/Saquib1973/AssignmentSiddi',
  date: '2021-25',
  featured: false,
}
const Multimeter: ProjectInterface = {
  id: 'multimeter',
  name: 'Multimeter',
  status: 'live',

  img: [
    { src: multimeter1, text: 'Board Design' },
    { src: multimeter2, text: 'Circuit' },
  ],
  description: [
    'This project is a multimeter designed in Tinkercad.',
    'It can measure various electrical parameters such as voltage, amperage, and inductance.',
    'The project includes circuit design and instrumentation.',
    'It was created using Tinkercad.',
  ],

  type: ['core', 'design'],
  detail:
    'This project is a multimeter designed using Tinkercad, capable of measuring various electrical parameters like voltage, amperage, and inductance. It involves circuit design and instrumentation and was created with Tinkercad',
  tags: ['tinkercad', 'instrumentation', 'circuit design', 'electronics'],
  link: 'https://www.tinkercad.com/things/dHty7Bh3smO-multimeter-damsel?sharecode=tNV00u_XPG_uG3V-U6_6Mzi_pB9--S2HS9EFFJrgTRw',
  git: '',
  date: '2021-25',
  featured: false,
}
const WeatherApp: ProjectInterface = {
  id: 'weatherApp',
  name: 'Weather App',
  status: 'archived',

  type: ['frontend', 'design'],
  description: [
    'You can enter name of a place and know the weather of that location',
  ],
  detail: '',
  tags: ['tailwind', 'react', 'express', 'mongoDb'],
  link: '',
  git: 'https://github.com/Saquib1973/WatherWebApp',
  date: '2021-25',
  featured: false,
}
const Ecommerce: ProjectInterface = {
  id: 'ecommerce',
  name: 'Ecommerce',
  status: 'archived',

  description: [],
  type: ['frontend', 'backend', 'design', 'fullstack'],
  detail: '',
  tags: ['tailwind', 'redux', 'react', 'express', 'mongoDb'],
  link: '',
  git: 'https://github.com/Saquib1973/Ecommerce',
  date: '2021-25',
  featured: false,
}
const QuillBot: ProjectInterface = {
  id: 'quillBot',
  name: 'Quill Bot',
  status: 'archived',

  description: [
    'Search Articles using a search engine for that',
    'Project name is Quill Bot',
    'It helps to find research articles from the net.',
    'It is basically a UI using API calls of a backend given to me for designing this website.',
    'It makes it easier for scholars to search for material.',
  ],
  type: ['frontend', 'design'],
  detail:
    'Quill Bot streamlines research article discovery with a user-friendly interface utilizing backend APIs. It aids scholars in efficiently accessing relevant material, simplifying their academic endeavors effectively and collaboratively.',
  tags: ['tailwind', 'react'],
  link: 'https://renderquillbot.onrender.com/',
  git: 'https://github.com/Saquib1973/QuillBotSearch',
  date: '2021-25',
  featured: false,
}
  const FireBaseAuth: ProjectInterface = {
    id: 'firebaseAuth',
    status: 'archived',

    name: 'Firebase Authentication App',
    type: ['frontend', 'backend', 'design', 'fullstack'],
    description: [
      'I was asked by a company to develop a Firebase authentication app by a company on internshala as a project . Without any prior experience in Firebase I was able to make it within the given time span with the help of documentations and tutorials .',
    ],
    detail: '',
    tags: ['react', 'scss', 'firebase'],
    link: 'https://fir-authentication-app-f9489.web.app/',
    git: 'https://github.com/Saquib1973/Firebase_Authentication_App',
    date: '2021-25',
    featured: false,
}

  const Portfolio: ProjectInterface = {
    id: 'portfolio',
    name: 'Portfolio',
    status: 'archived',
    description: [],
    type: ['frontend', 'design'],
    detail: '',
    tags: ['tailwind', 'react-redux', 'react', 'framer-motion'],
    link: 'https://heysaquib.vercel.app/',
    git: 'https://github.com/Saquib1973/portfolio',
    img: [{ src: null, text: 'test' }],
    date: '2021-25',
    featured: false,
}
  const BreakBricks: ProjectInterface = {
    id: 'breakbricks',
    name: 'BreakBricks',
    status: 'live',
    description: [
      'BreakBricks: The Ultimate Browser-Based Gaming Experience',
      'BreakBricks is a fully interactive web-based gaming platform that lets users play engaging arcade-style games right in their browser. The project features a dynamic gaming experience with real-time leaderboards, smooth animations, and an adaptive UI.',
      'It is built with Next.js for the frontend, Tailwind CSS for styling, Framer Motion for animations, and Node.js for the backend. The game mechanics are implemented using the HTML5 Canvas API for smooth rendering. TypeScript ensures type safety and enhances code maintainability.',
    ],
    type: ['frontend', 'design'],
    img: [{ src: breakbricks1, text: 'Gameplay' }],
    detail:
      'An interactive gaming platform that lets users play and compete in arcade-style browser games with real-time score tracking and an engaging UI.',
    tags: [
      'Next.js',
      'Tailwind CSS',
      'Framer Motion',
      'TypeScript',
      'Canvas API',
    ],
    link: 'https://breakbricks.vercel.app/',
    git: 'https://github.com/Saquib1973/breakout',
    date: 'Feb 2025',
    featured: false,
  }

export const Projects: ProjectInterface[] = [
  {...Recall,featured:true},
  { ...Urlwee,featured:true },
  { ...Vallet,minor:false },
  { ...Nyaylok,featured:true },
  {...BreakBricks,minor:true},
  { ...YourHR },
  { ...AcademiaStacks,featured:true },
  { ...IssueTracker },
  { ...Blogig },
  { ...News4U },
  { ...Multimeter },
  { ...WeatherApp },
  { ...Ecommerce },
  // { ...QuillBot },
  // { ...FireBaseAuth },
  // { ...Portfolio },
]
