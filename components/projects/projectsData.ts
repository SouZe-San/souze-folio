import type { TechIconType } from "~/assets/images/logos";

import gymBoyImg from "~/assets/images/projects/gymboy.webp";
import omsImg from "~/assets/images/projects/oms.webp";
import morphImg from "~/assets/images/projects/imagemorph.webp";
import ryitImg from "~/assets/images/projects/ryit.webp";
import marsImg from "~/assets/images/projects/mars.webp";
import findImg from "~/assets/images/projects/findYou.webp";
import webImg from "~/assets/images/projects/web.webp";

export interface Project {
  title: {
    first: string;
    last: string;
  };
  description: string;
  date: {
    month: string;
    year: string;
  };
  techStack: TechIconType[];
  imagUrl: string;
  gitUrl: string;
  liveUrl: string | null;
  projectType: "frontend" | "backend" | "fullStack";
}

export const AllProjects: Project[] = [
  {
    title: {
      first: "Gym",
      last: "Boy",
    },
    description:
      "Digital dumbbells for gym ops—no paper, just smooth billing, alerts, and member management.",
    date: {
      month: "June",
      year: "2025",
    },
    techStack: ["vue", "bun", "hono", "supabase", "ts"],
    gitUrl: "https://github.com/SouZe-San/GymBoy",
    imagUrl: gymBoyImg,
    liveUrl: "https://gym-boy.vercel.app/",
    projectType: "fullStack",
  },
  {
    title: {
      first: "OMS",
      last: "",
    },
    description:
      "One-click product ops, real-time stock alerts & dynamic dashboards—your eCommerce sidekick.",
    date: {
      month: "June",
      year: "2025",
    },
    techStack: ["next", "tailwind", "redux", "express", "ts", "prisma", "postgres", "docker"],
    gitUrl: "https://github.com/SouZe-San/oms",
    imagUrl: omsImg,
    liveUrl: null,
    projectType: "fullStack",
  },
  {
    title: {
      first: "Image",
      last: "Morph",
    },
    description:
      "a tool that allows users to easily Transforming animation & manga creation with automation, and versatility ",
    date: {
      month: "Jan",
      year: "2025",
    },
    techStack: ["reactJS", "scss", "tailwind", "express", "ts", "stability", "mongoDB"],
    gitUrl: "https://github.com/SouZe-San/ImageMorph",
    imagUrl: morphImg,
    liveUrl: null,
    projectType: "fullStack",
  },
  {
    title: {
      first: "The",
      last: "Ryit",
    },
    description: "Website for a Educational Service",
    date: {
      month: "June",
      year: "2024",
    },
    techStack: ["next", "sanity", "ts", "cssAnimation"],
    gitUrl: "https://github.com/SouZe-San/computer-training-center-webpage",
    imagUrl: ryitImg,
    liveUrl: "https://www.theryit.com/",
    projectType: "fullStack",
  },
  {
    title: {
      first: "Mars",
      last: `  Travels`,
    },
    description: " 🧑🏻‍🚀A cosmic tour of Mars in 3D! WebGL magic, 👽 alien-level animations.",
    date: {
      month: "May",
      year: "2024",
    },
    techStack: ["reactJS", "scss", "threeJs", "gsap"],
    gitUrl: "https://github.com/SouZe-San/project-Mars",
    imagUrl: marsImg,
    liveUrl: "https://project-mars-umber.vercel.app/",
    projectType: "frontend",
  },
  {
    title: {
      first: "Web",
      last: "News",
    },
    description:
      "A sleek newsreader on caffeine—zippy UI, animated flair, and API-powered tailored headlines.",
    date: {
      month: "Aug",
      year: "2024",
    },
    techStack: ["reactJS", "tailwind", "scss"],
    gitUrl: "https://github.com/SouZe-San/WebNews",
    imagUrl: webImg,
    liveUrl: null,
    projectType: "frontend",
  },
  {
    title: {
      first: "Find",
      last: "You",
    },
    description: "GitHub profile Looks elegant! Really🤔? ",
    date: {
      month: "Jan",
      year: "2024",
    },
    techStack: ["fresh", "tailwind", "deno", "ts"],
    gitUrl: "https://github.com/SouZe-San/FindYou",
    imagUrl: findImg,
    liveUrl: "https://find-u.deno.dev/",
    projectType: "frontend",
  },
];
