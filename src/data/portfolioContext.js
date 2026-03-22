export const portfolioContext = {
  bio: [
    "Anuka Fonseka is a Software Engineer specializing in building enterprise grade web applications and scalable backend systems. With a strong foundation in full-stack development, Anuka transforms complex business requirements into elegant, maintainable solutions.",
    "Anuka's expertise lies in architecting and deploying production systems using Java Spring Boot, Next.js, and Vue.js. Anuka has successfully integrated enterprise authentication solutions like WSO2 Identity Server, implemented SSO across multiple platforms, and optimized applications to achieve 95%+ Lighthouse performance scores.",
    "Beyond writing code, Anuka focuses on the complete software lifecycle from system architecture and database design to Docker containerization, CI/CD pipelines, and Linux infrastructure management.",
    "Currently at Tryonics, Anuka works on enterprise projects for clients like Fairfirst and IASL, leading development from architecture to deployment.",
  ],
  contact: {
    email: "akunafonseka@gmail.com",
    portfolio: "https://anuka-fonseka.vercel.app",
  },
  skills: [
    { title: "Languages & Frameworks", skills: ["Java", "JavaScript", "Spring Boot", "Next.js", "React", "Vue.js", "Laravel"] },
    { title: "DevOps & Infrastructure", skills: ["Docker", "Docker Compose", "Nginx", "Linux", "CI/CD", "SSL Configuration"] },
    { title: "Authentication & Security", skills: ["WSO2 Identity Server", "SSO", "LDAP", "OAuth", "HMAC Authentication"] },
    { title: "Databases & Backend", skills: ["MySQL", "JDBC", "REST APIs", "Microservices", "Node.js", "Express"] },
    { title: "Frontend Technologies", skills: ["Tailwind CSS", "Redux Toolkit", "Server-Side Rendering", "SEO Optimization", "Responsive Design"] },
    { title: "Tools & Practices", skills: ["Git", "Jira", "Confluence", "Figma", "Postman", "Agile/Scrum", "System Design"] },
  ],
  experience: [
    {
      position: "Software Engineer",
      company: "Tryonics",
      time: "March 2025 - Present",
      work: "Design, develop, and deploy enterprise web applications using Java, Spring Boot, Next.js, Vue.js, Laravel, Docker, and Linux-based infrastructure. Responsible for system architecture, authentication integration, deployment automation, and performance optimization.",
      projects: [
        {
          title: "Intranet System - Fairfirst",
          technologies: "Java, Vue.js, WSO2 Identity Server, Docker, Linux, Nginx",
          achievements: [
            "Integrated WSO2 Identity Server with enterprise applications",
            "Implemented Single Sign-On (SSO) authentication across internal systems",
            "Developed Java background jobs for user and application usage report (CSV) generation",
            "Implemented HMAC authentication for legacy systems integration",
            "Configured WSO2 Identity Server with multiple user stores (LDAP, JDBC)",
            "Automated synchronization of Active Directory and external user databases",
            "Managed deployments using Docker Compose, Nginx reverse proxy, and SSL configuration",
          ],
        },
        {
          title: "IASL Website & CMS Platform",
          technologies: "Next.js, Spring Boot, MySQL, Docker, Nginx",
          achievements: [
            "Migrated static website to dynamic Next.js-based CMS platform",
            "Achieved 95%+ Lighthouse performance score through optimization",
            "Implemented SEO optimization using SSR, optimized image delivery, sitemap generation",
            "Managed QA and production deployments using Docker Compose",
          ],
        },
        {
          title: "Assessor Management System - Fairfirst",
          technologies: "Laravel, Vue.js, MySQL, Nginx",
          achievements: [
            "Resolved QA issues and stabilized production builds",
            "Implemented synchronization with call center database systems",
          ],
        },
        {
          title: "Tryo Corporate Website CMS",
          technologies: "Next.js, Tailwind CSS, Java, Docker, Nginx",
          achievements: [
            "Migrated application architecture to modern Next.js routing",
            "Converted SCSS-based styling into optimized Tailwind CSS implementation",
            "Mentored junior developers and supported development delivery",
          ],
        },
      ],
    },
    {
      position: "Software Engineering Intern",
      company: "Amerck",
      time: "August 2023 - October 2023",
      work: "Contributed to development of a remote ICU patient monitoring system. Developed REST APIs using Node.js, Express, and Sequelize ORM. Built responsive front-end components using Vite, Tailwind CSS, and Redux Toolkit. Collaborated in Agile (Scrum) environment using Jira and Confluence.",
    },
    {
      position: "Software Engineering Intern",
      company: "Medisense",
      time: "April 2022 - June 2022",
      work: "Developed backend services using Java Spring Boot and MySQL. Participated in database design and system architecture discussions. Led UI/UX design using Figma. Built frontend features using React.",
    },
  ],
  education: [
    {
      type: "BSc Engineering (Hons) in Computer Systems Engineering",
      time: "2020-2024",
      place: "NSBM Green University, Homagama, Sri Lanka",
      info: "Relevant courses included Data Structures and Algorithms, Computer Systems Engineering, and Artificial Intelligence.",
    },
    {
      type: "G.C.E. Advanced Level - Physical Science Stream",
      time: "2019",
      place: "Richmond College, Galle, Sri Lanka",
      info: "Combined Mathematics - B | Chemistry - B | Physics - C",
    },
  ],
};
