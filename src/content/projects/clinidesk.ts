import type { Project } from "../types";
import { screenshots } from "./screenshots.generated";

// Facts from the owner's CV and the approved design.
export const clinidesk: Project = {
  slug: "clinidesk",
  name: "CliniDesk",
  summary:
    "Doctor appointments on WhatsApp. Patients book in chat, and doctors manage appointments and patient history from a dashboard.",
  tagline: "Doctor appointments on WhatsApp.",
  description:
    "Patients book in a WhatsApp chat. Doctors manage appointments and patient history from one dashboard.",
  answer:
    "CliniDesk is a WhatsApp doctor appointment system for clinics, hospitals and doctors. An AI receptionist books, reschedules and cancels appointments in Urdu, Roman Urdu or English, checks each doctor's real availability first, and syncs every booking to a Next.js and Supabase dashboard. Agentix built the agent, the n8n workflows and the dashboard.",
  tags: ["AI agent", "n8n", "Next.js", "Supabase"],
  stack: "Next.js, Supabase, n8n",
  category: "ai-agents",
  thumbnail: "clinidesk",
  websiteUrl: "https://clinidesk.online",
  role: "Built the WhatsApp AI agent, the n8n workflows and the dashboard",
  audience: "Clinics, hospitals and doctors",
  clientWork: false,
  facts: [
    { label: "Type", value: "AI agent and web app" },
    { label: "Channel", value: "WhatsApp" },
    { label: "Stack", value: "Next.js, Supabase, n8n" },
    { label: "Plan", value: "Monthly subscription" },
  ],
  features: [
    {
      icon: "chat",
      title: "Booking on WhatsApp",
      text: "Patients message the clinic and book without installing anything.",
    },
    {
      icon: "bot",
      title: "AI agent",
      text: "An n8n agent understands the request and replies in seconds.",
    },
    {
      icon: "calendar",
      title: "Doctor dashboard",
      text: "Doctors see and manage all appointments in one place.",
    },
    {
      icon: "clock",
      title: "Patient history",
      text: "Every visit is saved against the patient for quick reference.",
    },
  ],
  steps: [
    { title: "Patient messages", text: "They write to the clinic on WhatsApp." },
    { title: "Agent books", text: "The AI agent finds a free slot and confirms it." },
    { title: "Doctor sees it", text: "The appointment appears on the dashboard with history." },
  ],
  sections: [
    {
      heading: "A WhatsApp doctor appointment system for clinics",
      paragraphs: [
        "Most patients already use WhatsApp every day. CliniDesk lets them book a doctor's appointment in that same chat, at any hour, without installing an app or waiting on the phone.",
        "Booking by hand keeps the front desk busy and can put two patients in the same slot. CliniDesk works as a 24/7 WhatsApp AI receptionist: it takes the booking work off the desk and keeps every appointment in one place.",
      ],
    },
    {
      heading: "How the WhatsApp AI receptionist works",
      paragraphs: [
        "Patients can book, reschedule or cancel an appointment in Urdu, Roman Urdu or English. They can type their message or send a voice note.",
        "Before it offers a time, the n8n agent checks each doctor's real availability. That is how CliniDesk prevents double bookings. When the patient confirms, the booking syncs to a live dashboard straight away.",
      ],
    },
    {
      heading: "What clinic staff get",
      paragraphs: [
        "The dashboard is built with Next.js and Supabase. The chat runs on the WhatsApp Business Cloud API, and n8n runs the agent workflow behind it.",
      ],
      bullets: [
        "Hospital and doctor appointments in one view",
        "Patient visit history, saved against each patient",
        "Doctor schedules",
        "Booking analytics",
        "Staff roles for your team",
      ],
    },
  ],
  faqs: [
    {
      question: "Which languages does CliniDesk understand?",
      answer:
        "Patients can write in Urdu, Roman Urdu or English. They can also send a voice note instead of typing.",
    },
    {
      question: "Can patients reschedule or cancel on WhatsApp?",
      answer:
        "Yes. Patients can book, reschedule and cancel appointments in the same WhatsApp chat.",
    },
    {
      question: "How does CliniDesk prevent double bookings?",
      answer:
        "The n8n agent checks each doctor's real availability before it offers a slot. Every confirmed booking syncs to the dashboard right away, so a taken slot is not offered again.",
    },
    {
      question: "What does the clinic dashboard show?",
      answer:
        "Hospital and doctor appointments, patient visit history, analytics, staff roles and doctor schedules.",
    },
    {
      question: "Do patients need to install an app?",
      answer: "No. Patients book in WhatsApp, which they already have on their phone.",
    },
    {
      question: "How is CliniDesk priced?",
      answer:
        "CliniDesk is offered as a monthly subscription. See clinidesk.online for details, or ask us for a quote if you need a booking agent built for your own business.",
    },
  ],
  screenshots: screenshots["clinidesk"],
  screens: ["calendar", "patient-history"],
  builtWith: ["Next.js", "Supabase", "n8n", "WhatsApp Cloud API", "OpenAI"],
  relatedServices: ["chatbots-ai-agents", "automation", "web-development"],
  relatedProjects: ["nexa-ai", "nizame-taleem", "meyamb"],
  seo: {
    keyword: "WhatsApp doctor appointment system",
    title: "WhatsApp Doctor Appointment System – CliniDesk | Agentix",
    description:
      "CliniDesk is a WhatsApp doctor appointment system: an AI receptionist books patients 24/7 in Urdu, Roman Urdu or English and syncs a clinic dashboard.",
  },
  indexable: true,
  featured: true,
  sortOrder: 1,
  published: true,
};
