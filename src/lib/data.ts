// src/lib/data.ts

/** ---------- Asset-Imports (liegen im selben Ordner wie diese Datei) ---------- */

// Profilbild
import profilePicture from "./myProfile.jpg";

// Projektbilder
/*import projectIotImg from "./iot.jpg";
import projectDatavizImg from "./dataviz.jpg";
import projectDesignsystemImg from "./designsystem.jpg";*/

// Skill-Logos
import tsLogo from "./ts_logo.png";
import pyLogo from "./python_logo.png";
import htmlLogo from "./html-logo.png";
import jsLogo from "./js_logopng.png";

import javaLogo from "./java-logo.png";
import csharpLogo from "./csharp-logo.png";
import cLogo from "./c-logo.png";
import phpLogo from "./php-logo.png";
import delphiLogo from "./delphi-logo.png";

import reactLogo from "./react-logo.png";
import angularLogo from "./angular-logo.png";
import bootstrapLogo from "./bootstrap-logo.png";
import cssLogo from "./css-logog.png";


import nodeLogo from "./node-js.png";
import nestLogo from "./NestJS-logo.png";

import postgresLogo from "./postgres-logo.png";
import mongoLogo from "./mongodb-logo.png";

import dockerLogo from "./docker-logo.png";

// Badges (Zertifikate)
import cyberBadge from "./cyber-badge.png";
import intro2IotBadge from "./Intro2Iot.png";
import sapBadge from "./sap-logo.png";

/** ---------- Typen ---------- */

export type Experience = {
  company: string;
  location?: string;
  position: string;
  period: string; // z. B. "03/2022 – heute"
  achievements?: string[];
};

export type Education = {
  institution: string;
  location?: string;
  degree: string;
  period: string; // z. B. "2018 – 2022"
  achievements?: string[];
};

export type Certificate = {
  name: string;
  issuer?: string;
  date?: string;
  technologies?: string[];
  link?: string;
  badge?: string; // Pfad / URL zum Badge-Bild
};

export type Project = {
  title: string;
  summary?: string;
  description?: string[];
  stack?: string[];
  github?: string;
  demo?: string;
  image?: string;
};

export type SkillItem = {
  name: string;
  logo?: string; // Pfad / URL zum Logo
};

export type Skills = {
  programmingLanguages?: SkillItem[];
  frontendDevelopment?: SkillItem[];
  backendDevelopment?: SkillItem[];
  databaseAndStorage?: SkillItem[];
  cloudAndDevOps?: SkillItem[];
  toolsAndServices?: SkillItem[];
};

/** ---------- Persönliche Infos ---------- */

export const personalInfo = {
  name: "Johannes Ellmer",
  role: "Software Engineer · Full-Stack & Data",
  location: "St. Johann im Pongau, Österreich",
  email: "johannes.ellmer@htl-saalfelden.at",
  github: "https://github.com/JohannesEllmer",
  linkedin: "https://github.com/JohannesEllmer",

  // WICHTIG: .src => string, sonst ImageMetadata-Fehler
  profilePicture: profilePicture.src,

  heroDescription:
    "Ich entwickle performante Web-Anwendungen, robuste APIs und datengetriebene Features – mit Fokus auf Klarheit, Wartbarkeit und messbare Ergebnisse.",

  aboutStory:
    "Vom ersten Prototyp bis zum skalierbaren System: Ich verbinde moderne Frontends, skalierbare Backends und saubere Datenmodelle. Architektur, Tests und Observability sind für mich keine Extras, sondern Standard.",

  traits: [
    "TypeScript",
    "JavaScript",
    "React / Angular",
    "Node.js / REST / GraphQL",
    "Datenbanken (PostgreSQL, MongoDB)",
    "Docker & Container",
    "CI/CD",
    "Security & DevOps-Grundlagen",
  ],

  address: "Palfenweg 10, 5600 St. Johann im Pongau",
  company: "",
  legalNote: "Verantwortlich für den Inhalt: Johannes Ellmer",
} as const;

/** ---------- Berufserfahrung ---------- */

export const workExperience: Experience[] = [
  {
    company: "Bike & Car Rental Center Zell am See",
    location: "Zell am See",
    position: "Praktikant",
    period: "07/2022 – 08/2022 (4 Wochen)",
    achievements: [
      "Unterstützung im täglichen Betrieb sowie im Kundenservice",
      "Organisation, digitale Erfassung und Verwaltung von Fahrzeugverleihprozessen",
    ],
  },
  {
    company: "Porsche Konstruktionen GmbH & Co KG",
    location: "Salzburg",
    position: "IT-Praktikant (GroupIT)",
    period: "07/2023 – 08/2023 (5 Wochen)",
    achievements: [
      "Mitarbeit im IT-Support und Einblicke in Enterprise-Infrastruktur",
      "Durchführung technischer Analysen sowie Unterstützung interner IT-Prozesse",
    ],
  },
  {
    company: "Porsche Informatik GmbH",
    location: "Salzburg",
    position: "Software-Praktikant",
    period: "07/2024 – 8/2024 (5 Wochen)",
    achievements: [
      "Entwicklung kleiner Software-Tools und Komponenten mit PHP Symfony",
      "Arbeit im modernen Umfeld eines IT-Unternehmens mit agilen Methoden",
    ],
  },
  {
    company: "Porsche Informatik GmbH",
    location: "Salzburg",
    position: "Software-Praktikant",
    period: "07/2025 – 8/2024 (6 Wochen)",
    achievements: [
      "Entwicklung eines kleinen Software-Tools für Codeformatierung in Delphi",
      "Selbstständiges Arbeit im modernen Umfeld eines IT-Unternehmens mit agilen Methoden",
    ],
  },
];


/** ---------- Ausbildung ---------- */

export const education: Education[] = [
   {
    institution: "HTL Saalfelden – Informatik",
    location: "Saalfelden",
    degree: "Höhere Technische Lehranstalt für Informatik",
    period: "2021 – heute",
    achievements: [
      "Softwareentwicklung, Netzwerktechnik & Datenbanken",
      "Mitarbeit an mehreren Softwareprojekten (Web, Backend, Datenbank)",
      "Praktische Erfahrungen durch Praktika in der IT-Branche",
    ],
  },
  {
    institution: "Bundesrealgymnasium St. Johann im Pongau",
    location: "St. Johann im Pongau",
    degree: "Unterstufe",
    period: "2017 – 2021",
    achievements: [
      "Vertiefung in naturwissenschaftlichen und technischen Fächern",
    ],
  },
  {
    institution: "Neue Volksschule St. Johann im Pongau",
    location: "St. Johann im Pongau",
    degree: "Volksschule",
    period: "2013 – 2017",
    achievements: [
      "Grundlegende schulische Ausbildung und Entwicklung wichtiger sozialer Kompetenzen"
    ],
  },
 
];


/** ---------- Zertifikate / Badges ---------- */

export const certificates: Certificate[] = [
  {
    name: "Cyber Security Essentials",
    issuer: "Cisco Networking Academy",
    date: "2024",
    badge: cyberBadge.src,
    technologies: ["Security Basics", "Netzwerksicherheit", "Bedrohungsmodelle"],
  },
  {
    name: "Introduction to IoT",
    issuer: "Cisco Networking Academy",
    date: "2025",
    badge: intro2IotBadge.src,
    technologies: ["IoT-Grundlagen", "Sensorik", "Netzwerke"],
  },
  {
    name: "SAP ERP Grundlagen",
    issuer: "SAP Education",
    date: "2023",
    badge: sapBadge.src,
    technologies: ["SAP ERP", "Geschäftsprozesse", "Einführung & Customizing"],
  },
];

/** ---------- Awards (Fallback-Kompatibilität) ---------- */

export const awards = [
  {
    name: "Tech Excellence",
    issuer: "Lorem Org",
    date: "2022",
    type: "International",
    position: "Winner",
  },
];

/** ---------- Skills mit Logos ---------- */

export const skills: Skills = {
  programmingLanguages: [
    { name: "TypeScript", logo: tsLogo.src },
    { name: "JavaScript", logo: jsLogo.src },
    { name: "Python", logo: pyLogo.src },
    { name: "Java", logo: javaLogo.src },
    { name: "C#", logo: csharpLogo.src },
    { name: "C", logo: cLogo.src },
    { name: "PHP", logo: phpLogo.src },
    { name: "Delphi", logo: delphiLogo.src },
  ],
  frontendDevelopment: [
    { name: "HTML", logo: htmlLogo.src },
    { name: "CSS", logo: cssLogo.src },
    { name: "Bootstrap", logo: bootstrapLogo.src },
    { name: "Angular", logo: angularLogo.src },
    { name: "React", logo: reactLogo.src },
  ],
  backendDevelopment: [
    { name: "Node.js", logo: nodeLogo.src },
    { name: "NestJS", logo: nestLogo.src },
  ],
  databaseAndStorage: [
    { name: "PostgreSQL", logo: postgresLogo.src },
    { name: "MongoDB", logo: mongoLogo.src },
  ],
  cloudAndDevOps: [
    { name: "Docker", logo: dockerLogo.src },
    { name: "Github", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  ],

};

/** ---------- Projekte ---------- */

export const projects: Project[] = [
  {
    title: "Diplomarbeit: Bestellservice Hungersatt",
    summary:
      "Planung und Entwicklung eines Web-basierten Bestellsystems für das Schulbuffet",
    stack: ["Angular", "Node", "Postgres-DB", "Docker"],
    github: "https://github.com/JohannesEllmer/Diplomarbeit_Bestellapp",
    demo: "",
    //image: projectIotImg.src,
  },
  {
    title: "SYP-Projekt MBot-Lore 4. Klasse",
    summary:
      "Erstellung und implementierung des Frontends für die Steuerung eines MBot-Roboters",
    stack: ["Agular", "TypeScript", "CSS"],
    github: "https://github.com/jonasaberger/SYP4_MBOT_G1",
    demo: "",
    //image: projectDatavizImg.src,
  },
  {
    title: "GLOCK - SYP Projekt 3. Klasse",
    summary:
      "Erstellung eines 2d Jump'n'Run Spiels mit Python",
    stack: ["Python"],
    github: "https://github.com/JohannesEllmer/SYP-Project",
    demo: "",
    //image: projectDesignsystemImg.src,
  },
   {
    title: "WMC4 Projekt - PictureDrop Adminpanel",
    summary:
      "Erstellung eines PictureDrop Adminpanels zur Verwaltung von Bildern und Nutzern",
    stack: ["Angular", "TypeScript", "CSS", "Node.js", "Docker"],
    github: "https://github.com/jonasaberger/picture_drop_application.git",
    demo: "",
    //image: projectDesignsystemImg.src,
  },
  {
    title: "POS4 - Semsesterprojekt LernApp",
    summary:
      "Erstellung eine LernApp zur Unterstützung von Schülern beim Lernen von Vokabeln",
    stack: ["C#", "Postgres","Docker"],
    github: "https://github.com/JohannesEllmer/Semesterprojekt_LearnAPP.git",
    demo: "",
    //image: projectDesignsystemImg.src,
  },
   {
    title: "Praktikum - Codeformatter in Delphi",
    summary:
      "Erstellung eines Codeformatters zur automatischen Formatierung von Delphi Code",
    stack: ["Delphi", "Postgres","Docker"],
    github: "https://github.com/JohannesEllmer/Code-Formatter_Praktikum-2025.git",
    demo: "",
    //image: projectDesignsystemImg.src,
  },
  {
    title: "Praktikum - Wordle in Delphi",
    summary:
      "Wortspiel ähnlich wie Wordle in Delphi",
    stack: ["Delphi"],
    github: "https://github.com/JohannesEllmer/WordleGame_Delphi.git",
    demo: "",
    //image: projectDesignsystemImg.src,
  },
  {
    title: "POS3 - Adventskalender",
    summary:
      "Erstellung eines digitalen Adventskalenders mit täglichen Überraschungen",
    stack: ["Java"],
    github: "https://github.com/JohannesEllmer/Adventskalender3",
    demo: "",
    //image: projectDesignsystemImg.src,
  },
];
