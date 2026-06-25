import type { ResumeData } from "../types/resume";
import { generateId } from "./utils";

export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  badge?: "mostPopular" | "popular";
  style: {
    accentColor: string;
    headerLayout: "standard" | "centered";
    showPhoto: boolean;
    sectionDivider: "line" | "none";
    headerBgColor?: string;
    photoPosition?: "top-left" | "top-right" | "top-center";
    sidebarColor?: string;
  };
  sampleData?: Partial<ResumeData>;
  /** Photo shown only in template previews (not copied to user's resume) */
  previewPhoto?: string;
}

export const TEMPLATES: ResumeTemplate[] = [
  {
    id: "executive",
    name: "Executive",
    description: "Navy sidebar for executive and corporate roles.",
    badge: "mostPopular",
    style: {
      accentColor: "#1e3a5f",
      headerLayout: "standard",
      showPhoto: true,
      sectionDivider: "line",
      sidebarColor: "#1e3a5f",
    },
    previewPhoto: "/photos/executive.jpg",
    sampleData: {
      fullName: "Charlotte Warren",
      headline: "Recruitment Officer",
      summary:
        "A self-driven, results-oriented Recruitment & HR Specialist with extensive experience in providing a full range of HR, Recruitment and Talent Management guidance. Balancing strategic planning with practical delivery to a diverse range of clients.",
      contact: {
        email: "charlotte@email.com",
        phone: "+1 (555) 202-0759",
        location: "San Francisco, CA",
        linkedin: "linkedin.com/in/charlottewarren",
        website: "",
      },
      experience: [
        {
          id: generateId(),
          company: "Haskins Corp",
          title: "Recruitment Officer",
          location: "Paris",
          startDate: "2013-07",
          endDate: null,
          current: true,
          description:
            "Responsible for full recruitment lifecycle of employees across 8 locations\nAttend progress meetings with key clients, monitoring performance and results\nReduced cost to hire by 22% through strategic sourcing initiatives",
        },
        {
          id: generateId(),
          company: "DPG Recruitment",
          title: "Trainer & Consultant",
          location: "New York",
          startDate: "2010-01",
          endDate: "2013-07",
          current: false,
          description:
            "Oversaw online recruitment system projects meeting strategic objectives\nManaged client portfolios, undertaking business analysis and building relationships\nTrained 50+ junior recruiters on best practices and compliance",
        },
        {
          id: generateId(),
          company: "Randstad",
          title: "HR Coordinator",
          location: "Boston, MA",
          startDate: "2008-08",
          endDate: "2009-12",
          current: false,
          description:
            "Coordinated onboarding processes for 100+ new hires annually\nMaintained employee records and ensured compliance with labor regulations\nAssisted in organizing career fairs and campus recruitment events",
        },
      ],
      education: [
        {
          id: generateId(),
          school: "CUNY",
          degree: "M.S.",
          field: "HR Strategic Management",
          startDate: "2005-09",
          endDate: "2008-07",
          highlights: "Graduated with distinction",
        },
        {
          id: generateId(),
          school: "SHRM",
          degree: "Certification",
          field: "SHRM Certified Professional (SHRM-CP)",
          startDate: "2011-01",
          endDate: "2011-06",
          highlights: "",
        },
      ],
      skillGroups: [
        {
          id: generateId(),
          category: "HR",
          skills: ["Recruitment", "HR Management", "Employee Relations", "Talent Acquisition"],
        },
        {
          id: generateId(),
          category: "Languages",
          skills: ["English", "French", "Spanish"],
        },
      ],
      projects: [
        {
          id: generateId(),
          name: "Employer Branding Initiative",
          description:
            "Led a company-wide employer branding project that revamped career pages and social presence, increasing qualified applications by 40% within 6 months.",
          technologies: ["LinkedIn Recruiter", "Greenhouse", "Canva"],
          startDate: "2023-01",
          endDate: "2023-07",
        },
      ],
    },
  },
  {
    id: "classic",
    name: "Classic",
    description: "Traditional centered layout, text-only. Pre-filled for a business analyst.",
    badge: "popular",
    style: {
      accentColor: "#111827",
      headerLayout: "centered",
      showPhoto: false,
      sectionDivider: "none",
    },
    sampleData: {
      fullName: "Sarah Mitchell",
      headline: "Business Analyst",
      summary:
        "Data-driven business analyst with 5 years of experience translating complex datasets into actionable strategies. Skilled at stakeholder management and cross-functional collaboration.",
      contact: {
        email: "sarah.mitchell@email.com",
        phone: "+1 (555) 876-5432",
        location: "New York, NY",
        linkedin: "linkedin.com/in/sarahmitchell",
        website: "",
      },
      experience: [
        {
          id: generateId(),
          company: "Goldman Sachs",
          title: "Business Analyst",
          location: "New York, NY",
          startDate: "2020-09",
          endDate: null,
          current: true,
          description:
            "Developed financial models that informed $2B+ in investment decisions\nLed requirements gathering for a new client reporting platform serving 200+ advisors\nReduced quarterly reporting cycle time by 35% through process automation",
        },
        {
          id: generateId(),
          company: "Deloitte",
          title: "Junior Analyst",
          location: "New York, NY",
          startDate: "2018-07",
          endDate: "2020-08",
          current: false,
          description:
            "Conducted market analysis for Fortune 500 clients across 3 industries\nCreated dashboards in Tableau adopted by 15+ consulting teams\nSupported due diligence on M&A transactions totaling $500M",
        },
        {
          id: generateId(),
          company: "Accenture",
          title: "Analyst Intern",
          location: "Boston, MA",
          startDate: "2017-06",
          endDate: "2018-06",
          current: false,
          description:
            "Assisted senior consultants with data collection and analysis for retail clients\nBuilt financial models in Excel to forecast quarterly revenue trends\nPresented findings to client stakeholders in weekly status meetings",
        },
      ],
      education: [
        {
          id: generateId(),
          school: "NYU Stern School of Business",
          degree: "B.S.",
          field: "Finance & Data Science",
          startDate: "2014-09",
          endDate: "2018-05",
          gpa: "3.7",
          highlights: "Magna Cum Laude, Finance Club President",
        },
        {
          id: generateId(),
          school: "CFA Institute",
          degree: "Certification",
          field: "CFA Level I",
          startDate: "2019-01",
          endDate: "2019-06",
          highlights: "Passed on first attempt",
        },
      ],
      skillGroups: [
        {
          id: generateId(),
          category: "Analysis",
          skills: ["Financial Modeling", "SQL", "Python", "Excel"],
        },
        {
          id: generateId(),
          category: "Tools",
          skills: ["Tableau", "Power BI", "Jira", "Confluence"],
        },
      ],
      projects: [
        {
          id: generateId(),
          name: "Customer Churn Prediction Model",
          description:
            "Developed a predictive analytics model that identified at-risk customers with 87% accuracy, enabling proactive retention strategies that reduced churn by 15%.",
          technologies: ["Python", "Tableau", "SQL"],
          startDate: "2022-03",
          endDate: "2022-09",
        },
      ],
    },
  },
  {
    id: "modern",
    name: "Modern",
    description: "Clean layout with blue accents. Pre-filled for a software engineer.",
    badge: "popular",
    style: {
      accentColor: "#2563eb",
      headerLayout: "standard",
      showPhoto: true,
      sectionDivider: "line",
    },
    previewPhoto: "/photos/modern.jpg",
    sampleData: {
      fullName: "Alex Chen",
      headline: "Senior Software Engineer",
      summary:
        "Full-stack engineer with 6+ years building scalable web applications. Passionate about developer experience, performance, and clean architecture.",
      contact: {
        email: "alex.chen@email.com",
        phone: "+1 (555) 234-5678",
        location: "San Francisco, CA",
        linkedin: "linkedin.com/in/alexchen",
        website: "alexchen.dev",
      },
      experience: [
        {
          id: generateId(),
          company: "Stripe",
          title: "Senior Software Engineer",
          location: "San Francisco, CA",
          startDate: "2021-03",
          endDate: null,
          current: true,
          description:
            "Led migration of payments dashboard to React 18, improving load times by 40%\nDesigned and shipped real-time webhook monitoring used by 50K+ merchants\nMentored 4 junior engineers through structured code review and pairing sessions",
        },
        {
          id: generateId(),
          company: "Vercel",
          title: "Software Engineer",
          location: "Remote",
          startDate: "2018-06",
          endDate: "2021-02",
          current: false,
          description:
            "Built Next.js deployment pipeline optimizations reducing build times by 30%\nContributed to open-source tooling used by 500K+ developers\nImplemented edge caching strategy that cut API latency by 60%",
        },
        {
          id: generateId(),
          company: "Mosaic Labs",
          title: "Junior Software Engineer",
          location: "San Francisco, CA",
          startDate: "2017-05",
          endDate: "2018-05",
          current: false,
          description:
            "Developed internal tooling for CI/CD pipelines using Python and Bash\nBuilt RESTful APIs serving 10K+ daily requests with Node.js and Express\nParticipated in on-call rotation and resolved production incidents within SLA",
        },
      ],
      education: [
        {
          id: generateId(),
          school: "UC Berkeley",
          degree: "B.S.",
          field: "Computer Science",
          startDate: "2014-08",
          endDate: "2018-05",
          gpa: "3.8",
          highlights: "Dean's List, Teaching Assistant for CS 61B",
        },
        {
          id: generateId(),
          school: "AWS",
          degree: "Certification",
          field: "AWS Solutions Architect Associate",
          startDate: "2020-01",
          endDate: "2020-03",
          highlights: "Scored 920/1000",
        },
      ],
      skillGroups: [
        {
          id: generateId(),
          category: "Languages",
          skills: ["TypeScript", "Python", "Go", "SQL"],
        },
        {
          id: generateId(),
          category: "Frameworks",
          skills: ["React", "Next.js", "Node.js", "FastAPI"],
        },
        {
          id: generateId(),
          category: "Tools",
          skills: ["PostgreSQL", "Redis", "Docker", "AWS", "GitHub Actions"],
        },
      ],
      projects: [
        {
          id: generateId(),
          name: "Open-Source CLI Tool",
          description:
            "Built a developer CLI for scaffolding Next.js projects with pre-configured CI/CD, linting, and testing setups. 1.2K+ GitHub stars.",
          url: "github.com/alexchen/create-next-stack",
          technologies: ["TypeScript", "Node.js", "GitHub Actions"],
          startDate: "2022-01",
          endDate: "2022-06",
        },
      ],
    },
  },
  {
    id: "balanced",
    name: "Balanced",
    description: "Dark sidebar accent with centered photo. Great for trades and hands-on roles.",
    style: {
      accentColor: "#1e293b",
      headerLayout: "centered",
      showPhoto: true,
      sectionDivider: "line",
      headerBgColor: "#1e293b",
      photoPosition: "top-center",
    },
    previewPhoto: "/photos/balanced.jpg",
    sampleData: {
      fullName: "Gregory Walls",
      headline: "Carpenter",
      summary:
        "Skilled and passionate Carpenter with 10+ years of experience in residential and commercial building. Positive reputation for quality work, timely construction, and finishing projects at or below estimated budget.",
      contact: {
        email: "gregory.walls@email.com",
        phone: "(203) 724-8485",
        location: "Bethel, CT",
        linkedin: "linkedin.com/in/gregorywalls",
        website: "",
      },
      experience: [
        {
          id: generateId(),
          company: "Timothy Glover Carpentry Inc.",
          title: "Carpenter",
          location: "Bethel",
          startDate: "2011-03",
          endDate: null,
          current: true,
          description:
            "Provided clients with supreme customer service and worked collaboratively to achieve construction needs\nRenovated 20 kitchens, installing top of the line cabinetry and plumbing fixtures\nBuilt 10 exterior decks and walkways ensuring each structure met code",
        },
        {
          id: generateId(),
          company: "Ringwood Inc.",
          title: "Carpenter",
          location: "Brookfield",
          startDate: "2007-02",
          endDate: "2011-02",
          current: false,
          description:
            "Worked one-on-one with clients to assess their needs and desires before beginning construction\nCreated clear blueprints and financial budgets for each project\nSpecialized in construction of bridge supports",
        },
        {
          id: generateId(),
          company: "Danbury Construction Co.",
          title: "Apprentice Carpenter",
          location: "Danbury, CT",
          startDate: "2005-06",
          endDate: "2007-01",
          current: false,
          description:
            "Assisted journeyman carpenters with framing, roofing, and finish work on residential projects\nLearned safe operation of power tools, table saws, and nail guns\nHelped maintain organized and clean job sites in compliance with OSHA standards",
        },
      ],
      education: [
        {
          id: generateId(),
          school: "Charter Oak State College",
          degree: "Apprenticeship",
          field: "Carpentry",
          startDate: "2005-08",
          endDate: "2007-05",
          highlights: "",
        },
        {
          id: generateId(),
          school: "OSHA Training Institute",
          degree: "Certification",
          field: "OSHA 30-Hour Construction Safety",
          startDate: "2008-03",
          endDate: "2008-04",
          highlights: "",
        },
      ],
      skillGroups: [
        {
          id: generateId(),
          category: "Technical",
          skills: [
            "Mechanical Skills",
            "Critical Thinking",
            "Hand-Eye Coordination",
            "Power Tools",
          ],
        },
        {
          id: generateId(),
          category: "Management",
          skills: ["Time Management", "Supervision", "Quality Control"],
        },
      ],
      projects: [
        {
          id: generateId(),
          name: "Custom Kitchen Renovation",
          description:
            "Designed and built a full kitchen renovation including custom cabinetry, hardwood flooring, and structural modifications. Completed on time and 10% under budget.",
          technologies: ["AutoCAD", "Woodworking", "Project Estimation"],
          startDate: "2023-03",
          endDate: "2023-08",
        },
      ],
    },
  },
  {
    id: "clear",
    name: "Clear",
    description: "Teal header banner with right-aligned photo. Clean and modern.",
    style: {
      accentColor: "#0f766e",
      headerLayout: "standard",
      showPhoto: true,
      sectionDivider: "line",
      headerBgColor: "#0f766e",
      photoPosition: "top-right",
    },
    previewPhoto: "/photos/clear.jpg",
    sampleData: {
      fullName: "Patricia Giordano",
      headline: "Receptionist",
      summary:
        "Hardworking and experienced Receptionist with several years of experience serving as a supportive and integral employee in high volume client settings. Experienced in creating schedules, making appointments, and providing clients with optimal customer service.",
      contact: {
        email: "patricia.g@email.com",
        phone: "(530) 732-2544",
        location: "San Francisco, CA",
        linkedin: "linkedin.com/in/patriciagiordano",
        website: "",
      },
      experience: [
        {
          id: generateId(),
          company: "Luxury Hotel Group",
          title: "Front Desk Receptionist",
          location: "San Francisco, CA",
          startDate: "2014-10",
          endDate: null,
          current: true,
          description:
            "Greeted guests and managed check-in/check-out procedures for 200+ room property\nManaged phone calls, mail distribution, and appointment scheduling\nCoordinated with housekeeping and maintenance to ensure guest satisfaction",
        },
        {
          id: generateId(),
          company: "Little Star Day Spa",
          title: "Receptionist",
          location: "Los Angeles, CA",
          startDate: "2010-06",
          endDate: "2014-10",
          current: false,
          description:
            "Answered phone calls, greeted clients, and handled all front desk responsibilities\nHandled spa orders, mail, and some accounting responsibilities\nProvided clients with information on services, technology, and products offered",
        },
        {
          id: generateId(),
          company: "West Valley Medical Center",
          title: "Front Desk Clerk",
          location: "Los Angeles, CA",
          startDate: "2008-09",
          endDate: "2010-05",
          current: false,
          description:
            "Managed patient check-in and check-out procedures for busy medical office\nScheduled appointments and maintained accurate patient records in EHR system\nProcessed insurance verifications and co-payments for 80+ patients daily",
        },
      ],
      education: [
        {
          id: generateId(),
          school: "Pierce College",
          degree: "Associate",
          field: "Communications",
          startDate: "2008-08",
          endDate: "2010-05",
          highlights: "",
        },
        {
          id: generateId(),
          school: "International Association of Administrative Professionals",
          degree: "Certification",
          field: "Certified Administrative Professional (CAP)",
          startDate: "2012-01",
          endDate: "2012-06",
          highlights: "",
        },
      ],
      skillGroups: [
        {
          id: generateId(),
          category: "Skills",
          skills: [
            "Communication",
            "Multitasking",
            "Scheduling",
            "Office Technology",
            "Bookkeeping",
          ],
        },
        {
          id: generateId(),
          category: "Languages",
          skills: ["English", "Italian", "French", "Spanish"],
        },
      ],
      projects: [
        {
          id: generateId(),
          name: "Office Digitization Project",
          description:
            "Led the transition from paper-based to digital filing systems across 3 departments, training 25+ staff members and reducing document retrieval time by 70%.",
          technologies: ["Google Workspace", "DocuSign", "Notion"],
          startDate: "2023-02",
          endDate: "2023-06",
        },
      ],
    },
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Sleek and minimal with green accents. Pre-filled for a designer.",
    style: {
      accentColor: "#059669",
      headerLayout: "standard",
      showPhoto: true,
      sectionDivider: "none",
    },
    previewPhoto: "/photos/minimal.jpg",
    sampleData: {
      fullName: "Jordan Rivera",
      headline: "Product Designer",
      summary:
        "Product designer crafting intuitive digital experiences for 4+ years. Focused on design systems, accessibility, and bridging the gap between design and engineering.",
      contact: {
        email: "jordan@designstudio.co",
        phone: "",
        location: "Austin, TX",
        linkedin: "linkedin.com/in/jordanrivera",
        website: "jordanrivera.design",
      },
      experience: [
        {
          id: generateId(),
          company: "Figma",
          title: "Product Designer",
          location: "Remote",
          startDate: "2022-01",
          endDate: null,
          current: true,
          description:
            "Designed component library used across 8 product teams\nLed redesign of collaboration features increasing daily active usage by 25%\nEstablished accessibility guidelines adopted company-wide",
        },
        {
          id: generateId(),
          company: "Spotify",
          title: "UI/UX Designer",
          location: "New York, NY",
          startDate: "2019-06",
          endDate: "2021-12",
          current: false,
          description:
            "Redesigned playlist creation flow reducing drop-off rate by 18%\nConducted 40+ user research sessions to validate design decisions\nBuilt and maintained Spotify's internal design system documentation",
        },
        {
          id: generateId(),
          company: "Dribbble Studio",
          title: "Junior Designer",
          location: "Austin, TX",
          startDate: "2018-06",
          endDate: "2019-05",
          current: false,
          description:
            "Created visual assets and UI mockups for 10+ client projects\nAssisted lead designer in building brand identity kits for startups\nDesigned responsive landing pages that increased client conversions by 12%",
        },
      ],
      education: [
        {
          id: generateId(),
          school: "Rhode Island School of Design",
          degree: "BFA",
          field: "Graphic Design",
          startDate: "2015-09",
          endDate: "2019-05",
          highlights: "President's Honor List",
        },
        {
          id: generateId(),
          school: "Google",
          degree: "Certification",
          field: "UX Design Professional Certificate",
          startDate: "2020-03",
          endDate: "2020-08",
          highlights: "Completed with honors",
        },
      ],
      skillGroups: [
        {
          id: generateId(),
          category: "Design",
          skills: ["Figma", "Sketch", "Adobe CC", "Prototyping"],
        },
        {
          id: generateId(),
          category: "Development",
          skills: ["HTML/CSS", "React", "Tailwind CSS", "Storybook"],
        },
      ],
      projects: [
        {
          id: generateId(),
          name: "DesignTokens.io",
          description:
            "Open-source tool for generating and syncing design tokens between Figma and code. 2K+ GitHub stars.",
          url: "github.com/jordanrivera/designtokens",
          technologies: ["React", "TypeScript", "Figma Plugin API"],
          startDate: "2023-03",
          endDate: null,
        },
      ],
    },
  },
  {
    id: "bold",
    name: "Bold",
    description: "Deep red header banner. Strong and confident.",
    style: {
      accentColor: "#b91c1c",
      headerLayout: "standard",
      showPhoto: true,
      sectionDivider: "line",
      headerBgColor: "#b91c1c",
      photoPosition: "top-right",
    },
    previewPhoto: "/photos/bold.jpg",
    sampleData: {
      fullName: "Herman Walton",
      headline: "Financial Analyst",
      summary:
        "Experienced and driven financial analyst with an impressive background in managing multi-million dollar budgets while providing analysis and account support within product development departments. Experience creating quarterly accounts based on trends and forecasted expenses.",
      contact: {
        email: "herman.walton@email.com",
        phone: "+1 (412) 479-6342",
        location: "New York, NY",
        linkedin: "linkedin.com/in/hermanwalton",
        website: "",
      },
      experience: [
        {
          id: generateId(),
          company: "GEO Corp",
          title: "Financial Analyst",
          location: "New York, NY",
          startDate: "2012-01",
          endDate: null,
          current: true,
          description:
            "Created budgets and ensured that labor and material costs were decreased by 15%\nGenerated financial statements including cash flow charts and balance sheets\nCreated analysis and performance reports for management teams to review",
        },
        {
          id: generateId(),
          company: "Sisco Enterprises",
          title: "Financial Analyst",
          location: "Seattle, WA",
          startDate: "2008-02",
          endDate: "2012-12",
          current: false,
          description:
            "Provided reports, ad-hoc analysis, annual operations plan budgets and revenue forecasts\nAnalysed supplier contracts and advised in negotiations bringing budgets down by 6%\nCreated weekly labor finance reports and presented results to management",
        },
        {
          id: generateId(),
          company: "PricewaterhouseCoopers",
          title: "Junior Financial Analyst",
          location: "Phoenix, AZ",
          startDate: "2006-11",
          endDate: "2008-01",
          current: false,
          description:
            "Assisted senior analysts in preparing quarterly financial reports and variance analyses\nReconciled accounts and maintained accurate records for audit readiness\nSupported budgeting process for 3 mid-size corporate clients",
        },
      ],
      education: [
        {
          id: generateId(),
          school: "University of Arizona",
          degree: "M.S.",
          field: "Computer Engineering",
          startDate: "2004-08",
          endDate: "2006-10",
          highlights: "Graduated with High Honors",
        },
        {
          id: generateId(),
          school: "University of Arizona",
          degree: "B.S.",
          field: "Computer Engineering",
          startDate: "2000-08",
          endDate: "2004-10",
          highlights: "Graduated with High Honors",
        },
      ],
      skillGroups: [
        {
          id: generateId(),
          category: "Technical",
          skills: [
            "Solution Strategies",
            "Analytical Thinker",
            "Market Assessment",
            "Trend Analysis",
          ],
        },
        {
          id: generateId(),
          category: "Soft Skills",
          skills: [
            "Effective Team Leader",
            "Collaboration",
            "Customer-centric Selling",
            "Networking",
          ],
        },
      ],
      projects: [
        {
          id: generateId(),
          name: "Quarterly Forecast Dashboard",
          description:
            "Built an automated financial forecasting dashboard in Power BI that consolidated data from 5 departments, reducing report generation time from 3 days to 2 hours.",
          technologies: ["Power BI", "Excel VBA", "SQL Server"],
          startDate: "2023-06",
          endDate: "2023-12",
        },
      ],
    },
  },
];

export function getTemplate(id: string): ResumeTemplate | undefined {
  return TEMPLATES.find((t) => t.id === id);
}

export interface ResumeStyle {
  accentColor: string;
  sectionDivider: "line" | "none";
  headerBgColor?: string;
  headerLayout: "standard" | "centered";
  photoPosition?: "top-left" | "top-right" | "top-center";
  sidebarColor?: string;
}

export function getResumeStyle(templateId?: string): ResumeStyle {
  const tmpl = templateId ? getTemplate(templateId) : undefined;
  return {
    accentColor: tmpl?.style.accentColor ?? "#111827",
    sectionDivider: tmpl?.style.sectionDivider ?? "line",
    headerBgColor: tmpl?.style.headerBgColor,
    headerLayout: tmpl?.style.headerLayout ?? "standard",
    photoPosition: tmpl?.style.photoPosition ?? "top-left",
    sidebarColor: tmpl?.style.sidebarColor,
  };
}

/**
 * Blend a hex color with white at a given opacity and return a flat hex.
 * Works in both CSS and @react-pdf/renderer (which doesn't support rgba).
 */
export function hexWithAlpha(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  // Blend against white
  const br = Math.round(r * alpha + 255 * (1 - alpha));
  const bg = Math.round(g * alpha + 255 * (1 - alpha));
  const bb = Math.round(b * alpha + 255 * (1 - alpha));
  return `#${br.toString(16).padStart(2, "0")}${bg.toString(16).padStart(2, "0")}${bb.toString(16).padStart(2, "0")}`;
}
