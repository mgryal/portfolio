import type { SiteContent } from "./types";

// Employer name used everywhere. Edit it here only.
// may change to "Plhain (ex Kronogram)"
export const KRONOGRAM_NAME = "Kronogram";

export const es: SiteContent = {
  locale: "es",
  profile: {
    name: "Maximiliano González",
    title: "Ingeniero de Software",
    location: "Temuco, Chile",
    shortPhrase:
      "Desarrollo software full-stack con C#/.NET, Node.js, TypeScript y React, desde la API hasta la nube con Azure, Docker y CI/CD.",
    email: "mgryal.d@gmail.com",
    linkedin: "https://www.linkedin.com/in/maximiliano-gonzalez-67108418b",
    github: "https://github.com/mgryal",
  },
  brand: { prompt: "mg@portfolio:~$" },
  nav: {
    label: "Navegación principal",
    items: [
      { id: "about", label: "~/sobre-mi" },
      { id: "experience", label: "~/experiencia" },
      { id: "projects", label: "~/proyectos" },
      { id: "skills", label: "~/habilidades" },
      { id: "education", label: "~/educacion" },
      { id: "contact", label: "~/contacto" },
    ],
  },
  sections: {
    about: { title: "Sobre mí", metaLabel: "PERFIL" },
    experience: { title: "Experiencia", metaLabel: "REGISTROS" },
    projects: { title: "Proyectos destacados", metaLabel: "PROYECTOS_CARGADOS" },
    skills: { title: "Habilidades", metaLabel: "CATEGORIAS" },
    education: { title: "Educación", metaLabel: "TITULOS" },
    contact: { title: "Contacto", metaLabel: "CANALES" },
  },
  hero: {
    greeting: "> hola, soy",
    ctaProjects: "ver proyectos",
    ctaContact: "contacto",
  },
  about: {
    paragraphs: [
      "Ingeniero Civil en Informática con casi 6 años de experiencia construyendo software en producción. En Outlier desarrollo plataformas para la industria minera, desde aplicaciones de monitoreo de perforaciones hasta automatización de procesos de datos en Azure y CI/CD. Trabajo en todo el stack con C#/.NET, Node.js, TypeScript y React, y he gestionado productos de punta a punta como Product Owner.",
    ],
    interestsLabel: "Intereses",
    interests: "Literatura fantástica, música, videojuegos y ciclismo.",
  },
  experience: [
    {
      id: "outlier",
      role: "Ingeniero de Software",
      company: "Outlier SpA",
      location: "Temuco, Chile",
      start: "2022.11",
      end: null,
      periodLabel: "Nov 2022 – Presente",
      context:
        "Outlier es una empresa de Temuco (desde 2014) que desarrolla software, integra datos operacionales y construye modelos analíticos para la minería y otras industrias de alta exigencia.",
      highlights: [
        "Desarrollé una PWA en React para el monitoreo de perforaciones mineras, que permite a operadores registrar y consultar el avance desde terreno, incluso sin conexión.",
        "Asumí el rol de desarrollador y Product Owner de una plataforma para una fundación educativa (.NET y React), desde el levantamiento de requisitos hasta su puesta en producción.",
        "Diseñé una herramienta en C# que genera automáticamente Dockerfile, Docker Compose y workflows de GitHub Actions, reduciendo la configuración inicial de nuevos proyectos de 30 a 5–10 minutos.",
        "Automaticé la ejecución de procesos de datos en máquinas virtuales mediante una solución serverless con Azure Functions.",
      ],
    },
    {
      id: "kronogram",
      role: "Desarrollador Full-Stack",
      company: KRONOGRAM_NAME,
      location: "Chile",
      start: "2020.12",
      end: "2022.11",
      periodLabel: "Dic 2020 – Nov 2022",
      context:
        "Plataforma para gestionar jornadas, lugares y actividades de trabajadores en terreno.",
      highlights: [
        "Implementé nuevas funcionalidades de backend y mantuve los microservicios de notificaciones y correo electrónico.",
        "Integré Mercado Pago para pagos en línea de clientes.",
      ],
    },
  ],
  projects: [
    {
      id: "pwa-perforaciones",
      kind: "work",
      title: "PWA de monitoreo de perforaciones mineras",
      summary:
        "Aplicación para que operadores registren y consulten el avance de perforaciones desde terreno, incluso sin conexión.",
      tags: ["React", "PWA", "Offline"],
    },
    {
      id: "plataforma-fundacion",
      kind: "work",
      title: "Plataforma para fundación educativa",
      summary:
        "Plataforma desarrollada desde el levantamiento de requisitos hasta su puesta en producción, con doble rol de desarrollador y Product Owner.",
      tags: [".NET", "React", "Product Owner"],
    },
    {
      id: "generador-docker-ci",
      kind: "work",
      title: "Generador de Docker y CI/CD",
      summary:
        "Herramienta que genera Dockerfile, Docker Compose y workflows de GitHub Actions, reduciendo la configuración inicial de nuevos proyectos de 30 a 5–10 minutos.",
      tags: ["C#", "Docker", "Docker Compose", "GitHub Actions"],
    },
    {
      id: "automatizacion-azure",
      kind: "work",
      title: "Automatización de procesos de datos en Azure",
      summary:
        "Solución serverless que automatiza la ejecución de procesos de datos en máquinas virtuales.",
      tags: ["Azure Functions", "Máquinas Virtuales", "Serverless"],
    },
    // Example of a personal project with links. Uncomment and fill in to add one.
    // Work projects must NOT define `links`; only personal ones may.
    // {
    //   id: "mi-proyecto",
    //   kind: "personal",
    //   title: "Nombre del proyecto",
    //   summary: "Qué hace y qué problema resuelve.",
    //   tags: ["TypeScript", "Next.js"],
    //   links: { demo: "https://example.com", repo: "https://github.com/mgryal/mi-proyecto" },
    // },
  ],
  skills: [
    { id: "languages", label: "Lenguajes", items: ["C#", "JavaScript", "TypeScript", "SQL"] },
    {
      id: "backend",
      label: "Backend",
      items: [".NET", "Node.js", "Express", "APIs REST", "Microservicios"],
    },
    { id: "frontend", label: "Frontend", items: ["React", "PWA"] },
    {
      id: "cloud",
      label: "Cloud y DevOps",
      items: [
        "Azure (Functions, Máquinas Virtuales)",
        "Docker",
        "Docker Compose",
        "GitHub Actions",
        "CI/CD",
      ],
    },
    { id: "databases", label: "Bases de datos", items: ["SQL Server", "MongoDB"] },
    {
      id: "soft",
      label: "Competencias",
      items: [
        "Pensamiento crítico",
        "Gestión de producto (Product Owner)",
        "Trabajo en equipo",
        "Adaptabilidad",
      ],
    },
  ],
  education: [
    {
      id: "ucsc",
      degree: "Ingeniería Civil en Informática",
      mention: "Mención Tecnologías de la Información",
      institution: "Universidad Católica de Temuco",
      period: "2018 – 2024",
    },
  ],
  contact: {
    intro: "¿Quieres conversar sobre un proyecto o una oportunidad? Escríbeme por cualquiera de estos canales.",
    items: [
      { id: "email", label: "Correo", display: "mgryal.d@gmail.com" },
      { id: "linkedin", label: "LinkedIn", display: "maximiliano-gonzalez" },
      { id: "github", label: "GitHub", display: "github.com/mgryal" },
    ],
  },
  seo: {
    title: "Maximiliano González — Ingeniero de Software",
    description:
      "Portafolio de Maximiliano González, Ingeniero Civil en Informática de Temuco, Chile. Software en producción para la industria minera con C#/.NET, Node.js, TypeScript, React y Azure.",
    siteName: "Maximiliano González",
    ogLocale: "es_CL",
    ogImageAlt: "Maximiliano González — Ingeniero de Software",
  },
  ui: {
    skipToContent: "Saltar al contenido",
    statusOnline: "STATUS: ONLINE",
    present: "PRESENTE",
    privateProject: "Proyecto de trabajo privado",
    opensInNewTab: "(abre en nueva pestaña)",
    projectsLinks: { demo: "Demo", repo: "Repositorio" },
    theme: {
      toLight: "Cambiar a tema claro",
      toDark: "Cambiar a tema oscuro",
    },
    menu: { open: "Abrir menú", close: "Cerrar menú" },
    footer: {
      lines: [
        "[ OK ] portafolio cargado",
        "[ OK ] sin cookies, sin rastreadores",
      ],
      rights: "Maximiliano González",
    },
  },
};
