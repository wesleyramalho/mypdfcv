import type { ResumeData } from "@/types/resume";
import { generateId } from "@/lib/utils";
import { TEMPLATES } from "./resumeTemplates";

type PartialSampleData = Partial<ResumeData>;

const PT_BR_SAMPLE_DATA: Record<string, PartialSampleData> = {
  modern: {
    fullName: "Alexandre Santos",
    headline: "Engenheiro de Software Sênior",
    summary:
      "Engenheiro full-stack com mais de 6 anos construindo aplicações web escaláveis. Apaixonado por experiência do desenvolvedor, performance e arquitetura limpa.",
    contact: {
      email: "alexandre.santos@email.com",
      phone: "+55 (11) 98765-4321",
      location: "São Paulo, SP",
      linkedin: "linkedin.com/in/alexandresantos",
      website: "alexandresantos.dev",
    },
    experience: [
      {
        id: generateId(),
        company: "Nubank",
        title: "Engenheiro de Software Sênior",
        location: "São Paulo, SP",
        startDate: "2021-03",
        endDate: null,
        current: true,
        description:
          "Liderou a migração do dashboard de pagamentos para React 18, melhorando tempos de carregamento em 40%\nProjetou e entregou monitoramento de webhooks em tempo real usado por mais de 50 mil merchants\nMentorou 4 engenheiros juniores através de code review estruturado e sessões de pair programming",
      },
      {
        id: generateId(),
        company: "VTEX",
        title: "Engenheiro de Software",
        location: "Remoto",
        startDate: "2018-06",
        endDate: "2021-02",
        current: false,
        description:
          "Construiu otimizações no pipeline de deploy reduzindo tempos de build em 30%\nContribuiu para ferramentas open-source usadas por mais de 500 mil desenvolvedores\nImplementou estratégia de cache que reduziu a latência da API em 60%",
      },
      {
        id: generateId(),
        company: "Resultados Digitais",
        title: "Desenvolvedor Júnior",
        location: "Florianópolis, SC",
        startDate: "2017-01",
        endDate: "2018-05",
        current: false,
        description:
          "Desenvolveu APIs RESTful com Ruby on Rails atendendo mais de 10 mil requisições diárias\nParticipou de squad ágil responsável pelo módulo de automação de marketing\nImplementou testes automatizados aumentando cobertura de código de 60% para 85%",
      },
    ],
    education: [
      {
        id: generateId(),
        school: "USP",
        degree: "Bacharelado",
        field: "Ciência da Computação",
        startDate: "2014-02",
        endDate: "2018-12",
        gpa: "9.2",
        highlights: "Monitor de Estruturas de Dados, Iniciação Científica em IA",
      },
    ],
    certifications: [
      {
        id: generateId(),
        name: "AWS Solutions Architect Associate",
        issuer: "AWS",
        year: "2020",
        credentialId: "",
        credentialUrl: "",
      },
    ],
    skillGroups: [
      { id: generateId(), category: "Linguagens", skills: ["TypeScript", "Python", "Go", "SQL"] },
      {
        id: generateId(),
        category: "Frameworks",
        skills: ["React", "Next.js", "Node.js", "FastAPI"],
      },
      {
        id: generateId(),
        category: "Ferramentas",
        skills: ["PostgreSQL", "Redis", "Docker", "AWS", "GitHub Actions"],
      },
    ],
    projects: [
      {
        id: generateId(),
        name: "Ferramenta CLI Open-Source",
        description:
          "Construiu uma CLI para scaffolding de projetos Next.js com CI/CD, linting e testes pré-configurados. Mais de 1.2 mil stars no GitHub.",
        url: "github.com/alexandresantos/create-next-stack",
        technologies: ["TypeScript", "Node.js", "GitHub Actions"],
        startDate: "2022-01",
        endDate: "2022-06",
      },
    ],
  },
  classic: {
    fullName: "Sofia Oliveira",
    headline: "Analista de Negócios",
    summary:
      "Analista orientada a dados com 5 anos de experiência traduzindo necessidades de negócios em soluções técnicas. Habilidade em modelagem de processos, análise de requisitos e comunicação com stakeholders.",
    contact: {
      email: "sofia.oliveira@email.com",
      phone: "+55 (21) 99876-5432",
      location: "Rio de Janeiro, RJ",
      linkedin: "linkedin.com/in/sofiaoliveira",
      website: "",
    },
    experience: [
      {
        id: generateId(),
        company: "Ambev",
        title: "Analista de Negócios Sênior",
        location: "Rio de Janeiro, RJ",
        startDate: "2021-01",
        endDate: null,
        current: true,
        description:
          "Conduziu análise de processos de ponta a ponta para iniciativa de transformação digital que economizou R$ 800 mil/ano\nGerenciou backlog de requisitos para 3 equipes ágeis usando Jira e Confluence\nCriou dashboards executivos em Power BI rastreando 15+ KPIs em todas as unidades de negócio",
      },
      {
        id: generateId(),
        company: "Itaú Unibanco",
        title: "Analista de Negócios",
        location: "São Paulo, SP",
        startDate: "2018-03",
        endDate: "2020-12",
        current: false,
        description:
          "Mapeou fluxos de trabalho operacionais e identificou gargalos, reduzindo tempo de processamento em 25%\nFacilitou workshops com stakeholders para alinhar prioridades de negócios e tecnologia\nEscreveu especificações funcionais para migração de sistema legado",
      },
      {
        id: generateId(),
        company: "EY",
        title: "Analista Estagiária",
        location: "Rio de Janeiro, RJ",
        startDate: "2016-06",
        endDate: "2018-02",
        current: false,
        description:
          "Auxiliou consultores seniores na coleta e análise de dados para clientes do setor varejista\nElaborou modelos financeiros em Excel para previsão de receita trimestral\nApresentou resultados para stakeholders dos clientes em reuniões semanais",
      },
    ],
    education: [
      {
        id: generateId(),
        school: "PUC-Rio",
        degree: "MBA",
        field: "Gestão de Projetos",
        startDate: "2019-02",
        endDate: "2020-12",
        highlights: "Melhor Projeto de Conclusão",
      },
      {
        id: generateId(),
        school: "UFRJ",
        degree: "Bacharelado",
        field: "Administração de Empresas",
        startDate: "2012-02",
        endDate: "2016-12",
        highlights: "Magna Cum Laude",
      },
    ],
    certifications: [
      {
        id: generateId(),
        name: "Contador Público Certificado (CPA)",
        issuer: "American Institute of CPAs",
        year: "2008",
        credentialId: "",
        credentialUrl: "",
      },
    ],
    skillGroups: [
      {
        id: generateId(),
        category: "Análise",
        skills: [
          "Modelagem de Processos",
          "Levantamento de Requisitos",
          "SQL",
          "Data Visualization",
        ],
      },
      {
        id: generateId(),
        category: "Ferramentas",
        skills: ["Tableau", "Power BI", "Jira", "Confluence"],
      },
    ],
    projects: [
      {
        id: generateId(),
        name: "Modelo de Previsão de Churn",
        description:
          "Desenvolveu modelo preditivo que identificou clientes em risco com 87% de precisão, possibilitando estratégias proativas que reduziram churn em 15%.",
        technologies: ["Python", "Tableau", "SQL"],
        startDate: "2022-03",
        endDate: "2022-09",
      },
    ],
  },
  minimal: {
    fullName: "Lucas Ferreira",
    headline: "Designer de Produto",
    summary:
      "Designer de produto com 4+ anos criando experiências digitais intuitivas. Focado em design systems, pesquisa com usuários e prototipagem de alta fidelidade.",
    contact: {
      email: "lucas.ferreira@email.com",
      phone: "+55 (11) 91234-5678",
      location: "Curitiba, PR",
      linkedin: "linkedin.com/in/lucasferreira",
      website: "lucasferreira.design",
    },
    experience: [
      {
        id: generateId(),
        company: "iFood",
        title: "Designer de Produto Sênior",
        location: "Remoto",
        startDate: "2022-01",
        endDate: null,
        current: true,
        description:
          "Redesenhou o fluxo de checkout do app resultando em aumento de 22% na conversão\nCriou e manteve design system usado por 12 equipes de produto\nConduziu mais de 40 sessões de pesquisa com usuários para validar decisões de design",
      },
      {
        id: generateId(),
        company: "99",
        title: "Designer de Produto",
        location: "São Paulo, SP",
        startDate: "2019-06",
        endDate: "2021-12",
        current: false,
        description:
          "Projetou a experiência de onboarding para motoristas, reduzindo tempo de cadastro em 35%\nColaborou com engenheiros para implementar animações e micro-interações\nEstabeleceu diretrizes de acessibilidade para todos os produtos digitais",
      },
      {
        id: generateId(),
        company: "Agência Pulso",
        title: "Designer Júnior",
        location: "Curitiba, PR",
        startDate: "2018-01",
        endDate: "2019-05",
        current: false,
        description:
          "Criou assets visuais e mockups de UI para mais de 10 projetos de clientes\nAuxiliou o designer líder na construção de identidades visuais para startups\nDesenvolveu landing pages responsivas que aumentaram conversões dos clientes em 12%",
      },
    ],
    education: [
      {
        id: generateId(),
        school: "UFPR",
        degree: "Bacharelado",
        field: "Design Gráfico",
        startDate: "2015-02",
        endDate: "2019-12",
        highlights: "Projeto premiado em Design de Interfaces",
      },
    ],
    certifications: [
      {
        id: generateId(),
        name: "UX Design Professional Certificate",
        issuer: "Google",
        year: "2020",
        credentialId: "",
        credentialUrl: "",
      },
    ],
    skillGroups: [
      {
        id: generateId(),
        category: "Design",
        skills: ["Figma", "Sketch", "Adobe XD", "Prototyping"],
      },
      {
        id: generateId(),
        category: "Pesquisa",
        skills: ["Testes de Usabilidade", "Entrevistas", "Analytics", "A/B Testing"],
      },
    ],
    projects: [
      {
        id: generateId(),
        name: "Design System Open-Source",
        description:
          "Criou um design system completo com mais de 50 componentes, documentação interativa e tokens de design. Adotado por 3 startups brasileiras.",
        url: "github.com/lucasferreira/verde-ui",
        technologies: ["Figma", "Storybook", "React"],
        startDate: "2023-01",
        endDate: null,
      },
    ],
  },
  executive: {
    fullName: "Carolina Mendes",
    headline: "Gerente de Recrutamento",
    summary:
      "Profissional de RH com mais de 8 anos de experiência em recrutamento estratégico, desenvolvimento organizacional e gestão de talentos em empresas multinacionais.",
    contact: {
      email: "carolina.mendes@email.com",
      phone: "+55 (11) 97654-3210",
      location: "São Paulo, SP",
      linkedin: "linkedin.com/in/carolinamendes",
      website: "",
    },
    experience: [
      {
        id: generateId(),
        company: "Magazine Luiza",
        title: "Gerente de Recrutamento",
        location: "São Paulo, SP",
        startDate: "2020-06",
        endDate: null,
        current: true,
        description:
          "Gerencia equipe de 8 recrutadores responsáveis por mais de 200 contratações anuais\nImplementou sistema ATS que reduziu tempo de contratação em 35%\nDesenvolveu programa de diversidade que aumentou contratações de grupos sub-representados em 45%",
      },
      {
        id: generateId(),
        company: "Globo",
        title: "Analista de RH Sênior",
        location: "Rio de Janeiro, RJ",
        startDate: "2016-03",
        endDate: "2020-05",
        current: false,
        description:
          "Conduziu processos seletivos para posições de tecnologia e produto\nCriou programa de estágio que formou mais de 60 profissionais em 4 anos\nImplementou pesquisa de clima organizacional com 92% de participação",
      },
      {
        id: generateId(),
        company: "Natura",
        title: "Coordenadora de RH",
        location: "São Paulo, SP",
        startDate: "2013-08",
        endDate: "2016-02",
        current: false,
        description:
          "Coordenou processos de integração para mais de 100 novos colaboradores por ano\nManteve registros de funcionários e garantiu conformidade com legislação trabalhista\nOrganizou feiras de carreira e eventos de recrutamento em universidades",
      },
    ],
    education: [
      {
        id: generateId(),
        school: "FGV",
        degree: "Pós-Graduação",
        field: "Gestão de Pessoas",
        startDate: "2018-02",
        endDate: "2019-12",
        highlights: "Trabalho de conclusão sobre Employer Branding",
      },
      {
        id: generateId(),
        school: "PUC-SP",
        degree: "Bacharelado",
        field: "Psicologia Organizacional",
        startDate: "2009-02",
        endDate: "2013-12",
        highlights: "",
      },
    ],
    certifications: [
      {
        id: generateId(),
        name: "Contador Público Certificado (CPA)",
        issuer: "American Institute of CPAs",
        year: "2008",
        credentialId: "",
        credentialUrl: "",
      },
    ],
    skillGroups: [
      {
        id: generateId(),
        category: "RH",
        skills: ["Recrutamento", "Employer Branding", "Gestão de Talentos", "Treinamento"],
      },
      { id: generateId(), category: "Idiomas", skills: ["Português", "Inglês", "Espanhol"] },
    ],
    projects: [
      {
        id: generateId(),
        name: "Programa de Employer Branding",
        description:
          "Liderou projeto de employer branding que renovou páginas de carreira e presença digital, aumentando candidaturas qualificadas em 40%.",
        technologies: ["LinkedIn Recruiter", "Greenhouse", "Canva"],
        startDate: "2023-01",
        endDate: "2023-07",
      },
    ],
  },
  bold: {
    fullName: "Ricardo Almeida",
    headline: "Analista Financeiro",
    summary:
      "Analista financeiro com 6 anos de experiência em modelagem financeira, análise de investimentos e planejamento estratégico em empresas de grande porte.",
    contact: {
      email: "ricardo.almeida@email.com",
      phone: "+55 (11) 96543-2109",
      location: "São Paulo, SP",
      linkedin: "linkedin.com/in/ricardoalmeida",
      website: "",
    },
    experience: [
      {
        id: generateId(),
        company: "BTG Pactual",
        title: "Analista Financeiro Sênior",
        location: "São Paulo, SP",
        startDate: "2021-01",
        endDate: null,
        current: true,
        description:
          "Desenvolveu modelos financeiros para avaliação de empresas em processos de M&A totalizando R$ 2.5 bilhões\nAutomatizou relatórios trimestrais reduzindo tempo de preparação de 5 dias para 4 horas\nApresentou análises de investimento para comitê executivo mensalmente",
      },
      {
        id: generateId(),
        company: "XP Investimentos",
        title: "Analista Financeiro",
        location: "São Paulo, SP",
        startDate: "2018-06",
        endDate: "2020-12",
        current: false,
        description:
          "Analisou oportunidades de investimento em renda fixa e variável\nCriou dashboard de acompanhamento de portfólio para clientes de alta renda\nColaborou com equipe de research na elaboração de relatórios setoriais",
      },
      {
        id: generateId(),
        company: "Deloitte Brasil",
        title: "Analista Financeiro Júnior",
        location: "São Paulo, SP",
        startDate: "2016-06",
        endDate: "2018-05",
        current: false,
        description:
          "Auxiliou analistas seniores na preparação de relatórios financeiros trimestrais\nRealizou conciliações contábeis e manteve registros para auditorias\nSuporte ao processo orçamentário para 3 clientes corporativos de médio porte",
      },
    ],
    education: [
      {
        id: generateId(),
        school: "Insper",
        degree: "Bacharelado",
        field: "Administração de Empresas",
        startDate: "2014-02",
        endDate: "2018-12",
        highlights: "CFA Level II Candidate",
      },
      {
        id: generateId(),
        school: "FGV",
        degree: "Especialização",
        field: "Finanças Corporativas",
        startDate: "2019-02",
        endDate: "2020-06",
        highlights: "",
      },
    ],
    certifications: [
      {
        id: generateId(),
        name: "Contador Público Certificado (CPA)",
        issuer: "American Institute of CPAs",
        year: "2008",
        credentialId: "",
        credentialUrl: "",
      },
    ],
    skillGroups: [
      {
        id: generateId(),
        category: "Finanças",
        skills: ["Modelagem Financeira", "Valuation", "M&A", "FP&A"],
      },
      { id: generateId(), category: "Idiomas", skills: ["Português", "Inglês", "Espanhol"] },
    ],
    projects: [
      {
        id: generateId(),
        name: "Dashboard de Previsão Trimestral",
        description:
          "Construiu dashboard automatizado de previsão financeira em Power BI que consolidou dados de 5 departamentos, reduzindo tempo de geração de relatórios de 3 dias para 2 horas.",
        technologies: ["Power BI", "Excel VBA", "SQL Server"],
        startDate: "2023-06",
        endDate: "2023-12",
      },
    ],
  },
  balanced: {
    fullName: "Carlos Pereira",
    headline: "Carpinteiro",
    summary:
      "Carpinteiro experiente com mais de 10 anos em construção residencial e comercial. Especializado em acabamentos finos, móveis planejados e restauração de estruturas em madeira.",
    contact: {
      email: "carlos.pereira@email.com",
      phone: "+55 (41) 98765-4321",
      location: "Curitiba, PR",
      linkedin: "",
      website: "",
    },
    experience: [
      {
        id: generateId(),
        company: "Construtora Laguna",
        title: "Carpinteiro Sênior",
        location: "Curitiba, PR",
        startDate: "2019-03",
        endDate: null,
        current: true,
        description:
          "Lidera equipe de 6 carpinteiros em projetos residenciais de alto padrão\nEspecializado em instalação de pisos, esquadrias e acabamentos em madeira maciça\nGarantiu conformidade com normas técnicas e padrões de qualidade em todos os projetos",
      },
      {
        id: generateId(),
        company: "Marcenaria Artesanal",
        title: "Carpinteiro",
        location: "Curitiba, PR",
        startDate: "2013-01",
        endDate: "2019-02",
        current: false,
        description:
          "Projetou e construiu móveis planejados sob medida para mais de 200 clientes\nRestaurou peças de mobiliário antigo preservando técnicas tradicionais\nImplementou controle de qualidade que reduziu retrabalho em 30%",
      },
      {
        id: generateId(),
        company: "Construtora Batel",
        title: "Aprendiz de Carpinteiro",
        location: "Curitiba, PR",
        startDate: "2011-03",
        endDate: "2012-12",
        current: false,
        description:
          "Auxiliou carpinteiros experientes em estruturas, telhados e acabamentos residenciais\nAprendeu operação segura de ferramentas elétricas e equipamentos de marcenaria\nManteve canteiros de obra organizados em conformidade com normas de segurança",
      },
    ],
    education: [
      {
        id: generateId(),
        school: "SENAI",
        degree: "Técnico",
        field: "Marcenaria e Carpintaria",
        startDate: "2011-02",
        endDate: "2012-12",
        highlights: "Melhor Aluno da Turma",
      },
    ],
    certifications: [
      {
        id: generateId(),
        name: "NR-35 Segurança em Trabalho em Altura",
        issuer: "SENAI",
        year: "2013",
        credentialId: "",
        credentialUrl: "",
      },
    ],
    skillGroups: [
      {
        id: generateId(),
        category: "Carpintaria",
        skills: ["Acabamento Fino", "Restauração", "Leitura de Projetos", "Instalação de Pisos"],
      },
      {
        id: generateId(),
        category: "Gestão",
        skills: ["Gestão de Equipe", "Supervisão", "Controle de Qualidade"],
      },
    ],
    projects: [
      {
        id: generateId(),
        name: "Reforma de Cozinha Personalizada",
        description:
          "Projetou e construiu reforma completa de cozinha incluindo marcenaria sob medida, piso em madeira e modificações estruturais. Entregue no prazo e 10% abaixo do orçamento.",
        technologies: ["AutoCAD", "Marcenaria", "Estimativa de Projetos"],
        startDate: "2023-03",
        endDate: "2023-08",
      },
    ],
  },
  clear: {
    fullName: "Mariana Costa",
    headline: "Recepcionista",
    summary:
      "Recepcionista profissional com 5 anos de experiência em atendimento ao cliente, gestão de agendas e suporte administrativo em ambientes corporativos de alto volume.",
    contact: {
      email: "mariana.costa@email.com",
      phone: "+55 (11) 95432-1098",
      location: "São Paulo, SP",
      linkedin: "linkedin.com/in/marianacosta",
      website: "",
    },
    experience: [
      {
        id: generateId(),
        company: "Hospital Albert Einstein",
        title: "Recepcionista Sênior",
        location: "São Paulo, SP",
        startDate: "2021-04",
        endDate: null,
        current: true,
        description:
          "Atende mais de 150 visitantes diariamente com excelência e profissionalismo\nGerencia agendas de 8 salas de reunião e coordena logística de eventos internos\nTreinou 5 novos recepcionistas no sistema de gestão hospitalar",
      },
      {
        id: generateId(),
        company: "WeWork",
        title: "Recepcionista",
        location: "São Paulo, SP",
        startDate: "2018-08",
        endDate: "2021-03",
        current: false,
        description:
          "Gerenciou recepção de coworking com mais de 300 membros ativos\nCoordenou entregas, correspondências e serviços de suporte para inquilinos\nManteve índice de satisfação de 4.9/5.0 em pesquisas trimestrais",
      },
      {
        id: generateId(),
        company: "Clínica São Lucas",
        title: "Atendente de Recepção",
        location: "São Paulo, SP",
        startDate: "2016-06",
        endDate: "2018-07",
        current: false,
        description:
          "Gerenciou check-in e check-out de pacientes em clínica de alto volume\nAgendou consultas e manteve registros precisos no sistema eletrônico\nProcessou verificações de convênio e co-pagamentos para mais de 80 pacientes diariamente",
      },
    ],
    education: [
      {
        id: generateId(),
        school: "ETEC",
        degree: "Técnico",
        field: "Administração",
        startDate: "2016-02",
        endDate: "2017-12",
        highlights: "",
      },
    ],
    certifications: [
      {
        id: generateId(),
        name: "Secretariado e Assessoria Executiva",
        issuer: "SENAC",
        year: "2018",
        credentialId: "",
        credentialUrl: "",
      },
    ],
    skillGroups: [
      {
        id: generateId(),
        category: "Administração",
        skills: ["Atendimento ao Cliente", "Gestão de Agenda", "Pacote Office", "Telefonia"],
      },
      {
        id: generateId(),
        category: "Idiomas",
        skills: ["Português", "Inglês", "Italiano", "Espanhol"],
      },
    ],
    projects: [
      {
        id: generateId(),
        name: "Projeto de Digitalização do Escritório",
        description:
          "Liderou a transição de sistemas de arquivo em papel para digital em 3 departamentos, treinando mais de 25 funcionários e reduzindo tempo de busca de documentos em 70%.",
        technologies: ["Google Workspace", "DocuSign", "Notion"],
        startDate: "2023-02",
        endDate: "2023-06",
      },
    ],
  },
};

const ES_SAMPLE_DATA: Record<string, PartialSampleData> = {
  modern: {
    fullName: "Alejandro García",
    headline: "Ingeniero de Software Senior",
    summary:
      "Ingeniero full-stack con más de 6 años construyendo aplicaciones web escalables. Apasionado por la experiencia del desarrollador, el rendimiento y la arquitectura limpia.",
    contact: {
      email: "alejandro.garcia@email.com",
      phone: "+34 612 345 678",
      location: "Madrid, España",
      linkedin: "linkedin.com/in/alejandrogarcia",
      website: "alejandrogarcia.dev",
    },
    experience: [
      {
        id: generateId(),
        company: "Cabify",
        title: "Ingeniero de Software Senior",
        location: "Madrid, España",
        startDate: "2021-03",
        endDate: null,
        current: true,
        description:
          "Lideró la migración del dashboard de pagos a React 18, mejorando tiempos de carga en un 40%\nDiseñó y entregó monitoreo de webhooks en tiempo real usado por más de 50 mil comercios\nMentorizó a 4 ingenieros junior mediante code review estructurado y sesiones de pair programming",
      },
      {
        id: generateId(),
        company: "Typeform",
        title: "Ingeniero de Software",
        location: "Barcelona, España",
        startDate: "2018-06",
        endDate: "2021-02",
        current: false,
        description:
          "Construyó optimizaciones en el pipeline de despliegue reduciendo tiempos de build en un 30%\nContribuyó a herramientas open-source usadas por más de 500 mil desarrolladores\nImplementó estrategia de caché que redujo la latencia de la API en un 60%",
      },
      {
        id: generateId(),
        company: "Idealista",
        title: "Desarrollador Junior",
        location: "Madrid, España",
        startDate: "2017-01",
        endDate: "2018-05",
        current: false,
        description:
          "Desarrolló APIs RESTful con Spring Boot atendiendo más de 10 mil peticiones diarias\nParticipó en equipo ágil responsable del módulo de búsqueda de inmuebles\nImplementó tests automatizados aumentando la cobertura de código del 60% al 85%",
      },
    ],
    education: [
      {
        id: generateId(),
        school: "Universidad Politécnica de Madrid",
        degree: "Grado",
        field: "Ingeniería Informática",
        startDate: "2014-09",
        endDate: "2018-06",
        gpa: "8.7",
        highlights: "Matrícula de Honor en Algoritmos y Estructuras de Datos",
      },
    ],
    certifications: [
      {
        id: generateId(),
        name: "AWS Solutions Architect Associate",
        issuer: "AWS",
        year: "2020",
        credentialId: "",
        credentialUrl: "",
      },
    ],
    skillGroups: [
      { id: generateId(), category: "Lenguajes", skills: ["TypeScript", "Python", "Go", "SQL"] },
      {
        id: generateId(),
        category: "Frameworks",
        skills: ["React", "Next.js", "Node.js", "FastAPI"],
      },
      {
        id: generateId(),
        category: "Herramientas",
        skills: ["PostgreSQL", "Redis", "Docker", "AWS", "GitHub Actions"],
      },
    ],
    projects: [
      {
        id: generateId(),
        name: "Herramienta CLI Open-Source",
        description:
          "Creó una CLI para scaffolding de proyectos Next.js con CI/CD, linting y testing preconfigurados. Más de 1.2 mil estrellas en GitHub.",
        url: "github.com/alejandrogarcia/create-next-stack",
        technologies: ["TypeScript", "Node.js", "GitHub Actions"],
        startDate: "2022-01",
        endDate: "2022-06",
      },
    ],
  },
  classic: {
    fullName: "María López",
    headline: "Analista de Negocios",
    summary:
      "Analista orientada a datos con 5 años de experiencia traduciendo necesidades de negocio en soluciones técnicas. Experta en modelado de procesos, análisis de requisitos y comunicación con stakeholders.",
    contact: {
      email: "maria.lopez@email.com",
      phone: "+34 623 456 789",
      location: "Barcelona, España",
      linkedin: "linkedin.com/in/marialopez",
      website: "",
    },
    experience: [
      {
        id: generateId(),
        company: "CaixaBank",
        title: "Analista de Negocios Senior",
        location: "Barcelona, España",
        startDate: "2021-01",
        endDate: null,
        current: true,
        description:
          "Condujo análisis de procesos de extremo a extremo para iniciativa de transformación digital que ahorró 800 mil €/año\nGestionó el backlog de requisitos para 3 equipos ágiles usando Jira y Confluence\nCreó dashboards ejecutivos en Power BI rastreando más de 15 KPIs",
      },
      {
        id: generateId(),
        company: "Telefónica",
        title: "Analista de Negocios",
        location: "Madrid, España",
        startDate: "2018-03",
        endDate: "2020-12",
        current: false,
        description:
          "Mapeó flujos de trabajo operativos e identificó cuellos de botella, reduciendo tiempo de procesamiento en un 25%\nFacilitó talleres con stakeholders para alinear prioridades de negocio y tecnología\nRedactó especificaciones funcionales para migración de sistema legado",
      },
      {
        id: generateId(),
        company: "KPMG España",
        title: "Analista en Prácticas",
        location: "Barcelona, España",
        startDate: "2016-06",
        endDate: "2018-02",
        current: false,
        description:
          "Asistió a consultores senior en la recopilación y análisis de datos para clientes del sector retail\nElaboró modelos financieros en Excel para previsión de ingresos trimestrales\nPresentó resultados a stakeholders de clientes en reuniones semanales",
      },
    ],
    education: [
      {
        id: generateId(),
        school: "IE Business School",
        degree: "MBA",
        field: "Gestión de Proyectos",
        startDate: "2019-09",
        endDate: "2020-12",
        highlights: "Mejor Proyecto Final",
      },
      {
        id: generateId(),
        school: "Universitat de Barcelona",
        degree: "Grado",
        field: "Administración de Empresas",
        startDate: "2012-09",
        endDate: "2016-06",
        highlights: "Magna Cum Laude",
      },
    ],
    certifications: [
      {
        id: generateId(),
        name: "Contador Público Certificado (CPA)",
        issuer: "American Institute of CPAs",
        year: "2008",
        credentialId: "",
        credentialUrl: "",
      },
    ],
    skillGroups: [
      {
        id: generateId(),
        category: "Análisis",
        skills: ["Modelado de Procesos", "Requisitos", "SQL", "Data Visualization"],
      },
      {
        id: generateId(),
        category: "Herramientas",
        skills: ["Tableau", "Power BI", "Jira", "Confluence"],
      },
    ],
    projects: [
      {
        id: generateId(),
        name: "Modelo de Predicción de Churn",
        description:
          "Desarrolló modelo predictivo que identificó clientes en riesgo con 87% de precisión, permitiendo estrategias proactivas que redujeron churn en un 15%.",
        technologies: ["Python", "Tableau", "SQL"],
        startDate: "2022-03",
        endDate: "2022-09",
      },
    ],
  },
  minimal: {
    fullName: "Pablo Martínez",
    headline: "Diseñador de Producto",
    summary:
      "Diseñador de producto con 4+ años creando experiencias digitales intuitivas. Enfocado en design systems, investigación de usuarios y prototipado de alta fidelidad.",
    contact: {
      email: "pablo.martinez@email.com",
      phone: "+34 634 567 890",
      location: "Valencia, España",
      linkedin: "linkedin.com/in/pablomartinez",
      website: "pablomartinez.design",
    },
    experience: [
      {
        id: generateId(),
        company: "Glovo",
        title: "Diseñador de Producto Senior",
        location: "Barcelona, España",
        startDate: "2022-01",
        endDate: null,
        current: true,
        description:
          "Rediseñó el flujo de checkout de la app resultando en un aumento del 22% en conversión\nCreó y mantuvo design system usado por 12 equipos de producto\nConductó más de 40 sesiones de investigación con usuarios para validar decisiones de diseño",
      },
      {
        id: generateId(),
        company: "Wallapop",
        title: "Diseñador de Producto",
        location: "Barcelona, España",
        startDate: "2019-06",
        endDate: "2021-12",
        current: false,
        description:
          "Diseñó la experiencia de onboarding para vendedores, reduciendo tiempo de registro en un 35%\nColaboró con ingenieros para implementar animaciones y micro-interacciones\nEstableció directrices de accesibilidad para todos los productos digitales",
      },
      {
        id: generateId(),
        company: "Estudio Creativo Pixel",
        title: "Diseñador Junior",
        location: "Valencia, España",
        startDate: "2018-01",
        endDate: "2019-05",
        current: false,
        description:
          "Creó assets visuales y mockups de UI para más de 10 proyectos de clientes\nAsistió al diseñador principal en la creación de identidades de marca para startups\nDiseñó landing pages responsivas que aumentaron las conversiones de clientes en un 12%",
      },
    ],
    education: [
      {
        id: generateId(),
        school: "Universitat Politècnica de València",
        degree: "Grado",
        field: "Diseño y Tecnologías Creativas",
        startDate: "2015-09",
        endDate: "2019-06",
        highlights: "Premio al Mejor Proyecto de Diseño de Interfaces",
      },
    ],
    certifications: [
      {
        id: generateId(),
        name: "UX Design Professional Certificate",
        issuer: "Google",
        year: "2020",
        credentialId: "",
        credentialUrl: "",
      },
    ],
    skillGroups: [
      {
        id: generateId(),
        category: "Diseño",
        skills: ["Figma", "Sketch", "Adobe XD", "Prototyping"],
      },
      {
        id: generateId(),
        category: "Investigación",
        skills: ["Tests de Usabilidad", "Entrevistas", "Analytics", "A/B Testing"],
      },
    ],
    projects: [
      {
        id: generateId(),
        name: "Design System Open-Source",
        description:
          "Creó un design system completo con más de 50 componentes, documentación interactiva y tokens de diseño. Adoptado por 3 startups españolas.",
        url: "github.com/pablomartinez/verde-ui",
        technologies: ["Figma", "Storybook", "React"],
        startDate: "2023-01",
        endDate: null,
      },
    ],
  },
  executive: {
    fullName: "Isabel Navarro",
    headline: "Directora de Recursos Humanos",
    summary:
      "Profesional de RRHH con más de 8 años de experiencia en reclutamiento estratégico, desarrollo organizacional y gestión del talento en empresas multinacionales.",
    contact: {
      email: "isabel.navarro@email.com",
      phone: "+34 645 678 901",
      location: "Madrid, España",
      linkedin: "linkedin.com/in/isabelnavarro",
      website: "",
    },
    experience: [
      {
        id: generateId(),
        company: "Inditex",
        title: "Directora de Reclutamiento",
        location: "Madrid, España",
        startDate: "2020-06",
        endDate: null,
        current: true,
        description:
          "Gestiona equipo de 8 reclutadores responsables de más de 200 contrataciones anuales\nImplementó sistema ATS que redujo el tiempo de contratación en un 35%\nDesarrolló programa de diversidad que aumentó contrataciones de grupos subrepresentados en un 45%",
      },
      {
        id: generateId(),
        company: "Santander",
        title: "Responsable de RRHH",
        location: "Madrid, España",
        startDate: "2016-03",
        endDate: "2020-05",
        current: false,
        description:
          "Condujo procesos de selección para posiciones de tecnología y producto\nCreó programa de prácticas que formó a más de 60 profesionales en 4 años\nImplementó encuesta de clima organizacional con 92% de participación",
      },
      {
        id: generateId(),
        company: "Accenture",
        title: "Coordinadora de RRHH",
        location: "Barcelona, España",
        startDate: "2013-09",
        endDate: "2016-02",
        current: false,
        description:
          "Gestionó el onboarding de más de 150 nuevos empleados al año\nCoordinó programas de formación interna y desarrollo profesional\nApoyó en la implementación de evaluaciones de desempeño 360°",
      },
    ],
    education: [
      {
        id: generateId(),
        school: "IE Business School",
        degree: "Máster",
        field: "Dirección de Recursos Humanos",
        startDate: "2018-09",
        endDate: "2019-12",
        highlights: "Mejor Proyecto Final sobre Employer Branding",
      },
      {
        id: generateId(),
        school: "Universidad Complutense de Madrid",
        degree: "Grado",
        field: "Psicología",
        startDate: "2009-09",
        endDate: "2013-06",
        highlights: "",
      },
    ],
    certifications: [
      {
        id: generateId(),
        name: "Contador Público Certificado (CPA)",
        issuer: "American Institute of CPAs",
        year: "2008",
        credentialId: "",
        credentialUrl: "",
      },
    ],
    skillGroups: [
      {
        id: generateId(),
        category: "RRHH",
        skills: ["Reclutamiento", "Employer Branding", "Gestión del Talento", "Formación"],
      },
      { id: generateId(), category: "Idiomas", skills: ["Español", "Inglés", "Francés"] },
    ],
    projects: [
      {
        id: generateId(),
        name: "Iniciativa de Employer Branding",
        description:
          "Lideró proyecto de employer branding que renovó páginas de empleo y presencia digital, aumentando candidaturas cualificadas en un 40%.",
        technologies: ["LinkedIn Recruiter", "Greenhouse", "Canva"],
        startDate: "2023-01",
        endDate: "2023-07",
      },
    ],
  },
  bold: {
    fullName: "Carlos Ruiz",
    headline: "Analista Financiero",
    summary:
      "Analista financiero con 6 años de experiencia en modelado financiero, análisis de inversiones y planificación estratégica en grandes corporaciones.",
    contact: {
      email: "carlos.ruiz@email.com",
      phone: "+34 656 789 012",
      location: "Madrid, España",
      linkedin: "linkedin.com/in/carlosruiz",
      website: "",
    },
    experience: [
      {
        id: generateId(),
        company: "BBVA",
        title: "Analista Financiero Senior",
        location: "Madrid, España",
        startDate: "2021-01",
        endDate: null,
        current: true,
        description:
          "Desarrolló modelos financieros para valoración de empresas en procesos de M&A por valor de 2.500 millones €\nAutomatizó informes trimestrales reduciendo el tiempo de preparación de 5 días a 4 horas\nPresentó análisis de inversión al comité ejecutivo mensualmente",
      },
      {
        id: generateId(),
        company: "Deloitte",
        title: "Analista Financiero",
        location: "Madrid, España",
        startDate: "2018-06",
        endDate: "2020-12",
        current: false,
        description:
          "Analizó oportunidades de inversión en renta fija y variable\nCreó dashboard de seguimiento de cartera para clientes de alta renta\nColaboró con el equipo de research en la elaboración de informes sectoriales",
      },
      {
        id: generateId(),
        company: "PwC",
        title: "Analista Junior",
        location: "Barcelona, España",
        startDate: "2016-09",
        endDate: "2018-05",
        current: false,
        description:
          "Apoyó en auditorías financieras de empresas del IBEX 35\nPreparó documentación y análisis para due diligence en transacciones de M&A\nDesarrolló hojas de cálculo para análisis de flujos de caja",
      },
    ],
    education: [
      {
        id: generateId(),
        school: "ESADE",
        degree: "Grado",
        field: "Administración de Empresas",
        startDate: "2012-09",
        endDate: "2016-06",
        highlights: "CFA Level II Candidate",
      },
      {
        id: generateId(),
        school: "London School of Economics",
        degree: "Máster",
        field: "Finanzas Corporativas",
        startDate: "2019-09",
        endDate: "2020-06",
        highlights: "",
      },
    ],
    certifications: [
      {
        id: generateId(),
        name: "Contador Público Certificado (CPA)",
        issuer: "American Institute of CPAs",
        year: "2008",
        credentialId: "",
        credentialUrl: "",
      },
    ],
    skillGroups: [
      {
        id: generateId(),
        category: "Finanzas",
        skills: ["Modelado Financiero", "Valoración", "M&A", "FP&A"],
      },
      { id: generateId(), category: "Idiomas", skills: ["Español", "Inglés", "Catalán"] },
    ],
    projects: [
      {
        id: generateId(),
        name: "Dashboard de Previsión Trimestral",
        description:
          "Construyó dashboard automatizado de previsión financiera en Power BI que consolidó datos de 5 departamentos.",
        technologies: ["Power BI", "Excel VBA", "SQL Server"],
        startDate: "2023-06",
        endDate: "2023-12",
      },
    ],
  },
  balanced: {
    fullName: "Miguel Fernández",
    headline: "Carpintero",
    summary:
      "Carpintero experimentado con más de 10 años en construcción residencial y comercial. Especializado en acabados finos, muebles a medida y restauración de estructuras de madera.",
    contact: {
      email: "miguel.fernandez@email.com",
      phone: "+34 667 890 123",
      location: "Sevilla, España",
      linkedin: "",
      website: "",
    },
    experience: [
      {
        id: generateId(),
        company: "Construcciones García",
        title: "Carpintero Jefe",
        location: "Sevilla, España",
        startDate: "2019-03",
        endDate: null,
        current: true,
        description:
          "Lidera equipo de 6 carpinteros en proyectos residenciales de alto standing\nEspecializado en instalación de suelos, carpintería y acabados en madera maciza\nGarantiza conformidad con normativas técnicas y estándares de calidad",
      },
      {
        id: generateId(),
        company: "Ebanistería Artesanal",
        title: "Carpintero",
        location: "Sevilla, España",
        startDate: "2013-01",
        endDate: "2019-02",
        current: false,
        description:
          "Diseñó y construyó muebles a medida para más de 200 clientes\nRestauró piezas de mobiliario antiguo preservando técnicas tradicionales\nImplementó control de calidad que redujo retrabajos en un 30%",
      },
      {
        id: generateId(),
        company: "Construcciones Moreno",
        title: "Aprendiz de Carpintero",
        location: "Córdoba, España",
        startDate: "2010-06",
        endDate: "2012-12",
        current: false,
        description:
          "Asistió en instalaciones de puertas, ventanas y molduras\nAprendió técnicas de ebanistería tradicional bajo supervisión de maestro artesano\nMantuvo taller organizado y herramientas en condiciones óptimas",
      },
    ],
    education: [
      {
        id: generateId(),
        school: "Centro de Formación Profesional",
        degree: "FP Superior",
        field: "Carpintería y Mueble",
        startDate: "2008-09",
        endDate: "2010-06",
        highlights: "Mejor Alumno de la Promoción",
      },
    ],
    certifications: [
      {
        id: generateId(),
        name: "Prevención de Riesgos Laborales",
        issuer: "Fundación Laboral de la Construcción",
        year: "2011",
        credentialId: "",
        credentialUrl: "",
      },
    ],
    skillGroups: [
      {
        id: generateId(),
        category: "Carpintería",
        skills: ["Acabado Fino", "Restauración", "Lectura de Planos", "Instalación de Suelos"],
      },
      {
        id: generateId(),
        category: "Gestión",
        skills: ["Gestión de Equipos", "Supervisión", "Control de Calidad"],
      },
    ],
    projects: [
      {
        id: generateId(),
        name: "Reforma de Cocina Personalizada",
        description:
          "Diseñó y construyó reforma completa de cocina incluyendo ebanistería a medida, suelo de madera y modificaciones estructurales.",
        technologies: ["AutoCAD", "Ebanistería", "Estimación de Proyectos"],
        startDate: "2023-03",
        endDate: "2023-08",
      },
    ],
  },
  clear: {
    fullName: "Laura Sánchez",
    headline: "Recepcionista",
    summary:
      "Recepcionista profesional con 5 años de experiencia en atención al cliente, gestión de agendas y soporte administrativo en entornos corporativos de alto volumen.",
    contact: {
      email: "laura.sanchez@email.com",
      phone: "+34 678 901 234",
      location: "Valencia, España",
      linkedin: "linkedin.com/in/laurasanchez",
      website: "",
    },
    experience: [
      {
        id: generateId(),
        company: "Hotel Arts Barcelona",
        title: "Recepcionista Senior",
        location: "Barcelona, España",
        startDate: "2021-04",
        endDate: null,
        current: true,
        description:
          "Atiende a más de 150 visitantes diariamente con excelencia y profesionalismo\nGestiona agendas de 8 salas de reuniones y coordina logística de eventos internos\nFormó a 5 nuevos recepcionistas en el sistema de gestión hotelera",
      },
      {
        id: generateId(),
        company: "WeWork",
        title: "Recepcionista",
        location: "Madrid, España",
        startDate: "2018-08",
        endDate: "2021-03",
        current: false,
        description:
          "Gestionó recepción de coworking con más de 300 miembros activos\nCoordinó entregas, correspondencia y servicios de soporte para inquilinos\nMantuvo índice de satisfacción de 4.9/5.0 en encuestas trimestrales",
      },
      {
        id: generateId(),
        company: "Clínica Dental Sonrisa",
        title: "Auxiliar de Recepción",
        location: "Valencia, España",
        startDate: "2016-06",
        endDate: "2018-07",
        current: false,
        description:
          "Gestionó citas y agenda de 4 dentistas con más de 80 pacientes semanales\nCoordinó cobros, facturación y gestión de seguros médicos\nMantuvo expedientes de pacientes organizados y actualizados",
      },
    ],
    education: [
      {
        id: generateId(),
        school: "IES Lluís Vives",
        degree: "FP Medio",
        field: "Gestión Administrativa",
        startDate: "2014-09",
        endDate: "2016-06",
        highlights: "",
      },
      {
        id: generateId(),
        school: "Escuela Oficial de Idiomas",
        degree: "Certificado B2",
        field: "Inglés",
        startDate: "2016-09",
        endDate: "2017-06",
        highlights: "",
      },
    ],
    certifications: [
      {
        id: generateId(),
        name: "Contador Público Certificado (CPA)",
        issuer: "American Institute of CPAs",
        year: "2008",
        credentialId: "",
        credentialUrl: "",
      },
    ],
    skillGroups: [
      {
        id: generateId(),
        category: "Administración",
        skills: ["Atención al Cliente", "Gestión de Agenda", "Office 365", "Telefonía"],
      },
      {
        id: generateId(),
        category: "Idiomas",
        skills: ["Español", "Inglés", "Italiano", "Francés"],
      },
    ],
    projects: [
      {
        id: generateId(),
        name: "Proyecto de Digitalización",
        description:
          "Lideró la transición de sistemas de archivo en papel a digital en 3 departamentos, formando a más de 25 empleados.",
        technologies: ["Google Workspace", "DocuSign", "Notion"],
        startDate: "2023-02",
        endDate: "2023-06",
      },
    ],
  },
};

const IT_SAMPLE_DATA: Record<string, PartialSampleData> = {
  modern: {
    fullName: "Marco Bianchi",
    headline: "Ingegnere Software Senior",
    summary:
      "Ingegnere full-stack con oltre 6 anni di esperienza nella creazione di applicazioni web scalabili. Appassionato di developer experience, performance e architettura pulita.",
    contact: {
      email: "marco.bianchi@email.com",
      phone: "+39 02 1234 5678",
      location: "Milano, Italia",
      linkedin: "linkedin.com/in/marcobianchi",
      website: "marcobianchi.dev",
    },
    experience: [
      {
        id: generateId(),
        company: "Bending Spoons",
        title: "Ingegnere Software Senior",
        location: "Milano, Italia",
        startDate: "2021-03",
        endDate: null,
        current: true,
        description:
          "Guidato la migrazione del dashboard pagamenti a React 18, migliorando i tempi di caricamento del 40%\nProgettato e rilasciato il monitoraggio webhook in tempo reale utilizzato da oltre 50 mila merchant\nMentorato 4 ingegneri junior attraverso code review strutturate e sessioni di pair programming",
      },
      {
        id: generateId(),
        company: "Satispay",
        title: "Ingegnere Software",
        location: "Milano, Italia",
        startDate: "2018-06",
        endDate: "2021-02",
        current: false,
        description:
          "Costruito ottimizzazioni del pipeline di deploy riducendo i tempi di build del 30%\nContribuito a strumenti open-source usati da oltre 500 mila sviluppatori\nImplementato strategia di caching che ha ridotto la latenza API del 60%",
      },
      {
        id: generateId(),
        company: "Accenture Italia",
        title: "Sviluppatore Junior",
        location: "Roma, Italia",
        startDate: "2017-05",
        endDate: "2018-05",
        current: false,
        description:
          "Sviluppato strumenti interni per pipeline CI/CD usando Python e Bash\nCostruito API RESTful che servono oltre 10 mila richieste giornaliere con Node.js ed Express\nPartecipato alla rotazione di reperibilità e risolto incidenti in produzione nei tempi SLA",
      },
    ],
    education: [
      {
        id: generateId(),
        school: "Politecnico di Milano",
        degree: "Laurea Magistrale",
        field: "Informatica",
        startDate: "2014-09",
        endDate: "2018-07",
        gpa: "110/110",
        highlights: "Lode, Assistente al corso di Algoritmi e Strutture Dati",
      },
    ],
    certifications: [
      {
        id: generateId(),
        name: "AWS Solutions Architect Associate",
        issuer: "AWS",
        year: "2020",
        credentialId: "",
        credentialUrl: "",
      },
    ],
    skillGroups: [
      { id: generateId(), category: "Linguaggi", skills: ["TypeScript", "Python", "Go", "SQL"] },
      {
        id: generateId(),
        category: "Framework",
        skills: ["React", "Next.js", "Node.js", "FastAPI"],
      },
      {
        id: generateId(),
        category: "Strumenti",
        skills: ["PostgreSQL", "Redis", "Docker", "AWS", "GitHub Actions"],
      },
    ],
    projects: [
      {
        id: generateId(),
        name: "Strumento CLI Open-Source",
        description:
          "Costruita una CLI per lo scaffolding di progetti Next.js con CI/CD, linting e test preconfigurati. Oltre 1,2K stelle su GitHub.",
        url: "github.com/marcobianchi/create-next-stack",
        technologies: ["TypeScript", "Node.js", "GitHub Actions"],
        startDate: "2022-01",
        endDate: "2022-06",
      },
    ],
  },
  classic: {
    fullName: "Giulia Rossi",
    headline: "Analista Aziendale",
    summary:
      "Analista orientata ai dati con 5 anni di esperienza nella traduzione di dataset complessi in strategie operative. Esperta nella gestione degli stakeholder e nella collaborazione interfunzionale.",
    contact: {
      email: "giulia.rossi@email.com",
      phone: "+39 06 8765 4321",
      location: "Roma, Italia",
      linkedin: "linkedin.com/in/giuliarossi",
      website: "",
    },
    experience: [
      {
        id: generateId(),
        company: "UniCredit",
        title: "Analista Aziendale Senior",
        location: "Milano, Italia",
        startDate: "2020-09",
        endDate: null,
        current: true,
        description:
          "Sviluppato modelli finanziari che hanno informato decisioni di investimento per oltre 2 miliardi di euro\nGuidato la raccolta requisiti per una nuova piattaforma di reporting clienti per oltre 200 consulenti\nRidotto il tempo del ciclo di reporting trimestrale del 35% attraverso l'automazione dei processi",
      },
      {
        id: generateId(),
        company: "Deloitte Italia",
        title: "Analista Junior",
        location: "Roma, Italia",
        startDate: "2018-07",
        endDate: "2020-08",
        current: false,
        description:
          "Condotto analisi di mercato per clienti Fortune 500 in 3 settori\nCreato dashboard in Tableau adottate da oltre 15 team di consulenza\nSupportato la due diligence su transazioni M&A per un totale di 500 milioni di euro",
      },
      {
        id: generateId(),
        company: "Accenture",
        title: "Stagista Analista",
        location: "Milano, Italia",
        startDate: "2017-06",
        endDate: "2018-06",
        current: false,
        description:
          "Assistito consulenti senior nella raccolta e analisi dati per clienti del settore retail\nCostruito modelli finanziari in Excel per previsioni di ricavi trimestrali\nPresentato risultati agli stakeholder dei clienti durante riunioni settimanali",
      },
    ],
    education: [
      {
        id: generateId(),
        school: "Università Bocconi",
        degree: "Laurea Magistrale",
        field: "Finanza e Data Science",
        startDate: "2014-09",
        endDate: "2018-07",
        gpa: "110/110",
        highlights: "Lode, Presidente del Club di Finanza",
      },
    ],
    certifications: [
      {
        id: generateId(),
        name: "CFA Livello I",
        issuer: "CFA Institute",
        year: "2019",
        credentialId: "",
        credentialUrl: "",
      },
    ],
    skillGroups: [
      {
        id: generateId(),
        category: "Analisi",
        skills: ["Modellazione Finanziaria", "SQL", "Python", "Excel"],
      },
      {
        id: generateId(),
        category: "Strumenti",
        skills: ["Tableau", "Power BI", "Jira", "Confluence"],
      },
    ],
    projects: [
      {
        id: generateId(),
        name: "Modello di Previsione Churn",
        description:
          "Sviluppato un modello di analisi predittiva che ha identificato clienti a rischio con l'87% di accuratezza, consentendo strategie proattive che hanno ridotto il churn del 15%.",
        technologies: ["Python", "Tableau", "SQL"],
        startDate: "2022-03",
        endDate: "2022-09",
      },
    ],
  },
  minimal: {
    fullName: "Andrea Conti",
    headline: "Product Designer",
    summary:
      "Product designer con oltre 4 anni di esperienza nella creazione di esperienze digitali intuitive. Focalizzato su design system, accessibilità e ricerca utente.",
    contact: {
      email: "andrea@designstudio.it",
      phone: "",
      location: "Firenze, Italia",
      linkedin: "linkedin.com/in/andreaconti",
      website: "andreaconti.design",
    },
    experience: [
      {
        id: generateId(),
        company: "Figma",
        title: "Product Designer",
        location: "Remoto",
        startDate: "2022-01",
        endDate: null,
        current: true,
        description:
          "Progettato una libreria di componenti utilizzata da 8 team di prodotto\nGuidato il redesign delle funzionalità di collaborazione aumentando l'uso attivo giornaliero del 25%\nDefinito linee guida sull'accessibilità adottate a livello aziendale",
      },
      {
        id: generateId(),
        company: "Spotify",
        title: "Designer UI/UX",
        location: "Milano, Italia",
        startDate: "2019-06",
        endDate: "2021-12",
        current: false,
        description:
          "Ridisegnato il flusso di creazione playlist riducendo il tasso di abbandono del 18%\nCondotto oltre 40 sessioni di ricerca utente per validare le decisioni di design\nCostruito e mantenuto la documentazione del design system interno",
      },
      {
        id: generateId(),
        company: "Studio Creativo",
        title: "Designer Junior",
        location: "Firenze, Italia",
        startDate: "2018-06",
        endDate: "2019-05",
        current: false,
        description:
          "Creato asset visivi e mockup UI per oltre 10 progetti cliente\nAssistito il lead designer nella creazione di kit di brand identity per startup\nProgettato landing page responsive che hanno aumentato le conversioni dei clienti del 12%",
      },
    ],
    education: [
      {
        id: generateId(),
        school: "ISIA Firenze",
        degree: "Laurea",
        field: "Design della Comunicazione",
        startDate: "2015-09",
        endDate: "2019-07",
        highlights: "Lista del Rettore",
      },
    ],
    certifications: [
      {
        id: generateId(),
        name: "UX Design Professional Certificate",
        issuer: "Google",
        year: "2020",
        credentialId: "",
        credentialUrl: "",
      },
    ],
    skillGroups: [
      {
        id: generateId(),
        category: "Design",
        skills: ["Figma", "Sketch", "Adobe CC", "Prototipazione"],
      },
      {
        id: generateId(),
        category: "Sviluppo",
        skills: ["HTML/CSS", "React", "Tailwind CSS", "Storybook"],
      },
    ],
    projects: [
      {
        id: generateId(),
        name: "DesignTokens.io",
        description:
          "Strumento open-source per generare e sincronizzare design token tra Figma e codice. Oltre 2K stelle su GitHub.",
        url: "github.com/andreaconti/designtokens",
        technologies: ["React", "TypeScript", "Figma Plugin API"],
        startDate: "2023-03",
        endDate: null,
      },
    ],
  },
  executive: {
    fullName: "Francesca Moretti",
    headline: "Responsabile Risorse Umane",
    summary:
      "Specialista HR con vasta esperienza nella gestione completa di reclutamento e talent management. Capace di bilanciare pianificazione strategica e realizzazione operativa per una gamma diversificata di clienti.",
    contact: {
      email: "francesca@email.com",
      phone: "+39 02 9876 5432",
      location: "Milano, Italia",
      linkedin: "linkedin.com/in/francescamoretti",
      website: "",
    },
    experience: [
      {
        id: generateId(),
        company: "Luxottica",
        title: "Responsabile Reclutamento",
        location: "Milano, Italia",
        startDate: "2013-07",
        endDate: null,
        current: true,
        description:
          "Responsabile del ciclo completo di reclutamento per dipendenti in 8 sedi\nPartecipato a riunioni di avanzamento con clienti chiave, monitorando performance e risultati\nRidotto il costo per assunzione del 22% attraverso iniziative di sourcing strategico",
      },
      {
        id: generateId(),
        company: "Adecco Italia",
        title: "Consulente e Formatrice",
        location: "Roma, Italia",
        startDate: "2010-01",
        endDate: "2013-07",
        current: false,
        description:
          "Supervisionato progetti di reclutamento online soddisfacendo obiettivi strategici\nGestito portafogli clienti, conducendo analisi aziendali e costruendo relazioni\nFormato oltre 50 recruiter junior su best practice e conformità",
      },
      {
        id: generateId(),
        company: "Randstad Italia",
        title: "Coordinatrice HR",
        location: "Torino, Italia",
        startDate: "2008-08",
        endDate: "2009-12",
        current: false,
        description:
          "Coordinato i processi di onboarding per oltre 100 nuovi assunti all'anno\nMantenuto i registri dei dipendenti e garantito la conformità con le normative del lavoro\nAssistito nell'organizzazione di career day e eventi di recruiting universitario",
      },
    ],
    education: [
      {
        id: generateId(),
        school: "Università Cattolica del Sacro Cuore",
        degree: "Laurea Magistrale",
        field: "Gestione Strategica delle Risorse Umane",
        startDate: "2005-09",
        endDate: "2008-07",
        highlights: "Laureata con lode",
      },
    ],
    certifications: [
      {
        id: generateId(),
        name: "SHRM Certified Professional (SHRM-CP)",
        issuer: "SHRM",
        year: "2011",
        credentialId: "",
        credentialUrl: "",
      },
    ],
    skillGroups: [
      {
        id: generateId(),
        category: "HR",
        skills: ["Reclutamento", "Gestione HR", "Relazioni con i Dipendenti", "Talent Acquisition"],
      },
      {
        id: generateId(),
        category: "Lingue",
        skills: ["Italiano", "Inglese", "Francese", "Spagnolo"],
      },
    ],
    projects: [
      {
        id: generateId(),
        name: "Iniziativa Employer Branding",
        description:
          "Guidato un progetto aziendale di employer branding che ha rinnovato le pagine carriera e la presenza social, aumentando le candidature qualificate del 40% in 6 mesi.",
        technologies: ["LinkedIn Recruiter", "Greenhouse", "Canva"],
        startDate: "2023-01",
        endDate: "2023-07",
      },
    ],
  },
  bold: {
    fullName: "Luca Ferrara",
    headline: "Analista Finanziario",
    summary:
      "Analista finanziario esperto con un solido background nella gestione di budget multimilionari, fornendo analisi e supporto contabile nei dipartimenti di sviluppo prodotto.",
    contact: {
      email: "luca.ferrara@email.com",
      phone: "+39 06 4321 8765",
      location: "Roma, Italia",
      linkedin: "linkedin.com/in/lucaferrara",
      website: "",
    },
    experience: [
      {
        id: generateId(),
        company: "Enel",
        title: "Analista Finanziario",
        location: "Roma, Italia",
        startDate: "2012-01",
        endDate: null,
        current: true,
        description:
          "Creato budget e garantito la riduzione dei costi di manodopera e materiali del 15%\nGenerato report finanziari inclusi flussi di cassa e bilanci\nCreato analisi e report di performance per i team dirigenziali",
      },
      {
        id: generateId(),
        company: "Intesa Sanpaolo",
        title: "Analista Finanziario",
        location: "Torino, Italia",
        startDate: "2008-02",
        endDate: "2012-12",
        current: false,
        description:
          "Fornito report, analisi ad-hoc, budget operativi annuali e previsioni di ricavo\nAnalizzato contratti con fornitori e consigliato nelle negoziazioni riducendo i budget del 6%\nCreato report settimanali sulle finanze del personale e presentato i risultati alla direzione",
      },
      {
        id: generateId(),
        company: "PricewaterhouseCoopers",
        title: "Analista Finanziario Junior",
        location: "Milano, Italia",
        startDate: "2006-11",
        endDate: "2008-01",
        current: false,
        description:
          "Assistito analisti senior nella preparazione di report finanziari trimestrali e analisi delle varianze\nRiconciliato conti e mantenuto registri accurati per la preparazione all'audit\nSupportato il processo di budgeting per 3 clienti aziendali di medie dimensioni",
      },
    ],
    education: [
      {
        id: generateId(),
        school: "Università di Roma La Sapienza",
        degree: "Laurea Magistrale",
        field: "Ingegneria Informatica",
        startDate: "2004-09",
        endDate: "2006-10",
        highlights: "Laureato con lode",
      },
      {
        id: generateId(),
        school: "Università di Roma La Sapienza",
        degree: "Laurea Triennale",
        field: "Ingegneria Informatica",
        startDate: "2000-09",
        endDate: "2004-07",
        highlights: "110/110 con lode",
      },
    ],
    certifications: [
      {
        id: generateId(),
        name: "Certified Public Accountant (CPA)",
        issuer: "American Institute of CPAs",
        year: "2008",
        credentialId: "",
        credentialUrl: "",
      },
    ],
    skillGroups: [
      {
        id: generateId(),
        category: "Tecnico",
        skills: [
          "Strategie di Soluzione",
          "Pensiero Analitico",
          "Valutazione di Mercato",
          "Analisi dei Trend",
        ],
      },
      {
        id: generateId(),
        category: "Competenze Trasversali",
        skills: ["Leadership", "Collaborazione", "Vendita Orientata al Cliente", "Networking"],
      },
    ],
    projects: [
      {
        id: generateId(),
        name: "Dashboard Previsioni Trimestrali",
        description:
          "Costruita una dashboard automatizzata di previsioni finanziarie in Power BI che ha consolidato dati da 5 dipartimenti, riducendo il tempo di generazione report da 3 giorni a 2 ore.",
        technologies: ["Power BI", "Excel VBA", "SQL Server"],
        startDate: "2023-06",
        endDate: "2023-12",
      },
    ],
  },
  balanced: {
    fullName: "Giuseppe Marino",
    headline: "Falegname",
    summary:
      "Falegname esperto e appassionato con oltre 10 anni di esperienza nell'edilizia residenziale e commerciale. Reputazione positiva per lavori di qualità, costruzione puntuale e completamento dei progetti nel budget previsto.",
    contact: {
      email: "giuseppe.marino@email.com",
      phone: "+39 055 1234 567",
      location: "Firenze, Italia",
      linkedin: "linkedin.com/in/giuseppemarino",
      website: "",
    },
    experience: [
      {
        id: generateId(),
        company: "Falegnameria Toscana S.r.l.",
        title: "Falegname",
        location: "Firenze, Italia",
        startDate: "2011-03",
        endDate: null,
        current: true,
        description:
          "Fornito ai clienti un servizio eccellente collaborando per realizzare le esigenze costruttive\nRistrutturato 20 cucine, installando mobili su misura e impianti idraulici di alta gamma\nCostruito 10 terrazze e camminamenti esterni garantendo la conformità alle normative",
      },
      {
        id: generateId(),
        company: "Artigiani Fiorentini",
        title: "Falegname",
        location: "Firenze, Italia",
        startDate: "2007-02",
        endDate: "2011-02",
        current: false,
        description:
          "Lavorato direttamente con i clienti per valutare esigenze e desideri prima di iniziare la costruzione\nCreato planimetrie dettagliate e budget finanziari per ogni progetto\nSpecializzato nella costruzione di strutture portanti",
      },
      {
        id: generateId(),
        company: "Costruzioni Pratesi",
        title: "Apprendista Falegname",
        location: "Prato, Italia",
        startDate: "2005-06",
        endDate: "2007-01",
        current: false,
        description:
          "Assistito falegnami esperti nella carpenteria, coperture e finiture su progetti residenziali\nAppreso l'uso sicuro di utensili elettrici, seghe e chiodatrici\nContribuito a mantenere cantieri organizzati e puliti nel rispetto delle normative di sicurezza",
      },
    ],
    education: [
      {
        id: generateId(),
        school: "Istituto Professionale per l'Artigianato",
        degree: "Diploma Professionale",
        field: "Falegnameria",
        startDate: "2003-09",
        endDate: "2005-07",
        highlights: "",
      },
    ],
    certifications: [
      {
        id: generateId(),
        name: "Sicurezza sul Lavoro nei Cantieri",
        issuer: "Ente Formazione Sicurezza",
        year: "2008",
        credentialId: "",
        credentialUrl: "",
      },
    ],
    skillGroups: [
      {
        id: generateId(),
        category: "Tecnico",
        skills: [
          "Abilità Meccaniche",
          "Pensiero Critico",
          "Coordinazione Occhio-Mano",
          "Utensili Elettrici",
        ],
      },
      {
        id: generateId(),
        category: "Gestione",
        skills: ["Gestione del Tempo", "Supervisione", "Controllo Qualità"],
      },
    ],
    projects: [
      {
        id: generateId(),
        name: "Ristrutturazione Cucina Su Misura",
        description:
          "Progettato e realizzato una ristrutturazione completa della cucina con mobili su misura, pavimenti in legno e modifiche strutturali. Completato nei tempi e con il 10% di risparmio sul budget.",
        technologies: ["AutoCAD", "Falegnameria", "Preventivazione"],
        startDate: "2023-03",
        endDate: "2023-08",
      },
    ],
  },
  clear: {
    fullName: "Elena Giordano",
    headline: "Receptionist",
    summary:
      "Receptionist esperta e laboriosa con diversi anni di esperienza in ambienti con elevato volume di clienti. Esperienza nella creazione di programmi, gestione appuntamenti e servizio clienti ottimale.",
    contact: {
      email: "elena.g@email.com",
      phone: "+39 02 5678 1234",
      location: "Milano, Italia",
      linkedin: "linkedin.com/in/elenagiordano",
      website: "",
    },
    experience: [
      {
        id: generateId(),
        company: "Hotel Excelsior",
        title: "Receptionist Front Desk",
        location: "Milano, Italia",
        startDate: "2014-10",
        endDate: null,
        current: true,
        description:
          "Accolto ospiti e gestito procedure di check-in/check-out per una struttura con oltre 200 camere\nGestito telefonate, distribuzione posta e pianificazione appuntamenti\nCoordinato con housekeeping e manutenzione per garantire la soddisfazione degli ospiti",
      },
      {
        id: generateId(),
        company: "Centro Benessere Stella",
        title: "Receptionist",
        location: "Roma, Italia",
        startDate: "2010-06",
        endDate: "2014-10",
        current: false,
        description:
          "Risposto a telefonate, accolto clienti e gestito tutte le responsabilità del front desk\nGestito ordini, posta e alcune responsabilità contabili\nFornito ai clienti informazioni su servizi, tecnologia e prodotti offerti",
      },
      {
        id: generateId(),
        company: "Poliambulatorio San Marco",
        title: "Impiegata Front Desk",
        location: "Roma, Italia",
        startDate: "2008-09",
        endDate: "2010-05",
        current: false,
        description:
          "Gestito le procedure di accettazione e dimissione pazienti per un ambulatorio molto frequentato\nPianificato appuntamenti e mantenuto registri pazienti accurati nel sistema informatico\nElaborato verifiche assicurative e copagamenti per oltre 80 pazienti al giorno",
      },
    ],
    education: [
      {
        id: generateId(),
        school: "Istituto Tecnico Commerciale",
        degree: "Diploma",
        field: "Comunicazione",
        startDate: "2006-09",
        endDate: "2008-07",
        highlights: "",
      },
    ],
    certifications: [
      {
        id: generateId(),
        name: "Professionista Amministrativo Certificato",
        issuer: "Associazione Italiana Professionisti Amministrativi",
        year: "2012",
        credentialId: "",
        credentialUrl: "",
      },
    ],
    skillGroups: [
      {
        id: generateId(),
        category: "Competenze",
        skills: [
          "Comunicazione",
          "Multitasking",
          "Pianificazione",
          "Tecnologia d'Ufficio",
          "Contabilità",
        ],
      },
      {
        id: generateId(),
        category: "Lingue",
        skills: ["Italiano", "Inglese", "Francese", "Spagnolo"],
      },
    ],
    projects: [
      {
        id: generateId(),
        name: "Progetto di Digitalizzazione Ufficio",
        description:
          "Guidato la transizione da sistemi di archiviazione cartacei a digitali in 3 dipartimenti, formando oltre 25 dipendenti e riducendo il tempo di ricerca documenti del 70%.",
        technologies: ["Google Workspace", "DocuSign", "Notion"],
        startDate: "2023-02",
        endDate: "2023-06",
      },
    ],
  },
};

const ZH_SAMPLE_DATA: Record<string, PartialSampleData> = {
  modern: {
    fullName: "王小明",
    headline: "高级软件工程师",
    summary: "拥有6年以上构建可扩展Web应用经验的全栈工程师。专注于开发者体验、性能优化和整洁架构。",
    contact: {
      email: "wang.xiaoming@email.com",
      phone: "+86 138 1234 5678",
      location: "北京, 中国",
      linkedin: "linkedin.com/in/wangxiaoming",
      website: "wangxiaoming.dev",
    },
    experience: [
      {
        id: generateId(),
        company: "字节跳动",
        title: "高级软件工程师",
        location: "北京, 中国",
        startDate: "2021-03",
        endDate: null,
        current: true,
        description:
          "主导支付仪表盘迁移至React 18，加载时间提升40%\n设计并交付被5万+商户使用的实时Webhook监控系统\n通过结构化代码评审和结对编程指导4名初级工程师",
      },
      {
        id: generateId(),
        company: "阿里巴巴",
        title: "软件工程师",
        location: "杭州, 中国",
        startDate: "2018-06",
        endDate: "2021-02",
        current: false,
        description:
          "构建部署流水线优化，将构建时间缩短30%\n贡献了被50万+开发者使用的开源工具\n实施边缘缓存策略，将API延迟降低60%",
      },
      {
        id: generateId(),
        company: "美团",
        title: "初级软件工程师",
        location: "北京, 中国",
        startDate: "2017-05",
        endDate: "2018-05",
        current: false,
        description:
          "使用Python和Bash开发CI/CD流水线内部工具\n使用Node.js和Express构建服务1万+日请求的RESTful API\n参与值班轮岗并在SLA时间内解决生产事故",
      },
    ],
    education: [
      {
        id: generateId(),
        school: "北京大学",
        degree: "学士",
        field: "计算机科学",
        startDate: "2014-09",
        endDate: "2018-07",
        gpa: "3.9",
        highlights: "院长奖学金，数据结构课程助教",
      },
    ],
    certifications: [
      {
        id: generateId(),
        name: "AWS Solutions Architect Associate",
        issuer: "AWS",
        year: "2020",
        credentialId: "",
        credentialUrl: "",
      },
    ],
    skillGroups: [
      { id: generateId(), category: "编程语言", skills: ["TypeScript", "Python", "Go", "SQL"] },
      { id: generateId(), category: "框架", skills: ["React", "Next.js", "Node.js", "FastAPI"] },
      {
        id: generateId(),
        category: "工具",
        skills: ["PostgreSQL", "Redis", "Docker", "AWS", "GitHub Actions"],
      },
    ],
    projects: [
      {
        id: generateId(),
        name: "开源CLI工具",
        description:
          "构建了一个用于搭建Next.js项目的开发者CLI工具，预配置CI/CD、代码检查和测试。GitHub 1.2K+ 星标。",
        url: "github.com/wangxiaoming/create-next-stack",
        technologies: ["TypeScript", "Node.js", "GitHub Actions"],
        startDate: "2022-01",
        endDate: "2022-06",
      },
    ],
  },
  classic: {
    fullName: "李芳",
    headline: "商业分析师",
    summary:
      "数据驱动的商业分析师，拥有5年将复杂数据集转化为可执行策略的经验。擅长利益相关者管理和跨部门协作。",
    contact: {
      email: "li.fang@email.com",
      phone: "+86 139 8765 4321",
      location: "上海, 中国",
      linkedin: "linkedin.com/in/lifang",
      website: "",
    },
    experience: [
      {
        id: generateId(),
        company: "中金公司",
        title: "高级商业分析师",
        location: "上海, 中国",
        startDate: "2020-09",
        endDate: null,
        current: true,
        description:
          "开发支持20亿+元投资决策的财务模型\n主导新客户报告平台的需求收集，服务200+顾问\n通过流程自动化将季度报告周期缩短35%",
      },
      {
        id: generateId(),
        company: "德勤中国",
        title: "初级分析师",
        location: "上海, 中国",
        startDate: "2018-07",
        endDate: "2020-08",
        current: false,
        description:
          "为3个行业的世界500强客户进行市场分析\n创建被15+咨询团队采用的Tableau数据看板\n支持总额5亿元的并购交易尽职调查",
      },
      {
        id: generateId(),
        company: "埃森哲",
        title: "分析师实习生",
        location: "北京, 中国",
        startDate: "2017-06",
        endDate: "2018-06",
        current: false,
        description:
          "协助高级顾问为零售行业客户进行数据收集和分析\n在Excel中构建财务模型预测季度收入趋势\n在每周状态会议中向客户利益相关者汇报研究成果",
      },
    ],
    education: [
      {
        id: generateId(),
        school: "复旦大学",
        degree: "学士",
        field: "金融与数据科学",
        startDate: "2014-09",
        endDate: "2018-07",
        gpa: "3.8",
        highlights: "优秀毕业生，金融社团社长",
      },
    ],
    certifications: [
      {
        id: generateId(),
        name: "CFA一级",
        issuer: "CFA协会",
        year: "2019",
        credentialId: "",
        credentialUrl: "",
      },
    ],
    skillGroups: [
      { id: generateId(), category: "分析", skills: ["财务建模", "SQL", "Python", "Excel"] },
      { id: generateId(), category: "工具", skills: ["Tableau", "Power BI", "Jira", "Confluence"] },
    ],
    projects: [
      {
        id: generateId(),
        name: "客户流失预测模型",
        description:
          "开发了一个预测分析模型，以87%的准确率识别高风险客户，实施主动留存策略后客户流失率降低15%。",
        technologies: ["Python", "Tableau", "SQL"],
        startDate: "2022-03",
        endDate: "2022-09",
      },
    ],
  },
  minimal: {
    fullName: "陈悦",
    headline: "产品设计师",
    summary:
      "拥有4年以上经验的产品设计师，专注于打造直觉式数字体验。聚焦设计系统、无障碍设计和用户研究。",
    contact: {
      email: "chen.yue@designstudio.cn",
      phone: "",
      location: "深圳, 中国",
      linkedin: "linkedin.com/in/chenyue",
      website: "chenyue.design",
    },
    experience: [
      {
        id: generateId(),
        company: "Figma",
        title: "产品设计师",
        location: "远程",
        startDate: "2022-01",
        endDate: null,
        current: true,
        description:
          "设计了被8个产品团队使用的组件库\n主导协作功能的重新设计，日活跃使用量增加25%\n建立了全公司采用的无障碍设计指南",
      },
      {
        id: generateId(),
        company: "腾讯",
        title: "UI/UX设计师",
        location: "深圳, 中国",
        startDate: "2019-06",
        endDate: "2021-12",
        current: false,
        description:
          "重新设计播放列表创建流程，减少跳出率18%\n进行40+次用户研究以验证设计决策\n构建并维护内部设计系统文档",
      },
      {
        id: generateId(),
        company: "设计工坊",
        title: "初级设计师",
        location: "深圳, 中国",
        startDate: "2018-06",
        endDate: "2019-05",
        current: false,
        description:
          "为10+个客户项目创建视觉素材和UI原型\n协助首席设计师为初创公司构建品牌识别系统\n设计响应式落地页，客户转化率提升12%",
      },
    ],
    education: [
      {
        id: generateId(),
        school: "清华大学美术学院",
        degree: "学士",
        field: "视觉传达设计",
        startDate: "2015-09",
        endDate: "2019-07",
        highlights: "优秀毕业设计",
      },
    ],
    certifications: [
      {
        id: generateId(),
        name: "UX设计专业证书",
        issuer: "Google",
        year: "2020",
        credentialId: "",
        credentialUrl: "",
      },
    ],
    skillGroups: [
      { id: generateId(), category: "设计", skills: ["Figma", "Sketch", "Adobe CC", "原型设计"] },
      {
        id: generateId(),
        category: "开发",
        skills: ["HTML/CSS", "React", "Tailwind CSS", "Storybook"],
      },
    ],
    projects: [
      {
        id: generateId(),
        name: "DesignTokens.io",
        description: "用于在Figma和代码之间生成和同步设计令牌的开源工具。GitHub 2K+ 星标。",
        url: "github.com/chenyue/designtokens",
        technologies: ["React", "TypeScript", "Figma Plugin API"],
        startDate: "2023-03",
        endDate: null,
      },
    ],
  },
  executive: {
    fullName: "张丽华",
    headline: "招聘主管",
    summary:
      "自我驱动、以结果为导向的招聘与人力资源专家，在提供全方位HR、招聘和人才管理指导方面拥有丰富经验。",
    contact: {
      email: "zhang.lihua@email.com",
      phone: "+86 138 9876 5432",
      location: "上海, 中国",
      linkedin: "linkedin.com/in/zhanglihua",
      website: "",
    },
    experience: [
      {
        id: generateId(),
        company: "华为",
        title: "招聘主管",
        location: "深圳, 中国",
        startDate: "2013-07",
        endDate: null,
        current: true,
        description:
          "负责8个办公地点的全流程招聘管理\n参加与关键客户的进度会议，监控绩效和成果\n通过战略性人才寻访将招聘成本降低22%",
      },
      {
        id: generateId(),
        company: "猎聘网",
        title: "培训师与顾问",
        location: "上海, 中国",
        startDate: "2010-01",
        endDate: "2013-07",
        current: false,
        description:
          "监督在线招聘系统项目以达成战略目标\n管理客户档案，进行业务分析并建立关系\n为50+名初级招聘人员培训最佳实践和合规要求",
      },
      {
        id: generateId(),
        company: "任仕达中国",
        title: "人力资源协调员",
        location: "北京, 中国",
        startDate: "2008-08",
        endDate: "2009-12",
        current: false,
        description:
          "协调每年100+名新员工的入职流程\n维护员工档案并确保劳动法规合规\n协助组织招聘会和校园招聘活动",
      },
    ],
    education: [
      {
        id: generateId(),
        school: "中国人民大学",
        degree: "硕士",
        field: "人力资源战略管理",
        startDate: "2005-09",
        endDate: "2008-07",
        highlights: "优秀毕业论文",
      },
    ],
    certifications: [
      {
        id: generateId(),
        name: "SHRM认证专业人员 (SHRM-CP)",
        issuer: "SHRM",
        year: "2011",
        credentialId: "",
        credentialUrl: "",
      },
    ],
    skillGroups: [
      {
        id: generateId(),
        category: "人力资源",
        skills: ["招聘", "人力资源管理", "员工关系", "人才获取"],
      },
      { id: generateId(), category: "语言", skills: ["中文", "英文", "日文"] },
    ],
    projects: [
      {
        id: generateId(),
        name: "雇主品牌建设计划",
        description:
          "主导全公司雇主品牌项目，改版招聘页面和社交媒体形象，6个月内合格申请量增加40%。",
        technologies: ["LinkedIn Recruiter", "Greenhouse", "Canva"],
        startDate: "2023-01",
        endDate: "2023-07",
      },
    ],
  },
  bold: {
    fullName: "赵伟强",
    headline: "财务分析师",
    summary:
      "经验丰富的财务分析师，在管理数百万预算方面有出色背景，在产品开发部门提供分析和账户支持。",
    contact: {
      email: "zhao.weiqiang@email.com",
      phone: "+86 139 4321 8765",
      location: "北京, 中国",
      linkedin: "linkedin.com/in/zhaoweiqiang",
      website: "",
    },
    experience: [
      {
        id: generateId(),
        company: "中信证券",
        title: "财务分析师",
        location: "北京, 中国",
        startDate: "2012-01",
        endDate: null,
        current: true,
        description:
          "制定预算并确保人工和材料成本降低15%\n生成包括现金流图表和资产负债表在内的财务报表\n为管理团队创建分析和绩效报告",
      },
      {
        id: generateId(),
        company: "普华永道中国",
        title: "财务分析师",
        location: "上海, 中国",
        startDate: "2008-02",
        endDate: "2012-12",
        current: false,
        description:
          "提供报告、临时分析、年度运营计划预算和收入预测\n分析供应商合同并在谈判中提供建议，将预算降低6%\n创建每周劳动力财务报告并向管理层展示结果",
      },
      {
        id: generateId(),
        company: "毕马威中国",
        title: "初级财务分析师",
        location: "广州, 中国",
        startDate: "2006-11",
        endDate: "2008-01",
        current: false,
        description:
          "协助高级分析师准备季度财务报告和差异分析\n核对账目并维护准确记录以备审计\n为3家中型企业客户提供预算编制支持",
      },
    ],
    education: [
      {
        id: generateId(),
        school: "上海交通大学",
        degree: "硕士",
        field: "计算机工程",
        startDate: "2004-09",
        endDate: "2006-07",
        highlights: "优秀毕业生",
      },
      {
        id: generateId(),
        school: "上海交通大学",
        degree: "学士",
        field: "计算机工程",
        startDate: "2000-09",
        endDate: "2004-07",
        highlights: "优秀毕业生",
      },
    ],
    certifications: [
      {
        id: generateId(),
        name: "美国注册会计师 (CPA)",
        issuer: "美国注册会计师协会",
        year: "2008",
        credentialId: "",
        credentialUrl: "",
      },
    ],
    skillGroups: [
      {
        id: generateId(),
        category: "技术",
        skills: ["解决方案策略", "分析思维", "市场评估", "趋势分析"],
      },
      {
        id: generateId(),
        category: "软技能",
        skills: ["团队领导", "协作能力", "以客户为中心的销售", "人脉拓展"],
      },
    ],
    projects: [
      {
        id: generateId(),
        name: "季度预测仪表盘",
        description:
          "在Power BI中构建了自动化财务预测仪表盘，整合5个部门的数据，将报告生成时间从3天缩短至2小时。",
        technologies: ["Power BI", "Excel VBA", "SQL Server"],
        startDate: "2023-06",
        endDate: "2023-12",
      },
    ],
  },
  balanced: {
    fullName: "刘建国",
    headline: "木工师傅",
    summary:
      "技艺精湛、充满热情的木工师傅，拥有10年以上住宅和商业建筑经验。以高质量施工、准时交付和在预算内完成项目而享有良好声誉。",
    contact: {
      email: "liu.jianguo@email.com",
      phone: "+86 135 1234 5678",
      location: "苏州, 中国",
      linkedin: "linkedin.com/in/liujianguo",
      website: "",
    },
    experience: [
      {
        id: generateId(),
        company: "苏州精工木业有限公司",
        title: "高级木工师傅",
        location: "苏州, 中国",
        startDate: "2011-03",
        endDate: null,
        current: true,
        description:
          "为客户提供优质服务，协作完成各类施工需求\n翻新20间厨房，安装高端定制橱柜和管道设施\n建造10个户外露台和人行道，确保符合建筑规范",
      },
      {
        id: generateId(),
        company: "江南装饰工程",
        title: "木工师傅",
        location: "无锡, 中国",
        startDate: "2007-02",
        endDate: "2011-02",
        current: false,
        description:
          "与客户一对一沟通，在开工前评估需求和期望\n为每个项目制定详细的图纸和财务预算\n专精于承重结构的施工",
      },
      {
        id: generateId(),
        company: "建业建设有限公司",
        title: "学徒木工",
        location: "苏州, 中国",
        startDate: "2005-06",
        endDate: "2007-01",
        current: false,
        description:
          "协助熟练木工完成住宅项目的框架、屋顶和精装修工作\n学习安全操作电动工具、台锯和钉枪\n协助维护整洁有序的施工现场，符合安全标准",
      },
    ],
    education: [],
    certifications: [
      {
        id: generateId(),
        name: "木工技术",
        issuer: "苏州技师学院",
        year: "2005",
        credentialId: "",
        credentialUrl: "",
      },
      {
        id: generateId(),
        name: "建筑施工安全",
        issuer: "建筑安全培训中心",
        year: "2008",
        credentialId: "",
        credentialUrl: "",
      },
    ],
    skillGroups: [
      {
        id: generateId(),
        category: "技术",
        skills: ["机械技能", "批判性思维", "手眼协调", "电动工具"],
      },
      { id: generateId(), category: "管理", skills: ["时间管理", "监督", "质量控制"] },
    ],
    projects: [
      {
        id: generateId(),
        name: "定制厨房翻新",
        description:
          "设计并完成了整体厨房翻新，包括定制橱柜、实木地板和结构改造。按时完工，节省10%预算。",
        technologies: ["AutoCAD", "木工", "工程预算"],
        startDate: "2023-03",
        endDate: "2023-08",
      },
    ],
  },
  clear: {
    fullName: "孙美玲",
    headline: "前台接待",
    summary:
      "勤奋且经验丰富的前台接待，在高客流量环境中担任支持性和重要角色多年。擅长排班、预约管理和为客户提供最佳服务。",
    contact: {
      email: "sun.meiling@email.com",
      phone: "+86 136 5678 1234",
      location: "上海, 中国",
      linkedin: "linkedin.com/in/sunmeiling",
      website: "",
    },
    experience: [
      {
        id: generateId(),
        company: "豪华酒店集团",
        title: "前台接待",
        location: "上海, 中国",
        startDate: "2014-10",
        endDate: null,
        current: true,
        description:
          "接待宾客并管理200+间客房的入住/退房流程\n管理电话接听、邮件分发和预约安排\n与客房部和维护部门协调，确保宾客满意度",
      },
      {
        id: generateId(),
        company: "星光水疗中心",
        title: "接待员",
        location: "杭州, 中国",
        startDate: "2010-06",
        endDate: "2014-10",
        current: false,
        description:
          "接听电话、迎接客人并处理所有前台事务\n处理订单、邮件及部分财务工作\n为客户提供服务、技术和产品信息",
      },
      {
        id: generateId(),
        company: "西湖医疗中心",
        title: "前台文员",
        location: "杭州, 中国",
        startDate: "2008-09",
        endDate: "2010-05",
        current: false,
        description:
          "管理繁忙诊所的患者登记和结算流程\n排班预约并在电子病历系统中维护准确的患者记录\n每日为80+名患者办理医保验证和自付费用",
      },
    ],
    education: [
      {
        id: generateId(),
        school: "上海商学院",
        degree: "大专",
        field: "传播学",
        startDate: "2006-09",
        endDate: "2008-07",
        highlights: "",
      },
    ],
    certifications: [
      {
        id: generateId(),
        name: "行政管理专业认证",
        issuer: "中国行政管理协会",
        year: "2012",
        credentialId: "",
        credentialUrl: "",
      },
    ],
    skillGroups: [
      {
        id: generateId(),
        category: "技能",
        skills: ["沟通能力", "多任务处理", "排班管理", "办公技术", "记账"],
      },
      { id: generateId(), category: "语言", skills: ["中文", "英文", "日文"] },
    ],
    projects: [
      {
        id: generateId(),
        name: "办公室数字化项目",
        description:
          "主导3个部门从纸质到数字化归档系统的转型，培训25+名员工，文件检索时间减少70%。",
        technologies: ["Google Workspace", "DocuSign", "Notion"],
        startDate: "2023-02",
        endDate: "2023-06",
      },
    ],
  },
};

const JA_SAMPLE_DATA: Record<string, PartialSampleData> = {
  modern: {
    fullName: "田中太郎",
    headline: "シニアソフトウェアエンジニア",
    summary:
      "スケーラブルなWebアプリケーション構築に6年以上の経験を持つフルスタックエンジニア。開発者体験、パフォーマンス、クリーンアーキテクチャに情熱を注ぐ。",
    contact: {
      email: "tanaka.taro@email.com",
      phone: "+81 90-1234-5678",
      location: "東京都, 日本",
      linkedin: "linkedin.com/in/tanakataro",
      website: "tanakataro.dev",
    },
    experience: [
      {
        id: generateId(),
        company: "メルカリ",
        title: "シニアソフトウェアエンジニア",
        location: "東京都, 日本",
        startDate: "2021-03",
        endDate: null,
        current: true,
        description:
          "決済ダッシュボードのReact 18への移行をリードし、読み込み時間を40%改善\n5万以上の加盟店が利用するリアルタイムWebhookモニタリングを設計・リリース\n構造化されたコードレビューとペアプログラミングを通じて4名のジュニアエンジニアを指導",
      },
      {
        id: generateId(),
        company: "LINE",
        title: "ソフトウェアエンジニア",
        location: "東京都, 日本",
        startDate: "2018-06",
        endDate: "2021-02",
        current: false,
        description:
          "デプロイパイプラインの最適化を構築し、ビルド時間を30%短縮\n50万以上の開発者が利用するオープンソースツールに貢献\nエッジキャッシュ戦略を実装し、APIレイテンシーを60%削減",
      },
      {
        id: generateId(),
        company: "サイバーエージェント",
        title: "ジュニアソフトウェアエンジニア",
        location: "東京都, 日本",
        startDate: "2017-04",
        endDate: "2018-05",
        current: false,
        description:
          "PythonとBashを使用したCI/CDパイプラインの内部ツールを開発\n1日1万以上のリクエストを処理するRESTful APIをNode.jsとExpressで構築\nオンコールローテーションに参加し、SLA内で本番障害を解決",
      },
    ],
    education: [
      {
        id: generateId(),
        school: "東京大学",
        degree: "学士",
        field: "コンピュータサイエンス",
        startDate: "2013-04",
        endDate: "2017-03",
        gpa: "3.9",
        highlights: "学部長賞、データ構造ティーチングアシスタント",
      },
    ],
    certifications: [
      {
        id: generateId(),
        name: "AWS ソリューションアーキテクト アソシエイト",
        issuer: "AWS",
        year: "2020",
        credentialId: "",
        credentialUrl: "",
      },
    ],
    skillGroups: [
      { id: generateId(), category: "言語", skills: ["TypeScript", "Python", "Go", "SQL"] },
      {
        id: generateId(),
        category: "フレームワーク",
        skills: ["React", "Next.js", "Node.js", "FastAPI"],
      },
      {
        id: generateId(),
        category: "ツール",
        skills: ["PostgreSQL", "Redis", "Docker", "AWS", "GitHub Actions"],
      },
    ],
    projects: [
      {
        id: generateId(),
        name: "オープンソースCLIツール",
        description:
          "CI/CD、リンティング、テストが事前設定されたNext.jsプロジェクトのスキャフォールディング用CLIを構築。GitHub 1.2K以上のスター。",
        url: "github.com/tanakataro/create-next-stack",
        technologies: ["TypeScript", "Node.js", "GitHub Actions"],
        startDate: "2022-01",
        endDate: "2022-06",
      },
    ],
  },
  classic: {
    fullName: "鈴木花子",
    headline: "ビジネスアナリスト",
    summary:
      "データドリブンのビジネスアナリストとして5年の経験を持ち、複雑なデータセットを実行可能な戦略に変換。ステークホルダー管理と部門横断的な協力に長ける。",
    contact: {
      email: "suzuki.hanako@email.com",
      phone: "+81 80-8765-4321",
      location: "東京都, 日本",
      linkedin: "linkedin.com/in/suzukihanako",
      website: "",
    },
    experience: [
      {
        id: generateId(),
        company: "野村證券",
        title: "シニアビジネスアナリスト",
        location: "東京都, 日本",
        startDate: "2020-09",
        endDate: null,
        current: true,
        description:
          "2000億円以上の投資判断に関わる財務モデルを開発\n200名以上のアドバイザーが利用する新クライアントレポートプラットフォームの要件定義をリード\nプロセス自動化により四半期報告サイクルを35%短縮",
      },
      {
        id: generateId(),
        company: "デロイト トーマツ",
        title: "ジュニアアナリスト",
        location: "東京都, 日本",
        startDate: "2018-07",
        endDate: "2020-08",
        current: false,
        description:
          "3業界のFortune 500企業クライアントの市場分析を実施\n15以上のコンサルティングチームに採用されたTableauダッシュボードを作成\n合計500億円のM&A取引のデューデリジェンスを支援",
      },
      {
        id: generateId(),
        company: "アクセンチュア",
        title: "アナリストインターン",
        location: "大阪府, 日本",
        startDate: "2017-06",
        endDate: "2018-03",
        current: false,
        description:
          "小売業クライアントのデータ収集と分析でシニアコンサルタントを支援\nExcelで四半期収益トレンドを予測する財務モデルを構築\n週次ステータスミーティングでクライアントステークホルダーに調査結果を報告",
      },
    ],
    education: [
      {
        id: generateId(),
        school: "慶應義塾大学",
        degree: "学士",
        field: "ファイナンス＆データサイエンス",
        startDate: "2014-04",
        endDate: "2018-03",
        gpa: "3.8",
        highlights: "優等賞、金融研究会会長",
      },
    ],
    certifications: [
      {
        id: generateId(),
        name: "CFA レベルI",
        issuer: "CFA協会",
        year: "2019",
        credentialId: "",
        credentialUrl: "",
      },
    ],
    skillGroups: [
      { id: generateId(), category: "分析", skills: ["財務モデリング", "SQL", "Python", "Excel"] },
      {
        id: generateId(),
        category: "ツール",
        skills: ["Tableau", "Power BI", "Jira", "Confluence"],
      },
    ],
    projects: [
      {
        id: generateId(),
        name: "顧客離反予測モデル",
        description:
          "87%の精度でリスク顧客を特定する予測分析モデルを開発。プロアクティブなリテンション戦略により離反率を15%削減。",
        technologies: ["Python", "Tableau", "SQL"],
        startDate: "2022-03",
        endDate: "2022-09",
      },
    ],
  },
  minimal: {
    fullName: "佐藤美咲",
    headline: "プロダクトデザイナー",
    summary:
      "4年以上の経験を持つプロダクトデザイナー。直感的なデジタルエクスペリエンスの構築に注力。デザインシステム、アクセシビリティ、ユーザーリサーチに強み。",
    contact: {
      email: "sato.misaki@designstudio.jp",
      phone: "",
      location: "東京都, 日本",
      linkedin: "linkedin.com/in/satomisaki",
      website: "satomisaki.design",
    },
    experience: [
      {
        id: generateId(),
        company: "Figma",
        title: "プロダクトデザイナー",
        location: "リモート",
        startDate: "2022-01",
        endDate: null,
        current: true,
        description:
          "8つのプロダクトチームで使用されるコンポーネントライブラリを設計\nコラボレーション機能のリデザインをリードし、デイリーアクティブユーザーを25%増加\n全社で採用されたアクセシビリティガイドラインを策定",
      },
      {
        id: generateId(),
        company: "楽天",
        title: "UI/UXデザイナー",
        location: "東京都, 日本",
        startDate: "2019-06",
        endDate: "2021-12",
        current: false,
        description:
          "プレイリスト作成フローをリデザインし、離脱率を18%削減\n40回以上のユーザーリサーチセッションを実施しデザイン判断を検証\n社内デザインシステムのドキュメンテーションを構築・維持",
      },
      {
        id: generateId(),
        company: "クリエイティブスタジオ",
        title: "ジュニアデザイナー",
        location: "東京都, 日本",
        startDate: "2018-04",
        endDate: "2019-05",
        current: false,
        description:
          "10以上のクライアントプロジェクトのビジュアルアセットとUIモックアップを作成\nリードデザイナーのスタートアップ向けブランドアイデンティティキット構築を支援\nクライアントのコンバージョンを12%向上させたレスポンシブランディングページを設計",
      },
    ],
    education: [
      {
        id: generateId(),
        school: "武蔵野美術大学",
        degree: "学士",
        field: "グラフィックデザイン",
        startDate: "2015-04",
        endDate: "2019-03",
        highlights: "学長賞",
      },
    ],
    certifications: [
      {
        id: generateId(),
        name: "UXデザインプロフェッショナル証明書",
        issuer: "Google",
        year: "2020",
        credentialId: "",
        credentialUrl: "",
      },
    ],
    skillGroups: [
      {
        id: generateId(),
        category: "デザイン",
        skills: ["Figma", "Sketch", "Adobe CC", "プロトタイピング"],
      },
      {
        id: generateId(),
        category: "開発",
        skills: ["HTML/CSS", "React", "Tailwind CSS", "Storybook"],
      },
    ],
    projects: [
      {
        id: generateId(),
        name: "DesignTokens.io",
        description:
          "FigmaとコードのデザイントークンをFigmaとコード間で生成・同期するオープンソースツール。GitHub 2K以上のスター。",
        url: "github.com/satomisaki/designtokens",
        technologies: ["React", "TypeScript", "Figma Plugin API"],
        startDate: "2023-03",
        endDate: null,
      },
    ],
  },
  executive: {
    fullName: "渡辺直美",
    headline: "採用責任者",
    summary:
      "自律的で成果志向の採用・人事スペシャリスト。HR、採用、タレントマネジメントの全領域にわたる豊富な経験を持つ。",
    contact: {
      email: "watanabe@email.com",
      phone: "+81 90-9876-5432",
      location: "東京都, 日本",
      linkedin: "linkedin.com/in/watanabenaomi",
      website: "",
    },
    experience: [
      {
        id: generateId(),
        company: "リクルート",
        title: "採用責任者",
        location: "東京都, 日本",
        startDate: "2013-07",
        endDate: null,
        current: true,
        description:
          "8拠点にわたる従業員の採用ライフサイクル全体を担当\n主要クライアントとの進捗会議に参加し、パフォーマンスと成果を監視\n戦略的ソーシングにより採用コストを22%削減",
      },
      {
        id: generateId(),
        company: "パーソルキャリア",
        title: "トレーナー＆コンサルタント",
        location: "大阪府, 日本",
        startDate: "2010-01",
        endDate: "2013-07",
        current: false,
        description:
          "戦略目標を達成するオンライン採用システムプロジェクトを監督\nクライアントポートフォリオを管理し、ビジネス分析と関係構築を実施\n50名以上のジュニアリクルーターにベストプラクティスとコンプライアンスを研修",
      },
      {
        id: generateId(),
        company: "ランスタッド",
        title: "HRコーディネーター",
        location: "東京都, 日本",
        startDate: "2008-04",
        endDate: "2009-12",
        current: false,
        description:
          "年間100名以上の新入社員のオンボーディングプロセスを調整\n従業員記録を維持し、労働規制へのコンプライアンスを確保\nキャリアフェアとキャンパスリクルーティングイベントの開催を支援",
      },
    ],
    education: [
      {
        id: generateId(),
        school: "早稲田大学",
        degree: "修士",
        field: "人的資源戦略マネジメント",
        startDate: "2005-04",
        endDate: "2008-03",
        highlights: "優秀修了",
      },
    ],
    certifications: [
      {
        id: generateId(),
        name: "SHRM認定プロフェッショナル（SHRM-CP）",
        issuer: "SHRM",
        year: "2011",
        credentialId: "",
        credentialUrl: "",
      },
    ],
    skillGroups: [
      {
        id: generateId(),
        category: "人事",
        skills: ["採用", "人事管理", "従業員関係", "タレントアクイジション"],
      },
      { id: generateId(), category: "言語", skills: ["日本語", "英語", "中国語"] },
    ],
    projects: [
      {
        id: generateId(),
        name: "エンプロイヤーブランディング施策",
        description:
          "全社的なエンプロイヤーブランディングプロジェクトをリードし、キャリアページとSNSプレゼンスを刷新。6ヶ月で応募数を40%増加。",
        technologies: ["LinkedIn Recruiter", "Greenhouse", "Canva"],
        startDate: "2023-01",
        endDate: "2023-07",
      },
    ],
  },
  bold: {
    fullName: "高橋健一",
    headline: "ファイナンシャルアナリスト",
    summary:
      "数億円規模の予算管理の実績を持つ経験豊富なファイナンシャルアナリスト。製品開発部門での分析とアカウントサポートを提供。",
    contact: {
      email: "takahashi.kenichi@email.com",
      phone: "+81 90-4321-8765",
      location: "東京都, 日本",
      linkedin: "linkedin.com/in/takahashikenichi",
      website: "",
    },
    experience: [
      {
        id: generateId(),
        company: "三菱UFJ証券",
        title: "ファイナンシャルアナリスト",
        location: "東京都, 日本",
        startDate: "2012-01",
        endDate: null,
        current: true,
        description:
          "予算を策定し、人件費と材料費を15%削減\nキャッシュフロー表や貸借対照表を含む財務諸表を作成\n経営チーム向けの分析およびパフォーマンスレポートを作成",
      },
      {
        id: generateId(),
        company: "SMBC日興証券",
        title: "ファイナンシャルアナリスト",
        location: "大阪府, 日本",
        startDate: "2008-02",
        endDate: "2012-12",
        current: false,
        description:
          "レポート、アドホック分析、年間事業計画予算、収益予測を提供\nサプライヤー契約を分析し、交渉でアドバイスを行い予算を6%削減\n週次の人件費レポートを作成し、経営陣に結果を報告",
      },
      {
        id: generateId(),
        company: "PwCジャパン",
        title: "ジュニアファイナンシャルアナリスト",
        location: "東京都, 日本",
        startDate: "2006-11",
        endDate: "2008-01",
        current: false,
        description:
          "シニアアナリストの四半期財務レポートと差異分析の準備を支援\n勘定の照合と監査準備のための正確な記録を維持\n3社の中規模企業クライアントの予算策定プロセスをサポート",
      },
    ],
    education: [
      {
        id: generateId(),
        school: "東京工業大学",
        degree: "修士",
        field: "コンピュータ工学",
        startDate: "2004-04",
        endDate: "2006-03",
        highlights: "優秀修了",
      },
      {
        id: generateId(),
        school: "東京工業大学",
        degree: "学士",
        field: "コンピュータ工学",
        startDate: "2000-04",
        endDate: "2004-03",
        highlights: "優秀修了",
      },
    ],
    certifications: [
      {
        id: generateId(),
        name: "米国公認会計士 (CPA)",
        issuer: "American Institute of CPAs",
        year: "2008",
        credentialId: "",
        credentialUrl: "",
      },
    ],
    skillGroups: [
      {
        id: generateId(),
        category: "テクニカル",
        skills: ["ソリューション戦略", "分析的思考", "市場評価", "トレンド分析"],
      },
      {
        id: generateId(),
        category: "ソフトスキル",
        skills: [
          "チームリーダーシップ",
          "コラボレーション",
          "顧客志向セールス",
          "ネットワーキング",
        ],
      },
    ],
    projects: [
      {
        id: generateId(),
        name: "四半期予測ダッシュボード",
        description:
          "5部門のデータを統合した自動財務予測ダッシュボードをPower BIで構築。レポート生成時間を3日から2時間に短縮。",
        technologies: ["Power BI", "Excel VBA", "SQL Server"],
        startDate: "2023-06",
        endDate: "2023-12",
      },
    ],
  },
  balanced: {
    fullName: "山本大工",
    headline: "大工",
    summary:
      "住宅・商業建築で10年以上の経験を持つ熟練の大工。品質の高い仕事、納期厳守、予算内でのプロジェクト完了で高い評価を得ている。",
    contact: {
      email: "yamamoto.daiku@email.com",
      phone: "+81 90-1234-5678",
      location: "横浜市, 日本",
      linkedin: "linkedin.com/in/yamamotodaiku",
      website: "",
    },
    experience: [
      {
        id: generateId(),
        company: "横浜建築工房",
        title: "大工棟梁",
        location: "横浜市, 日本",
        startDate: "2011-03",
        endDate: null,
        current: true,
        description:
          "お客様に最高のサービスを提供し、建築ニーズの実現に協力\n20件のキッチンをリノベーションし、高級キャビネットと設備を設置\n10件の外構デッキと歩道を建設し、建築基準に適合",
      },
      {
        id: generateId(),
        company: "鎌倉木工所",
        title: "大工",
        location: "鎌倉市, 日本",
        startDate: "2007-02",
        endDate: "2011-02",
        current: false,
        description:
          "お客様と直接やり取りし、着工前にニーズと要望を確認\n各プロジェクトの詳細な設計図と予算書を作成\n構造支持の建設を専門とする",
      },
      {
        id: generateId(),
        company: "藤沢建設",
        title: "見習い大工",
        location: "藤沢市, 日本",
        startDate: "2005-04",
        endDate: "2007-01",
        current: false,
        description:
          "熟練大工の住宅プロジェクトにおけるフレーミング、屋根、仕上げ作業を支援\n電動工具、テーブルソー、釘打ち機の安全な操作を習得\n安全基準に準拠した整理整頓された現場の維持に貢献",
      },
    ],
    education: [],
    certifications: [
      {
        id: generateId(),
        name: "建築大工",
        issuer: "神奈川県立職業訓練校",
        year: "2005",
        credentialId: "",
        credentialUrl: "",
      },
      {
        id: generateId(),
        name: "建設業安全衛生責任者",
        issuer: "建設業労働災害防止協会",
        year: "2008",
        credentialId: "",
        credentialUrl: "",
      },
    ],
    skillGroups: [
      {
        id: generateId(),
        category: "技術",
        skills: ["機械スキル", "クリティカルシンキング", "手先の器用さ", "電動工具"],
      },
      { id: generateId(), category: "マネジメント", skills: ["時間管理", "監督", "品質管理"] },
    ],
    projects: [
      {
        id: generateId(),
        name: "カスタムキッチンリノベーション",
        description:
          "カスタムキャビネット、無垢材フローリング、構造変更を含むフルキッチンリノベーションを設計・施工。納期通りに完了し、予算を10%削減。",
        technologies: ["AutoCAD", "木工", "見積り"],
        startDate: "2023-03",
        endDate: "2023-08",
      },
    ],
  },
  clear: {
    fullName: "伊藤真理",
    headline: "受付",
    summary:
      "多忙な環境での受付経験を複数年持つ、勤勉で経験豊富な受付スタッフ。スケジュール管理、予約対応、最適なカスタマーサービスの提供に長ける。",
    contact: {
      email: "ito.mari@email.com",
      phone: "+81 80-5678-1234",
      location: "東京都, 日本",
      linkedin: "linkedin.com/in/itomari",
      website: "",
    },
    experience: [
      {
        id: generateId(),
        company: "グランドホテル東京",
        title: "フロントデスク受付",
        location: "東京都, 日本",
        startDate: "2014-10",
        endDate: null,
        current: true,
        description:
          "ゲストをお迎えし、200室以上の施設のチェックイン・チェックアウト手続きを管理\n電話対応、郵便物配布、予約スケジュール管理を担当\nハウスキーピングとメンテナンス部門と連携し、ゲストの満足度を確保",
      },
      {
        id: generateId(),
        company: "リラクゼーションスパ星",
        title: "受付",
        location: "横浜市, 日本",
        startDate: "2010-06",
        endDate: "2014-10",
        current: false,
        description:
          "電話対応、お客様のお出迎え、フロントデスク業務全般を担当\n注文処理、郵便物管理、一部経理業務を担当\nお客様にサービス、技術、製品についての情報を提供",
      },
      {
        id: generateId(),
        company: "西東京メディカルセンター",
        title: "フロントデスク事務",
        location: "東京都, 日本",
        startDate: "2008-04",
        endDate: "2010-05",
        current: false,
        description:
          "多忙な診療所の患者受付・会計手続きを管理\n予約管理と電子カルテシステムでの正確な患者記録の維持\n1日80名以上の患者の保険確認と自己負担金の処理",
      },
    ],
    education: [
      {
        id: generateId(),
        school: "東京商科専門学校",
        degree: "準学士",
        field: "コミュニケーション",
        startDate: "2006-04",
        endDate: "2008-03",
        highlights: "",
      },
    ],
    certifications: [
      {
        id: generateId(),
        name: "秘書検定1級",
        issuer: "日本秘書協会",
        year: "2012",
        credentialId: "",
        credentialUrl: "",
      },
    ],
    skillGroups: [
      {
        id: generateId(),
        category: "スキル",
        skills: [
          "コミュニケーション",
          "マルチタスク",
          "スケジューリング",
          "オフィステクノロジー",
          "簿記",
        ],
      },
      { id: generateId(), category: "言語", skills: ["日本語", "英語", "中国語"] },
    ],
    projects: [
      {
        id: generateId(),
        name: "オフィスデジタル化プロジェクト",
        description:
          "3部門の紙ベースからデジタルファイリングシステムへの移行をリード。25名以上のスタッフを研修し、書類検索時間を70%削減。",
        technologies: ["Google Workspace", "DocuSign", "Notion"],
        startDate: "2023-02",
        endDate: "2023-06",
      },
    ],
  },
};

const DE_SAMPLE_DATA: Record<string, PartialSampleData> = {
  modern: {
    fullName: "Maximilian Müller",
    headline: "Senior Software-Ingenieur",
    summary:
      "Full-Stack-Ingenieur mit über 6 Jahren Erfahrung in der Entwicklung skalierbarer Webanwendungen. Leidenschaftlich für Entwicklererfahrung, Performance und saubere Architektur.",
    contact: {
      email: "max.mueller@email.de",
      phone: "+49 30 1234 5678",
      location: "Berlin, Deutschland",
      linkedin: "linkedin.com/in/maxmueller",
      website: "maxmueller.dev",
    },
    experience: [
      {
        id: generateId(),
        company: "SAP",
        title: "Senior Software-Ingenieur",
        location: "Berlin, Deutschland",
        startDate: "2021-03",
        endDate: null,
        current: true,
        description:
          "Migration des Zahlungs-Dashboards auf React 18 geleitet, Ladezeiten um 40% verbessert\nEchtzeit-Webhook-Monitoring entwickelt und ausgeliefert, genutzt von über 50.000 Händlern\n4 Junior-Ingenieure durch strukturierte Code-Reviews und Pair-Programming-Sitzungen betreut",
      },
      {
        id: generateId(),
        company: "Zalando",
        title: "Software-Ingenieur",
        location: "Berlin, Deutschland",
        startDate: "2018-06",
        endDate: "2021-02",
        current: false,
        description:
          "Deployment-Pipeline-Optimierungen gebaut, Build-Zeiten um 30% reduziert\nZu Open-Source-Tools beigetragen, die von über 500.000 Entwicklern genutzt werden\nEdge-Caching-Strategie implementiert, die API-Latenz um 60% reduzierte",
      },
      {
        id: generateId(),
        company: "Rocket Internet",
        title: "Junior Software-Ingenieur",
        location: "Berlin, Deutschland",
        startDate: "2017-05",
        endDate: "2018-05",
        current: false,
        description:
          "Interne Tools für CI/CD-Pipelines mit Python und Bash entwickelt\nRESTful APIs mit Node.js und Express gebaut, die über 10.000 tägliche Anfragen bedienen\nAm Bereitschaftsdienst teilgenommen und Produktionsvorfälle innerhalb der SLA gelöst",
      },
    ],
    education: [
      {
        id: generateId(),
        school: "Technische Universität München",
        degree: "B.Sc.",
        field: "Informatik",
        startDate: "2014-10",
        endDate: "2018-07",
        gpa: "1,3",
        highlights: "Deutschlandstipendium, Tutor für Algorithmen und Datenstrukturen",
      },
    ],
    certifications: [
      {
        id: generateId(),
        name: "AWS Solutions Architect Associate",
        issuer: "AWS",
        year: "2020",
        credentialId: "",
        credentialUrl: "",
      },
    ],
    skillGroups: [
      { id: generateId(), category: "Sprachen", skills: ["TypeScript", "Python", "Go", "SQL"] },
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
        name: "Open-Source CLI-Tool",
        description:
          "Ein Entwickler-CLI zum Scaffolding von Next.js-Projekten mit vorkonfiguriertem CI/CD, Linting und Tests gebaut. 1,2K+ GitHub-Sterne.",
        url: "github.com/maxmueller/create-next-stack",
        technologies: ["TypeScript", "Node.js", "GitHub Actions"],
        startDate: "2022-01",
        endDate: "2022-06",
      },
    ],
  },
  classic: {
    fullName: "Sophie Wagner",
    headline: "Business-Analystin",
    summary:
      "Datengetriebene Business-Analystin mit 5 Jahren Erfahrung in der Übersetzung komplexer Datensätze in umsetzbare Strategien. Erfahren im Stakeholder-Management und in der bereichsübergreifenden Zusammenarbeit.",
    contact: {
      email: "sophie.wagner@email.de",
      phone: "+49 40 8765 4321",
      location: "Hamburg, Deutschland",
      linkedin: "linkedin.com/in/sophiewagner",
      website: "",
    },
    experience: [
      {
        id: generateId(),
        company: "Deutsche Bank",
        title: "Senior Business-Analystin",
        location: "Frankfurt, Deutschland",
        startDate: "2020-09",
        endDate: null,
        current: true,
        description:
          "Finanzmodelle entwickelt, die Investitionsentscheidungen von über 2 Mrd. € informierten\nAnforderungserhebung für eine neue Kundenreporting-Plattform für über 200 Berater geleitet\nVierteljährlichen Reportingzyklus durch Prozessautomatisierung um 35% verkürzt",
      },
      {
        id: generateId(),
        company: "Deloitte Deutschland",
        title: "Junior-Analystin",
        location: "Hamburg, Deutschland",
        startDate: "2018-07",
        endDate: "2020-08",
        current: false,
        description:
          "Marktanalysen für Fortune-500-Kunden in 3 Branchen durchgeführt\nTableau-Dashboards erstellt, die von über 15 Beratungsteams genutzt werden\nDue-Diligence bei M&A-Transaktionen im Gesamtwert von 500 Mio. € unterstützt",
      },
      {
        id: generateId(),
        company: "Accenture",
        title: "Analystin-Praktikantin",
        location: "München, Deutschland",
        startDate: "2017-06",
        endDate: "2018-06",
        current: false,
        description:
          "Senior-Berater bei Datenerhebung und -analyse für Einzelhandelskunden unterstützt\nFinanzmodelle in Excel zur Prognose vierteljährlicher Umsatztrends erstellt\nErgebnisse in wöchentlichen Statusmeetings den Kunden-Stakeholdern präsentiert",
      },
    ],
    education: [
      {
        id: generateId(),
        school: "Universität Hamburg",
        degree: "B.Sc.",
        field: "Finanzwirtschaft & Data Science",
        startDate: "2014-10",
        endDate: "2018-07",
        gpa: "1,5",
        highlights: "Begabtenförderung, Vorsitzende des Finanz-Clubs",
      },
    ],
    certifications: [
      {
        id: generateId(),
        name: "CFA Level I",
        issuer: "CFA Institute",
        year: "2019",
        credentialId: "",
        credentialUrl: "",
      },
    ],
    skillGroups: [
      {
        id: generateId(),
        category: "Analyse",
        skills: ["Finanzmodellierung", "SQL", "Python", "Excel"],
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
        name: "Kundenabwanderungs-Vorhersagemodell",
        description:
          "Ein prädiktives Analysemodell entwickelt, das Risikokunden mit 87% Genauigkeit identifizierte und proaktive Bindungsstrategien ermöglichte, die die Abwanderung um 15% reduzierten.",
        technologies: ["Python", "Tableau", "SQL"],
        startDate: "2022-03",
        endDate: "2022-09",
      },
    ],
  },
  minimal: {
    fullName: "Lena Fischer",
    headline: "Produktdesignerin",
    summary:
      "Produktdesignerin mit über 4 Jahren Erfahrung in der Gestaltung intuitiver digitaler Erlebnisse. Fokussiert auf Design-Systeme, Barrierefreiheit und Nutzerforschung.",
    contact: {
      email: "lena@designstudio.de",
      phone: "",
      location: "München, Deutschland",
      linkedin: "linkedin.com/in/lenafischer",
      website: "lenafischer.design",
    },
    experience: [
      {
        id: generateId(),
        company: "Figma",
        title: "Produktdesignerin",
        location: "Remote",
        startDate: "2022-01",
        endDate: null,
        current: true,
        description:
          "Komponentenbibliothek entworfen, die von 8 Produktteams genutzt wird\nRedesign der Kollaborationsfunktionen geleitet, tägliche aktive Nutzung um 25% gesteigert\nBarrierefreiheitsrichtlinien etabliert, die unternehmensweit übernommen wurden",
      },
      {
        id: generateId(),
        company: "Spotify",
        title: "UI/UX-Designerin",
        location: "Berlin, Deutschland",
        startDate: "2019-06",
        endDate: "2021-12",
        current: false,
        description:
          "Playlist-Erstellungsflow neu gestaltet, Abbruchrate um 18% reduziert\nÜber 40 Nutzerforschungssitzungen durchgeführt, um Designentscheidungen zu validieren\nInterne Design-System-Dokumentation aufgebaut und gepflegt",
      },
      {
        id: generateId(),
        company: "Kreativstudio",
        title: "Junior-Designerin",
        location: "München, Deutschland",
        startDate: "2018-06",
        endDate: "2019-05",
        current: false,
        description:
          "Visuelle Assets und UI-Mockups für über 10 Kundenprojekte erstellt\nLead-Designerin beim Aufbau von Markenidentitätskits für Startups unterstützt\nResponsive Landingpages entworfen, die Kundenkonversionen um 12% steigerten",
      },
    ],
    education: [
      {
        id: generateId(),
        school: "Hochschule für Gestaltung Offenbach",
        degree: "B.A.",
        field: "Grafikdesign",
        startDate: "2015-10",
        endDate: "2019-07",
        highlights: "Rektoratspreis",
      },
    ],
    certifications: [
      {
        id: generateId(),
        name: "UX Design Professional Certificate",
        issuer: "Google",
        year: "2020",
        credentialId: "",
        credentialUrl: "",
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
        category: "Entwicklung",
        skills: ["HTML/CSS", "React", "Tailwind CSS", "Storybook"],
      },
    ],
    projects: [
      {
        id: generateId(),
        name: "DesignTokens.io",
        description:
          "Open-Source-Tool zur Generierung und Synchronisierung von Design-Tokens zwischen Figma und Code. 2K+ GitHub-Sterne.",
        url: "github.com/lenafischer/designtokens",
        technologies: ["React", "TypeScript", "Figma Plugin API"],
        startDate: "2023-03",
        endDate: null,
      },
    ],
  },
  executive: {
    fullName: "Charlotte Weber",
    headline: "Personalreferentin",
    summary:
      "Eigeninitiative, ergebnisorientierte Recruiting- und HR-Spezialistin mit umfangreicher Erfahrung in der Bereitstellung von HR-, Recruiting- und Talent-Management-Beratung.",
    contact: {
      email: "charlotte.weber@email.de",
      phone: "+49 89 9876 5432",
      location: "München, Deutschland",
      linkedin: "linkedin.com/in/charlotteweber",
      website: "",
    },
    experience: [
      {
        id: generateId(),
        company: "Siemens",
        title: "Personalreferentin",
        location: "München, Deutschland",
        startDate: "2013-07",
        endDate: null,
        current: true,
        description:
          "Verantwortlich für den gesamten Recruiting-Lebenszyklus über 8 Standorte\nAn Fortschrittsmeeting mit Schlüsselkunden teilgenommen, Performance und Ergebnisse überwacht\nKosten pro Einstellung durch strategische Sourcing-Initiativen um 22% gesenkt",
      },
      {
        id: generateId(),
        company: "Hays Deutschland",
        title: "Trainerin & Beraterin",
        location: "Frankfurt, Deutschland",
        startDate: "2010-01",
        endDate: "2013-07",
        current: false,
        description:
          "Online-Recruiting-System-Projekte beaufsichtigt und strategische Ziele erreicht\nKundenportfolios verwaltet, Geschäftsanalysen durchgeführt und Beziehungen aufgebaut\nÜber 50 Junior-Recruiter in Best Practices und Compliance geschult",
      },
      {
        id: generateId(),
        company: "Randstad Deutschland",
        title: "HR-Koordinatorin",
        location: "Düsseldorf, Deutschland",
        startDate: "2008-08",
        endDate: "2009-12",
        current: false,
        description:
          "Onboarding-Prozesse für über 100 Neueinstellungen jährlich koordiniert\nMitarbeiterakten gepflegt und Einhaltung der Arbeitsgesetze sichergestellt\nBei der Organisation von Karrieremessen und Campus-Recruiting-Veranstaltungen mitgewirkt",
      },
    ],
    education: [
      {
        id: generateId(),
        school: "Ludwig-Maximilians-Universität München",
        degree: "M.Sc.",
        field: "Strategisches Personalmanagement",
        startDate: "2005-10",
        endDate: "2008-07",
        highlights: "Mit Auszeichnung abgeschlossen",
      },
    ],
    certifications: [
      {
        id: generateId(),
        name: "SHRM Certified Professional (SHRM-CP)",
        issuer: "SHRM",
        year: "2011",
        credentialId: "",
        credentialUrl: "",
      },
    ],
    skillGroups: [
      {
        id: generateId(),
        category: "HR",
        skills: ["Recruiting", "Personalmanagement", "Mitarbeiterbeziehungen", "Talentakquise"],
      },
      {
        id: generateId(),
        category: "Sprachen",
        skills: ["Deutsch", "Englisch", "Französisch", "Spanisch"],
      },
    ],
    projects: [
      {
        id: generateId(),
        name: "Employer-Branding-Initiative",
        description:
          "Unternehmensweites Employer-Branding-Projekt geleitet, das Karriereseiten und Social-Media-Präsenz erneuerte und qualifizierte Bewerbungen innerhalb von 6 Monaten um 40% steigerte.",
        technologies: ["LinkedIn Recruiter", "Greenhouse", "Canva"],
        startDate: "2023-01",
        endDate: "2023-07",
      },
    ],
  },
  bold: {
    fullName: "Thomas Schneider",
    headline: "Finanzanalyst",
    summary:
      "Erfahrener und zielstrebiger Finanzanalyst mit beeindruckendem Hintergrund in der Verwaltung von Multimillionen-Budgets bei gleichzeitiger Bereitstellung von Analysen und Kontenunterstützung.",
    contact: {
      email: "thomas.schneider@email.de",
      phone: "+49 211 4321 8765",
      location: "Frankfurt, Deutschland",
      linkedin: "linkedin.com/in/thomasschneider",
      website: "",
    },
    experience: [
      {
        id: generateId(),
        company: "Allianz",
        title: "Finanzanalyst",
        location: "Frankfurt, Deutschland",
        startDate: "2012-01",
        endDate: null,
        current: true,
        description:
          "Budgets erstellt und Arbeits- sowie Materialkosten um 15% gesenkt\nFinanzberichte einschließlich Cashflow-Diagrammen und Bilanzen erstellt\nAnalyse- und Leistungsberichte für Managementteams erstellt",
      },
      {
        id: generateId(),
        company: "Commerzbank",
        title: "Finanzanalyst",
        location: "Düsseldorf, Deutschland",
        startDate: "2008-02",
        endDate: "2012-12",
        current: false,
        description:
          "Berichte, Ad-hoc-Analysen, jährliche Betriebsplanbudgets und Umsatzprognosen bereitgestellt\nLieferantenverträge analysiert und in Verhandlungen beraten, Budgets um 6% gesenkt\nWöchentliche Personalfinanzberichte erstellt und Ergebnisse dem Management präsentiert",
      },
      {
        id: generateId(),
        company: "PricewaterhouseCoopers",
        title: "Junior-Finanzanalyst",
        location: "München, Deutschland",
        startDate: "2006-11",
        endDate: "2008-01",
        current: false,
        description:
          "Senior-Analysten bei der Erstellung vierteljährlicher Finanzberichte und Abweichungsanalysen unterstützt\nKonten abgestimmt und genaue Aufzeichnungen für die Prüfungsbereitschaft geführt\nBudgetierungsprozess für 3 mittelgroße Unternehmenskunden unterstützt",
      },
    ],
    education: [
      {
        id: generateId(),
        school: "Universität Frankfurt",
        degree: "M.Sc.",
        field: "Wirtschaftsinformatik",
        startDate: "2004-10",
        endDate: "2006-09",
        highlights: "Mit Auszeichnung abgeschlossen",
      },
      {
        id: generateId(),
        school: "Universität Frankfurt",
        degree: "B.Sc.",
        field: "Wirtschaftsinformatik",
        startDate: "2000-10",
        endDate: "2004-09",
        highlights: "Mit Auszeichnung abgeschlossen",
      },
    ],
    certifications: [
      {
        id: generateId(),
        name: "Certified Public Accountant (CPA)",
        issuer: "American Institute of CPAs",
        year: "2008",
        credentialId: "",
        credentialUrl: "",
      },
    ],
    skillGroups: [
      {
        id: generateId(),
        category: "Technisch",
        skills: ["Lösungsstrategien", "Analytisches Denken", "Marktbewertung", "Trendanalyse"],
      },
      {
        id: generateId(),
        category: "Soft Skills",
        skills: ["Teamführung", "Zusammenarbeit", "Kundenorientierter Vertrieb", "Networking"],
      },
    ],
    projects: [
      {
        id: generateId(),
        name: "Quartals-Prognose-Dashboard",
        description:
          "Ein automatisiertes Finanzprognose-Dashboard in Power BI gebaut, das Daten aus 5 Abteilungen konsolidierte und die Berichtserstellungszeit von 3 Tagen auf 2 Stunden reduzierte.",
        technologies: ["Power BI", "Excel VBA", "SQL Server"],
        startDate: "2023-06",
        endDate: "2023-12",
      },
    ],
  },
  balanced: {
    fullName: "Stefan Hartmann",
    headline: "Zimmermann",
    summary:
      "Erfahrener und leidenschaftlicher Zimmermann mit über 10 Jahren Erfahrung im Wohn- und Gewerbebau. Bekannt für Qualitätsarbeit, termingerechte Fertigstellung und Projekte im oder unter Budget.",
    contact: {
      email: "stefan.hartmann@email.de",
      phone: "+49 89 1234 5678",
      location: "München, Deutschland",
      linkedin: "linkedin.com/in/stefanhartmann",
      website: "",
    },
    experience: [
      {
        id: generateId(),
        company: "Hartmann Holzbau GmbH",
        title: "Zimmermeister",
        location: "München, Deutschland",
        startDate: "2011-03",
        endDate: null,
        current: true,
        description:
          "Kunden exzellenten Service geboten und kollaborativ an Bauanforderungen gearbeitet\n20 Küchen renoviert, hochwertige Einbauküchen und Sanitäranlagen installiert\n10 Außenterrassen und Gehwege gebaut, Einhaltung aller Bauvorschriften sichergestellt",
      },
      {
        id: generateId(),
        company: "Bayerische Schreinerei",
        title: "Zimmermann",
        location: "Rosenheim, Deutschland",
        startDate: "2007-02",
        endDate: "2011-02",
        current: false,
        description:
          "Direkt mit Kunden zusammengearbeitet, Bedürfnisse und Wünsche vor Baubeginn ermittelt\nDetailpläne und Finanzbudgets für jedes Projekt erstellt\nSpezialisiert auf den Bau von Tragwerken",
      },
      {
        id: generateId(),
        company: "Münchner Bau GmbH",
        title: "Zimmermanns-Lehrling",
        location: "München, Deutschland",
        startDate: "2005-08",
        endDate: "2007-01",
        current: false,
        description:
          "Erfahrene Zimmerleute bei Rohbau, Dacharbeiten und Innenausbau von Wohnprojekten unterstützt\nSicheren Umgang mit Elektrowerkzeugen, Tischsägen und Nagelgeräten erlernt\nBei der Aufrechterhaltung organisierter und sauberer Baustellen gemäß Arbeitssicherheitsstandards geholfen",
      },
    ],
    education: [
      {
        id: generateId(),
        school: "Handwerkskammer München",
        degree: "Gesellenbrief",
        field: "Zimmerei",
        startDate: "2003-09",
        endDate: "2005-07",
        highlights: "",
      },
    ],
    certifications: [
      {
        id: generateId(),
        name: "Arbeitssicherheit im Bauwesen",
        issuer: "BG BAU",
        year: "2008",
        credentialId: "",
        credentialUrl: "",
      },
    ],
    skillGroups: [
      {
        id: generateId(),
        category: "Technisch",
        skills: [
          "Handwerkliche Fähigkeiten",
          "Kritisches Denken",
          "Hand-Auge-Koordination",
          "Elektrowerkzeuge",
        ],
      },
      {
        id: generateId(),
        category: "Management",
        skills: ["Zeitmanagement", "Aufsicht", "Qualitätskontrolle"],
      },
    ],
    projects: [
      {
        id: generateId(),
        name: "Maßgeschneiderte Küchenrenovierung",
        description:
          "Vollständige Küchenrenovierung mit Einbauküche, Massivholzboden und Strukturänderungen entworfen und gebaut. Termingerecht fertiggestellt und 10% unter Budget geblieben.",
        technologies: ["AutoCAD", "Holzbearbeitung", "Kostenschätzung"],
        startDate: "2023-03",
        endDate: "2023-08",
      },
    ],
  },
  clear: {
    fullName: "Anna Becker",
    headline: "Empfangsmitarbeiterin",
    summary:
      "Fleißige und erfahrene Empfangsmitarbeiterin mit mehrjähriger Erfahrung in Umgebungen mit hohem Kundenaufkommen. Erfahren in Terminplanung, Terminvergabe und optimaler Kundenbetreuung.",
    contact: {
      email: "anna.becker@email.de",
      phone: "+49 30 5678 1234",
      location: "Berlin, Deutschland",
      linkedin: "linkedin.com/in/annabecker",
      website: "",
    },
    experience: [
      {
        id: generateId(),
        company: "Grand Hotel Berlin",
        title: "Empfangsmitarbeiterin",
        location: "Berlin, Deutschland",
        startDate: "2014-10",
        endDate: null,
        current: true,
        description:
          "Gäste begrüßt und Ein-/Auscheckvorgänge für ein Haus mit über 200 Zimmern verwaltet\nTelefonate, Postverteilung und Terminplanung verwaltet\nMit Housekeeping und Wartung koordiniert, um Gästezufriedenheit sicherzustellen",
      },
      {
        id: generateId(),
        company: "Wellness-Spa Stern",
        title: "Empfangsmitarbeiterin",
        location: "Hamburg, Deutschland",
        startDate: "2010-06",
        endDate: "2014-10",
        current: false,
        description:
          "Telefonate beantwortet, Kunden begrüßt und alle Empfangsaufgaben übernommen\nBestellungen, Post und einige Buchhaltungsaufgaben erledigt\nKunden über Dienstleistungen, Technologie und angebotene Produkte informiert",
      },
      {
        id: generateId(),
        company: "Medizinisches Zentrum West",
        title: "Empfangskraft",
        location: "Hamburg, Deutschland",
        startDate: "2008-09",
        endDate: "2010-05",
        current: false,
        description:
          "Patientenanmeldung und -abmeldung in einer viel besuchten Arztpraxis verwaltet\nTermine geplant und genaue Patientenakten im elektronischen System gepflegt\nVersicherungsprüfungen und Zuzahlungen für über 80 Patienten täglich verarbeitet",
      },
    ],
    education: [
      {
        id: generateId(),
        school: "Berufsfachschule Hamburg",
        degree: "Berufsabschluss",
        field: "Kommunikation",
        startDate: "2006-09",
        endDate: "2008-07",
        highlights: "",
      },
    ],
    certifications: [
      {
        id: generateId(),
        name: "Geprüfte Bürofachkraft",
        issuer: "IHK",
        year: "2012",
        credentialId: "",
        credentialUrl: "",
      },
    ],
    skillGroups: [
      {
        id: generateId(),
        category: "Fähigkeiten",
        skills: ["Kommunikation", "Multitasking", "Terminplanung", "Bürotechnik", "Buchhaltung"],
      },
      {
        id: generateId(),
        category: "Sprachen",
        skills: ["Deutsch", "Englisch", "Französisch", "Spanisch"],
      },
    ],
    projects: [
      {
        id: generateId(),
        name: "Büro-Digitalisierungsprojekt",
        description:
          "Umstellung von papierbasierten auf digitale Ablagesysteme in 3 Abteilungen geleitet, über 25 Mitarbeiter geschult und Dokumentenabrufzeit um 70% reduziert.",
        technologies: ["Google Workspace", "DocuSign", "Notion"],
        startDate: "2023-02",
        endDate: "2023-06",
      },
    ],
  },
};

const HI_SAMPLE_DATA: Record<string, PartialSampleData> = {
  modern: {
    fullName: "आदित्य शर्मा",
    headline: "सीनियर सॉफ्टवेयर इंजीनियर",
    summary:
      "6+ वर्षों के अनुभव वाले फुल-स्टैक इंजीनियर, स्केलेबल वेब एप्लिकेशन निर्माण में विशेषज्ञ। डेवलपर अनुभव, प्रदर्शन और क्लीन आर्किटेक्चर के प्रति समर्पित।",
    contact: {
      email: "aditya.sharma@email.com",
      phone: "+91 98765 43210",
      location: "बेंगलुरु, कर्नाटक",
      linkedin: "linkedin.com/in/adityasharma",
      website: "adityasharma.dev",
    },
    experience: [
      {
        id: generateId(),
        company: "Flipkart",
        title: "सीनियर सॉफ्टवेयर इंजीनियर",
        location: "बेंगलुरु, कर्नाटक",
        startDate: "2021-03",
        endDate: null,
        current: true,
        description:
          "पेमेंट्स डैशबोर्ड का React 18 में माइग्रेशन लीड किया, लोड टाइम 40% कम किया\nरियल-टाइम वेबहुक मॉनिटरिंग डिज़ाइन और डिलीवर किया, 50K+ विक्रेताओं द्वारा उपयोग\n4 जूनियर इंजीनियरों को कोड रिव्यू और पेयर प्रोग्रामिंग सेशन के माध्यम से मेंटर किया",
      },
      {
        id: generateId(),
        company: "Zoho",
        title: "सॉफ्टवेयर इंजीनियर",
        location: "चेन्नई, तमिलनाडु",
        startDate: "2018-06",
        endDate: "2021-02",
        current: false,
        description:
          "डिप्लॉयमेंट पाइपलाइन ऑप्टिमाइज़ेशन बनाया, बिल्ड टाइम 30% कम किया\n500K+ डेवलपर्स द्वारा उपयोग किए जाने वाले ओपन-सोर्स टूल्स में योगदान\nएज कैशिंग स्ट्रैटेजी लागू की जिससे API लेटेंसी 60% कम हुई",
      },
      {
        id: generateId(),
        company: "TCS",
        title: "जूनियर सॉफ्टवेयर डेवलपर",
        location: "मुंबई, महाराष्ट्र",
        startDate: "2017-01",
        endDate: "2018-05",
        current: false,
        description:
          "Node.js और Express के साथ RESTful API विकसित किए, 10K+ दैनिक अनुरोध\nCI/CD पाइपलाइन के लिए आंतरिक टूलिंग विकसित की\nऑन-कॉल रोटेशन में भाग लिया और SLA के अंदर प्रोडक्शन इंसीडेंट्स हल किए",
      },
    ],
    education: [
      {
        id: generateId(),
        school: "IIT दिल्ली",
        degree: "बी.टेक.",
        field: "कंप्यूटर साइंस एंड इंजीनियरिंग",
        startDate: "2013-07",
        endDate: "2017-05",
        gpa: "9.1",
        highlights: "डीन्स लिस्ट, AI में रिसर्च प्रोजेक्ट",
      },
    ],
    certifications: [
      {
        id: generateId(),
        name: "AWS Solutions Architect Associate",
        issuer: "AWS",
        year: "2020",
        credentialId: "",
        credentialUrl: "",
      },
    ],
    skillGroups: [
      { id: generateId(), category: "भाषाएं", skills: ["TypeScript", "Python", "Go", "SQL"] },
      {
        id: generateId(),
        category: "फ्रेमवर्क",
        skills: ["React", "Next.js", "Node.js", "FastAPI"],
      },
      {
        id: generateId(),
        category: "टूल्स",
        skills: ["PostgreSQL", "Redis", "Docker", "AWS", "GitHub Actions"],
      },
    ],
    projects: [
      {
        id: generateId(),
        name: "ओपन-सोर्स CLI टूल",
        description:
          "Next.js प्रोजेक्ट स्कैफोल्डिंग के लिए CLI बनाया, CI/CD, लिंटिंग और टेस्ट प्री-कॉन्फ़िगर्ड। GitHub पर 1.2K+ स्टार्स।",
        url: "github.com/adityasharma/create-next-stack",
        technologies: ["TypeScript", "Node.js", "GitHub Actions"],
        startDate: "2022-01",
        endDate: "2022-06",
      },
    ],
  },
  classic: {
    fullName: "प्रिया पटेल",
    headline: "बिज़नेस एनालिस्ट",
    summary:
      "5 वर्षों के अनुभव वाली डेटा-ड्रिवन बिज़नेस एनालिस्ट, जटिल डेटासेट को कार्यान्वयन योग्य रणनीतियों में बदलने में विशेषज्ञ। स्टेकहोल्डर मैनेजमेंट और क्रॉस-फंक्शनल सहयोग में कुशल।",
    contact: {
      email: "priya.patel@email.com",
      phone: "+91 87654 32109",
      location: "मुंबई, महाराष्ट्र",
      linkedin: "linkedin.com/in/priyapatel",
      website: "",
    },
    experience: [
      {
        id: generateId(),
        company: "Infosys",
        title: "सीनियर बिज़नेस एनालिस्ट",
        location: "मुंबई, महाराष्ट्र",
        startDate: "2021-04",
        endDate: null,
        current: true,
        description:
          "प्रमुख बैंकिंग क्लाइंट के लिए ₹50 करोड़ के प्रोजेक्ट पोर्टफोलियो का विश्लेषण\nव्यावसायिक आवश्यकताओं को 200+ पेज के फंक्शनल स्पेसिफिकेशन में ट्रांसलेट किया\nस्टेकहोल्डर प्रेजेंटेशन के माध्यम से Q3 बजट में 15% की बचत हासिल की",
      },
      {
        id: generateId(),
        company: "Wipro",
        title: "बिज़नेस एनालिस्ट",
        location: "पुणे, महाराष्ट्र",
        startDate: "2019-01",
        endDate: "2021-03",
        current: false,
        description:
          "डेटा विज़ुअलाइज़ेशन डैशबोर्ड बनाए जिनका उपयोग 30+ एग्ज़ीक्यूटिव्स ने किया\nप्रोसेस ऑटोमेशन पहल का नेतृत्व किया जिससे मैन्युअल रिपोर्टिंग 40% कम हुई",
      },
    ],
    education: [
      {
        id: generateId(),
        school: "IIM अहमदाबाद",
        degree: "MBA",
        field: "बिज़नेस एनालिटिक्स",
        startDate: "2017-06",
        endDate: "2019-04",
        gpa: "3.8",
        highlights: "डेटा एनालिटिक्स में विशेषज्ञता, केस कॉम्पिटिशन फाइनलिस्ट",
      },
    ],
    certifications: [
      {
        id: generateId(),
        name: "प्रमाणित सार्वजनिक लेखाकार (CPA)",
        issuer: "अमेरिकन इंस्टीट्यूट ऑफ CPAs",
        year: "2008",
        credentialId: "",
        credentialUrl: "",
      },
    ],
    skillGroups: [
      { id: generateId(), category: "विश्लेषण", skills: ["SQL", "Python", "Tableau", "Power BI"] },
      {
        id: generateId(),
        category: "व्यवसाय",
        skills: ["Jira", "Confluence", "Agile/Scrum", "Stakeholder Management"],
      },
    ],
    projects: [
      {
        id: generateId(),
        name: "ग्राहक मंथन पूर्वानुमान मॉडल",
        description: "मशीन लर्निंग मॉडल बनाया जो 89% सटीकता से ग्राहक मंथन की भविष्यवाणी करता है।",
        url: "",
        technologies: ["Python", "scikit-learn", "Tableau"],
        startDate: "2022-06",
        endDate: "2022-12",
      },
    ],
  },
  minimal: {
    fullName: "नेहा कुमार",
    headline: "प्रोडक्ट डिज़ाइनर",
    summary:
      "4+ वर्षों से सहज डिजिटल अनुभव तैयार करने वाली प्रोडक्ट डिज़ाइनर। डिज़ाइन सिस्टम, एक्सेसिबिलिटी और डिज़ाइन-इंजीनियरिंग के बीच सेतु बनाने पर केंद्रित।",
    contact: {
      email: "neha.kumar@email.com",
      phone: "+91 76543 21098",
      location: "हैदराबाद, तेलंगाना",
      linkedin: "linkedin.com/in/nehakumar",
      website: "nehakumar.design",
    },
    experience: [
      {
        id: generateId(),
        company: "Swiggy",
        title: "सीनियर प्रोडक्ट डिज़ाइनर",
        location: "बेंगलुरु, कर्नाटक",
        startDate: "2022-01",
        endDate: null,
        current: true,
        description:
          "5 डिज़ाइनरों की टीम का नेतृत्व करते हुए इनस्टामार्ट ऐप का रीडिज़ाइन किया, उपयोगकर्ता संतुष्टि 35% बढ़ी\n100+ कंपोनेंट्स के साथ डिज़ाइन सिस्टम बनाया और बनाए रखा",
      },
      {
        id: generateId(),
        company: "Ola",
        title: "UI/UX डिज़ाइनर",
        location: "बेंगलुरु, कर्नाटक",
        startDate: "2019-06",
        endDate: "2021-12",
        current: false,
        description:
          "ड्राइवर ऐप के लिए यूज़र फ्लो और वायरफ्रेम डिज़ाइन किए\nA/B टेस्टिंग के माध्यम से साइन-अप कन्वर्ज़न 25% बढ़ाया",
      },
    ],
    education: [
      {
        id: generateId(),
        school: "NID अहमदाबाद",
        degree: "बी.डेस.",
        field: "इंटरैक्शन डिज़ाइन",
        startDate: "2015-07",
        endDate: "2019-05",
        highlights: "गोल्ड मेडलिस्ट, UX डिज़ाइन में थीसिस",
      },
    ],
    certifications: [
      {
        id: generateId(),
        name: "प्रमाणित सार्वजनिक लेखाकार (CPA)",
        issuer: "अमेरिकन इंस्टीट्यूट ऑफ CPAs",
        year: "2008",
        credentialId: "",
        credentialUrl: "",
      },
    ],
    skillGroups: [
      {
        id: generateId(),
        category: "डिज़ाइन",
        skills: ["Figma", "Sketch", "Adobe XD", "Protopie"],
      },
      {
        id: generateId(),
        category: "रिसर्च",
        skills: ["Usability Testing", "A/B Testing", "User Interviews"],
      },
      { id: generateId(), category: "फ्रंटएंड", skills: ["HTML", "CSS", "React", "Tailwind CSS"] },
    ],
    projects: [
      {
        id: generateId(),
        name: "Swiggy डिज़ाइन सिस्टम",
        description: "कंपनी-व्यापी डिज़ाइन सिस्टम बनाया जिससे डिज़ाइन-टू-डेव हैंडऑफ़ 50% तेज़ हुआ।",
        url: "",
        technologies: ["Figma", "React", "Storybook"],
        startDate: "2022-03",
        endDate: "2022-09",
      },
    ],
  },
  executive: {
    fullName: "राजेश मेहता",
    headline: "भर्ती अधिकारी",
    summary:
      "HR, भर्ती और प्रतिभा प्रबंधन में व्यापक अनुभव वाले स्व-प्रेरित, परिणाम-उन्मुख भर्ती एवं HR विशेषज्ञ। रणनीतिक योजना के साथ व्यावहारिक डिलीवरी का संतुलन।",
    contact: {
      email: "rajesh.mehta@email.com",
      phone: "+91 99887 76655",
      location: "दिल्ली, भारत",
      linkedin: "linkedin.com/in/rajeshmehta",
      website: "",
    },
    experience: [
      {
        id: generateId(),
        company: "Reliance Industries",
        title: "सीनियर भर्ती अधिकारी",
        location: "मुंबई, महाराष्ट्र",
        startDate: "2020-01",
        endDate: null,
        current: true,
        description:
          "वार्षिक 200+ पदों के लिए एंड-टू-एंड भर्ती प्रक्रिया का प्रबंधन\nभर्ती समय 30% कम किया, ATS और स्ट्रक्चर्ड इंटरव्यू लागू करके\n15+ विभागों के हायरिंग मैनेजर्स के साथ सहयोग",
      },
      {
        id: generateId(),
        company: "Mahindra Group",
        title: "HR एग्ज़ीक्यूटिव",
        location: "पुणे, महाराष्ट्र",
        startDate: "2017-06",
        endDate: "2019-12",
        current: false,
        description:
          "कर्मचारी ऑनबोर्डिंग और एंगेजमेंट प्रोग्राम का समन्वय\nकैंपस रिक्रूटमेंट ड्राइव का आयोजन, 500+ कैंडिडेट्स को स्क्रीन किया",
      },
    ],
    education: [
      {
        id: generateId(),
        school: "XLRI जमशेदपुर",
        degree: "MBA",
        field: "मानव संसाधन प्रबंधन",
        startDate: "2015-06",
        endDate: "2017-04",
        gpa: "3.7",
        highlights: "HR क्लब अध्यक्ष, समर इंटर्नशिप एक्सीलेंस अवार्ड",
      },
    ],
    certifications: [
      {
        id: generateId(),
        name: "प्रमाणित सार्वजनिक लेखाकार (CPA)",
        issuer: "अमेरिकन इंस्टीट्यूट ऑफ CPAs",
        year: "2008",
        credentialId: "",
        credentialUrl: "",
      },
    ],
    skillGroups: [
      {
        id: generateId(),
        category: "भर्ती",
        skills: ["ATS", "LinkedIn Recruiter", "Interview Design", "Employer Branding"],
      },
      {
        id: generateId(),
        category: "HR",
        skills: ["SAP SuccessFactors", "Workday", "Labour Law", "POSH Compliance"],
      },
    ],
    projects: [
      {
        id: generateId(),
        name: "कैंपस कनेक्ट प्रोग्राम",
        description:
          "20 शीर्ष इंजीनियरिंग कॉलेजों के साथ कैंपस हायरिंग प्रोग्राम शुरू किया, भर्ती गुणवत्ता 25% बढ़ी।",
        url: "",
        technologies: ["SAP SuccessFactors", "Power BI", "MS Teams"],
        startDate: "2021-01",
        endDate: "2021-06",
      },
    ],
  },
  bold: {
    fullName: "अंकित वर्मा",
    headline: "वित्तीय विश्लेषक",
    summary:
      "मल्टी-मिलियन डॉलर बजट प्रबंधन में प्रभावशाली पृष्ठभूमि वाले अनुभवी और प्रेरित वित्तीय विश्लेषक। प्रोडक्ट डेवलपमेंट विभागों में विश्लेषण और खाता सहायता प्रदान करने में अनुभवी।",
    contact: {
      email: "ankit.verma@email.com",
      phone: "+91 88776 65544",
      location: "गुड़गांव, हरियाणा",
      linkedin: "linkedin.com/in/ankitverma",
      website: "",
    },
    experience: [
      {
        id: generateId(),
        company: "HDFC Bank",
        title: "सीनियर वित्तीय विश्लेषक",
        location: "मुंबई, महाराष्ट्र",
        startDate: "2020-09",
        endDate: null,
        current: true,
        description:
          "₹200 करोड़ के वार्षिक बजट का पूर्वानुमान और विश्लेषण प्रबंधित\nतिमाही वित्तीय रिपोर्ट तैयार की, प्रमुख KPI और विचलन का विश्लेषण\nप्रोसेस ऑटोमेशन के माध्यम से रिपोर्टिंग समय 50% कम किया",
      },
      {
        id: generateId(),
        company: "Deloitte India",
        title: "वित्तीय विश्लेषक",
        location: "बेंगलुरु, कर्नाटक",
        startDate: "2018-07",
        endDate: "2020-08",
        current: false,
        description:
          "10+ क्लाइंट्स के लिए वित्तीय मॉडलिंग और वैल्यूएशन किया\nDue diligence रिपोर्ट तैयार की, ₹500 करोड़+ के M&A डील्स में सहायता",
      },
    ],
    education: [
      {
        id: generateId(),
        school: "IIM बेंगलुरु",
        degree: "MBA",
        field: "वित्त",
        startDate: "2016-06",
        endDate: "2018-04",
        gpa: "3.9",
        highlights: "वित्त क्लब सचिव, CFA Level II उत्तीर्ण",
      },
    ],
    certifications: [
      {
        id: generateId(),
        name: "प्रमाणित सार्वजनिक लेखाकार (CPA)",
        issuer: "अमेरिकन इंस्टीट्यूट ऑफ CPAs",
        year: "2008",
        credentialId: "",
        credentialUrl: "",
      },
    ],
    skillGroups: [
      {
        id: generateId(),
        category: "वित्तीय",
        skills: ["Financial Modeling", "Valuation", "Budgeting", "Forecasting"],
      },
      {
        id: generateId(),
        category: "टूल्स",
        skills: ["Excel", "Python", "Bloomberg Terminal", "SAP", "Power BI"],
      },
    ],
    projects: [
      {
        id: generateId(),
        name: "बजट ऑटोमेशन डैशबोर्ड",
        description:
          "Power BI डैशबोर्ड बनाया जो रियल-टाइम बजट ट्रैकिंग प्रदान करता है, मैन्युअल रिपोर्टिंग 70% कम की।",
        url: "",
        technologies: ["Power BI", "Python", "SQL"],
        startDate: "2021-03",
        endDate: "2021-08",
      },
    ],
  },
  balanced: {
    fullName: "सुरेश यादव",
    headline: "बढ़ई / कारपेंटर",
    summary:
      "आवासीय और वाणिज्यिक निर्माण में 10+ वर्षों के अनुभव वाले कुशल और समर्पित बढ़ई। गुणवत्ता कार्य, समयबद्ध निर्माण और बजट के अंदर प्रोजेक्ट पूरा करने की सकारात्मक प्रतिष्ठा।",
    contact: {
      email: "suresh.yadav@email.com",
      phone: "+91 77665 54433",
      location: "जयपुर, राजस्थान",
      linkedin: "",
      website: "",
    },
    experience: [
      {
        id: generateId(),
        company: "शर्मा कंस्ट्रक्शन",
        title: "लीड कारपेंटर",
        location: "जयपुर, राजस्थान",
        startDate: "2018-03",
        endDate: null,
        current: true,
        description:
          "5 कारपेंटर्स की टीम का नेतृत्व, आवासीय फर्नीचर और फिटिंग प्रोजेक्ट\nकस्टम किचन और वार्डरोब डिज़ाइन और इंस्टॉल किए, 100+ संतुष्ट ग्राहक\nसामग्री अपव्यय 20% कम किया",
      },
      {
        id: generateId(),
        company: "राजपूत इंटीरियर्स",
        title: "कारपेंटर",
        location: "जयपुर, राजस्थान",
        startDate: "2014-01",
        endDate: "2018-02",
        current: false,
        description:
          "ऑफिस और रेस्टोरेंट इंटीरियर फिटिंग में विशेषज्ञता\nब्लूप्रिंट पढ़कर कस्टम फर्नीचर बनाया",
      },
    ],
    education: [
      {
        id: generateId(),
        school: "ITI जयपुर",
        degree: "डिप्लोमा",
        field: "कारपेंट्री",
        startDate: "2012-07",
        endDate: "2014-06",
        highlights: "प्रथम श्रेणी, प्रैक्टिकल एग्ज़ाम में सर्वोच्च अंक",
      },
    ],
    certifications: [
      {
        id: generateId(),
        name: "प्रमाणित सार्वजनिक लेखाकार (CPA)",
        issuer: "अमेरिकन इंस्टीट्यूट ऑफ CPAs",
        year: "2008",
        credentialId: "",
        credentialUrl: "",
      },
    ],
    skillGroups: [
      {
        id: generateId(),
        category: "कौशल",
        skills: ["फर्नीचर निर्माण", "इंटीरियर फिटिंग", "ब्लूप्रिंट रीडिंग", "CNC मशीन"],
      },
      {
        id: generateId(),
        category: "सामग्री",
        skills: ["सागौन", "प्लाईवुड", "MDF", "लैमिनेट", "हार्डवेयर फिटिंग"],
      },
    ],
    projects: [
      {
        id: generateId(),
        name: "होटल लॉबी रीनोवेशन",
        description:
          "5-स्टार होटल के लॉबी का कस्टम वुडवर्क, रिसेप्शन डेस्क और बुकशेल्फ सहित। समय पर और बजट के अंदर पूरा।",
        url: "",
        technologies: ["सागौन", "CNC", "हैंड कार्विंग"],
        startDate: "2023-01",
        endDate: "2023-04",
      },
    ],
  },
  clear: {
    fullName: "मीनाक्षी राव",
    headline: "रिसेप्शनिस्ट",
    summary:
      "उच्च-मात्रा वाले क्लाइंट सेटिंग्स में कई वर्षों के अनुभव वाली मेहनती और अनुभवी रिसेप्शनिस्ट। शेड्यूल बनाने, अपॉइंटमेंट लेने और ग्राहकों को बेहतरीन सेवा प्रदान करने में अनुभवी।",
    contact: {
      email: "meenakshi.rao@email.com",
      phone: "+91 66554 43322",
      location: "चेन्नई, तमिलनाडु",
      linkedin: "linkedin.com/in/meenakshirao",
      website: "",
    },
    experience: [
      {
        id: generateId(),
        company: "Taj Hotels",
        title: "सीनियर रिसेप्शनिस्ट",
        location: "चेन्नई, तमिलनाडु",
        startDate: "2020-06",
        endDate: null,
        current: true,
        description:
          "प्रतिदिन 100+ अतिथियों का चेक-इन/चेक-आउट प्रबंधित\nVIP गेस्ट सर्विसेज़ का समन्वय, गेस्ट सैटिस्फैक्शन स्कोर 95%+ बनाए रखा\nनए स्टाफ सदस्यों को PMS सॉफ्टवेयर और गेस्ट रिलेशन प्रोटोकॉल में प्रशिक्षित किया",
      },
      {
        id: generateId(),
        company: "Apollo Hospitals",
        title: "फ्रंट डेस्क एग्ज़ीक्यूटिव",
        location: "चेन्नई, तमिलनाडु",
        startDate: "2018-01",
        endDate: "2020-05",
        current: false,
        description:
          "रोगी अपॉइंटमेंट और डॉक्टर शेड्यूल का प्रबंधन\nबीमा सत्यापन और बिलिंग पूछताछ में सहायता\nमल्टी-लाइन फ़ोन सिस्टम संचालित, 200+ दैनिक कॉल",
      },
    ],
    education: [
      {
        id: generateId(),
        school: "मद्रास विश्वविद्यालय",
        degree: "बी.ए.",
        field: "अंग्रेज़ी साहित्य",
        startDate: "2014-06",
        endDate: "2017-04",
        highlights: "हॉस्पिटैलिटी मैनेजमेंट में प्रमाणपत्र",
      },
    ],
    certifications: [
      {
        id: generateId(),
        name: "प्रमाणित सार्वजनिक लेखाकार (CPA)",
        issuer: "अमेरिकन इंस्टीट्यूट ऑफ CPAs",
        year: "2008",
        credentialId: "",
        credentialUrl: "",
      },
    ],
    skillGroups: [
      {
        id: generateId(),
        category: "कौशल",
        skills: ["ग्राहक सेवा", "शेड्यूलिंग", "MS Office", "PMS सॉफ्टवेयर"],
      },
      { id: generateId(), category: "भाषाएं", skills: ["हिन्दी", "अंग्रेज़ी", "तमिल", "तेलुगु"] },
    ],
    projects: [
      {
        id: generateId(),
        name: "डिजिटल चेक-इन सिस्टम",
        description:
          "iPad-आधारित सेल्फ-चेक-इन सिस्टम लागू करने में सहायता की, फ्रंट डेस्क प्रतीक्षा समय 40% कम किया।",
        url: "",
        technologies: ["PMS", "iPad", "QR Code"],
        startDate: "2021-06",
        endDate: "2021-09",
      },
    ],
  },
};

/**
 * Returns localized sample data for a template.
 * Falls back to the template's default English data if no localization exists.
 */
export function getLocalizedSampleData(
  templateId: string,
  locale: string = "en",
): Partial<ResumeData> | undefined {
  const tmpl = TEMPLATES.find((t) => t.id === templateId);
  if (!tmpl?.sampleData) return undefined;

  const localeMap: Record<string, Record<string, PartialSampleData>> = {
    "pt-BR": PT_BR_SAMPLE_DATA,
    es: ES_SAMPLE_DATA,
    it: IT_SAMPLE_DATA,
    zh: ZH_SAMPLE_DATA,
    ja: JA_SAMPLE_DATA,
    de: DE_SAMPLE_DATA,
    hi: HI_SAMPLE_DATA,
  };

  const data = localeMap[locale];
  if (data) return data[templateId] ?? tmpl.sampleData;
  return tmpl.sampleData;
}
