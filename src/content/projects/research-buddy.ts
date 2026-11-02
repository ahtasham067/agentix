import type { Project } from "../types";
import { screenshots } from "./screenshots.generated";

// Facts and results from the owner's CV. The owner's notes (intro.md) confirm it
// was built at a previous employer, so it is client work and the employer is not named.
export const researchBuddy: Project = {
  slug: "research-buddy",
  name: "Research Buddy",
  summary: "A reference and citation manager for researchers.",
  tagline: "References and citations without the busywork.",
  description:
    "A reference and citation manager with tags, folders, DOI and ISBN lookup, and automatic APA, MLA and Chicago citations.",
  answer:
    "Research Buddy is a reference and citation manager for researchers and students. It looks up sources by DOI or ISBN, organizes them with tags, folders and filters, and writes APA, MLA and Chicago citations automatically. It is client work built with React and Ruby on Rails, and it cut citation and search time by 50%.",
  tags: ["Web app", "React", "Rails"],
  stack: "React, Rails",
  category: "web-apps",
  thumbnail: "research-buddy",
  schemaKind: "software",
  role: "Built tagging, folders, filters, DOI/ISBN lookup and citations",
  audience: "Researchers and students",
  clientWork: true,
  facts: [
    { label: "Type", value: "Web app" },
    { label: "Audience", value: "Researchers" },
    { label: "Stack", value: "React, Rails" },
    { label: "Citation styles", value: "APA, MLA, Chicago" },
  ],
  features: [
    { icon: "folder", title: "Tags and folders", text: "Every source is tagged and filed." },
    {
      icon: "search",
      title: "Advanced filters",
      text: "Narrow the library down to the source you need.",
    },
    {
      icon: "book",
      title: "DOI and ISBN lookup",
      text: "Enter a DOI or ISBN and the details fill in.",
    },
    { icon: "check", title: "Automatic citations", text: "APA, MLA and Chicago, written for you." },
  ],
  steps: [
    { title: "Add a source", text: "Enter a DOI or ISBN and the metadata fills in." },
    { title: "Organize it", text: "Tag it, file it in a folder and filter your library." },
    { title: "Cite it", text: "Copy the citation in APA, MLA or Chicago style." },
  ],
  sections: [
    {
      heading: "A reference and citation manager for researchers",
      paragraphs: [
        "Researchers collect many sources, and formatting citations by hand is slow and easy to get wrong. Research Buddy keeps every reference in one library and writes the citation for you.",
        "Sources come in through DOI and ISBN metadata lookup. Tags, folders and advanced filters keep the library easy to search.",
      ],
    },
    {
      heading: "Results for researchers",
      paragraphs: [
        "Research Buddy cut the time spent searching documents and writing citations by 50%.",
      ],
    },
    {
      heading: "APA, MLA and Chicago in one library",
      paragraphs: [
        "Different fields expect different citation styles. Psychology and education often use APA, the humanities often use MLA, and history often uses Chicago. Each style orders the author, date, title and publisher in its own way, which is easy to get wrong when you format by hand.",
        "Research Buddy stores each source once, with the details it looked up from the DOI or ISBN, and produces the citation in the style you need. Switching a paper from one style to another no longer means retyping the reference list.",
      ],
    },
    {
      heading: "How DOI and ISBN lookup saves time",
      paragraphs: [
        "A DOI identifies a journal article and an ISBN identifies a book. Entering one of these numbers is enough for Research Buddy to fill in the title, authors and publication details, so researchers spend less time typing and make fewer mistakes.",
      ],
    },
  ],
  faqs: [
    {
      question: "Which citation styles does Research Buddy support?",
      answer: "APA, MLA and Chicago. Citations are generated automatically.",
    },
    {
      question: "How does it fill in source details?",
      answer: "Enter a DOI or an ISBN and Research Buddy looks up the metadata for you.",
    },
    {
      question: "How do researchers organize their sources?",
      answer: "With tags, folders and advanced filters.",
    },
    {
      question: "What changed for users?",
      answer: "Time spent searching documents and writing citations dropped by 50%.",
    },
  ],
  screenshots: screenshots["research-buddy"],
  screens: [],
  builtWith: ["React.js", "Ruby on Rails"],
  relatedServices: ["web-development"],
  relatedProjects: ["nizame-taleem", "autobuffy", "meyamb"],
  seo: {
    keyword: "reference and citation manager",
    title: "Reference & Citation Manager – Research Buddy | Agentix",
    description:
      "Research Buddy is a reference and citation manager with tags, folders, DOI and ISBN lookup, and automatic APA, MLA and Chicago citations for researchers.",
  },
  indexable: true,
  featured: false,
  sortOrder: 5,
  published: true,
};
