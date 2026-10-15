export interface Project {
  id: number;
  title: string;
  category: string;
  location: string;
  image: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Villa One",
    category: "Residential",
    location: "Ahmedabad, India",
    image: "/images/project-1.jpg",
  },
  {
    id: 2,
    title: "Sky House",
    category: "Luxury Residence",
    location: "Surat, India",
    image: "/images/project-2.jpg",
  },
  {
    id: 3,
    title: "Urban Loft",
    category: "Interior",
    location: "Mumbai, India",
    image: "/images/project-3.jpg",
  },
  {
    id: 4,
    title: "Concrete House",
    category: "Architecture",
    location: "Goa, India",
    image: "/images/project-4.jpg",
  },
];