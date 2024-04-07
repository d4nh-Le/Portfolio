export interface Project {
  title: string;
  author: any;
  technologies: any;
  description: string;
  detail: Array<{ text: string, image: string | null }>;
  date: string;
  url: string;
  status: string;
  }