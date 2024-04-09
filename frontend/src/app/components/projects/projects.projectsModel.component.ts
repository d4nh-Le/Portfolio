export interface Project {
  title: string;
  author: any;
  technologies: any;
  description: string;
  detail: Array<{ text: string, image: string | null , line: boolean}>;
  date: string;
  url: string;
  status: string;
  }