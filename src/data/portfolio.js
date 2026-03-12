export const projects = [
  {
    id: 1,
    categories: ['uxui', 'personal'],
    tag: 'UX/UI Design',
    title: 'MyShield',
    description: 'A safety app designed for high-stress situations. Features SOS alerts, fake calls, video recording, location sharing, and a discreet mode — all built around quick access and clear usability when it matters most.',
    gradient: 'linear-gradient(135deg, #367074, #5bc5cf)',
    link: '#',
  },
  {
    id: 2,
    categories: ['uxui', 'personal'],
    tag: 'UX/UI Design',
    title: 'The Sweet Spot',
    description: 'A bakery and drinks ordering app with themed flavor interfaces, full sign-up flow, and category browsing for pies, cakes, drinks, cupcakes, and sweet breads. Designed with a complete color system and multiple visual themes.',
    gradient: 'linear-gradient(135deg, #1f2f25, #306761)',
    link: '#',
  },
  {
    id: 3,
    categories: ['uxui', 'personal'],
    tag: 'UX/UI Design',
    title: 'Virtual Pet',
    description: 'An Apple Watch virtual pet app inspired by Tamagotchi. Hand-redrawn pixel character faces and interactions for a Stardew Valley-themed experience, using purchased asset packs customized frame by frame.',
    gradient: 'linear-gradient(135deg, #94dcd2, #5bc5cf)',
    link: '#',
  },
  {
    id: 4,
    categories: ['uxui'],
    tag: 'UX/UI Design · Group',
    title: 'Klean House Project',
    description: 'A mobile app built around the UN\'s sustainability goal of responsible consumption and production. Designed collaboratively in a team of 4-5 to promote cleaner living habits.',
    gradient: 'linear-gradient(135deg, #2c1f40, #5b4381)',
    link: '#',
  },
  {
    id: 5,
    categories: ['uxui'],
    tag: 'UX/UI Design · Group',
    title: 'Design Library',
    description: 'A learning app designed to teach people different design skills. A straightforward, educational interface focused on making design knowledge accessible.',
    gradient: 'linear-gradient(135deg, #3b295a, #94dcd2)',
    link: '#',
  },
  {
    id: 6,
    categories: ['uxui', 'personal'],
    tag: 'UX/UI Design · Personal',
    title: 'Triur.ai',
    description: 'A personal AI companion desktop app with three evolving personalities — Abi, David, and Quinn. Features emotional memory, personality growth, animated sprites, and a glassmorphism UI. Built with Tauri, Python, and Ollama.',
    gradient: 'linear-gradient(135deg, #2c1f40, #367074)',
    link: 'https://github.com/AMPickettDesign/Triur.ai',
    buttons: [
      {
        label: 'View on GitHub',
        url: 'https://github.com/AMPickettDesign/Triur.ai',
        style: 'secondary'
      },
      {
        label: 'Download',
        url: 'https://github.com/AMPickettDesign/Triur.ai/releases',
        style: 'primary'
      }
    ]
  },
  {
    id: 7,
    categories: ['design'],
    tag: 'Graphic Design',
    title: 'More Work Coming Soon',
    description: 'Graphic design projects including branding, print, and visual identity work will be added here.',
    gradient: 'linear-gradient(135deg, #1d1529, #2c1f40)',
    link: null,
  },
];

export const skills = {
  technical: [
    'UI/UX Design', 'Graphic Design', 'Visual Communication',
    'Wireframing & Prototyping', 'Branding & Identity Design',
    'Visual Storytelling', 'Style Guide & System Design',
    'AI/Emergent Design Concepts',
  ],
  tools: [
    'Figma', 'Adobe Photoshop', 'Adobe Illustrator',
    'Adobe InDesign', 'Unity', 'AI Tools (Claude, etc.)',
  ],
  soft: [
    'Creativity', 'Problem-Solving', 'Communication',
    'Collaboration & Teamwork', 'Adaptability',
    'Time Management', 'Critical Thinking', 'Empathy',
  ],
};

export const processSteps = [
  { number: '01', title: 'Discover', description: 'User research, stakeholder interviews, competitive analysis, and defining project goals.' },
  { number: '02', title: 'Define', description: 'User personas, journey maps, information architecture, and content strategy.' },
  { number: '03', title: 'Design', description: 'Wireframes, prototypes, visual design, design systems, and iterative testing.' },
  { number: '04', title: 'Deliver', description: 'Developer handoff, quality assurance, launch support, and post-launch iteration.' },
];

export const filters = [
  { key: 'all', label: 'All' },
  { key: 'uxui', label: 'UX/UI' },
  { key: 'design', label: 'Graphic Design' },
  { key: 'personal', label: 'Personal Projects' },
];

export const navSections = [
  { id: 'hero', label: 'Home' },
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'process', label: 'Process' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];
