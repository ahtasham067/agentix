import type { Project } from "../types";

// Facts and results from the owner's CV.
// TODO: confirm who owns Nizame-Taleem and our exact role.
export const nizameTaleem: Project = {
  slug: "nizame-taleem",
  name: "Nizame-Taleem",
  summary: "A school management system for day-to-day school operations.",
  tagline: "One system for school admin.",
  description:
    "A school management system that brings admissions, staff, classes, fees, attendance, exams and reports into one place.",
  tags: ["Web app", "Rails", "React"],
  stack: "Rails, React",
  category: "web-apps",
  thumbnail: "nizame-taleem",
  role: "Ruby on Rails and React development",
  audience: "School administrators and staff",
  clientWork: true,
  facts: [
    { label: "Type", value: "School management system" },
    { label: "Sector", value: "Education" },
    { label: "Stack", value: "Rails, React, Bootstrap" },
    { label: "Built with", value: "Ruby on Rails and React" },
  ],
  features: [
    { icon: "users", title: "Admissions", text: "New students are admitted in one place." },
    {
      icon: "book",
      title: "Staff and classes",
      text: "Staff records and classes are managed together.",
    },
    { icon: "card", title: "Fees", text: "Fees are managed in the same system." },
    { icon: "check", title: "Attendance", text: "Daily attendance is tracked in the system." },
    { icon: "calendar", title: "Exams", text: "Exams are managed in the same system." },
    { icon: "chart", title: "Reports", text: "Reports are generated from the same data." },
  ],
  steps: [],
  sections: [
    {
      heading: "A school management system in one place",
      paragraphs: [
        "Running a school means handling admissions, staff, classes, fees, attendance, exams and reports every day. When each of these lives in a separate register or spreadsheet, routine work takes longer and reports drift out of date.",
        "Nizame-Taleem brings all seven areas into one school management system, built with Ruby on Rails, React and Bootstrap.",
      ],
    },
    {
      heading: "Results for school staff",
      paragraphs: ["Reported results after the system went live:"],
      bullets: [
        "About 2 days less admin work per week for each staff member",
        "About 45% better report accuracy",
        "Routine tasks done 80% faster",
      ],
    },
    {
      heading: "What each part of a school management system does",
      paragraphs: [
        "Admissions keep a record of every applicant and new student. Staff and class records show who teaches what and where. Fees track what each family owes and has paid. Attendance records who was present each day, exams store marks, and reports pull all of this together for the school office and the leadership team.",
        "When these parts share one database, a change in one place shows up everywhere. A new student added at admission already appears in class lists, fee records and attendance, so staff stop entering the same details again and again.",
      ],
    },
  ],
  faqs: [
    {
      question: "Which areas does Nizame-Taleem cover?",
      answer: "Admissions, staff, classes, fees, attendance, exams and reports.",
    },
    {
      question: "What changed for school staff?",
      answer:
        "Admin work dropped by about 2 days per week for each staff member, report accuracy improved by about 45%, and routine tasks became 80% faster.",
    },
    {
      question: "What is Nizame-Taleem built with?",
      answer: "Ruby on Rails, React.js and Bootstrap.",
    },
    {
      question: "Can you build a school management system for us?",
      answer:
        "Yes. Tell us how your school runs today and which areas you want in one place, and we will reply with a plan and a timeline.",
    },
  ],
  screenshots: [],
  screens: [],
  builtWith: ["Ruby on Rails", "React.js", "Bootstrap"],
  relatedServices: ["web-apps"],
  relatedProjects: ["research-buddy", "clinidesk", "meyamb"],
  seo: {
    keyword: "school management system",
    title: "School Management System – Nizame-Taleem | Agentix",
    description:
      "Nizame-Taleem is a school management system for admissions, staff, classes, fees, attendance, exams and reports, built with Ruby on Rails and React.",
  },
  indexable: true,
  featured: false,
  sortOrder: 7,
  published: true,
};
