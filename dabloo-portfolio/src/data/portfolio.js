export const portfolioConfig = {
  availability: 'OPEN TO OPPORTUNITIES',
}

export const portfolioProjects = [
  {
    id: 'donor',
    category: 'fullstack',
    number: '01',
    kind: 'COMMUNITY',
    title: 'Bone Marrow Donation System',
    description:
      'A donor management platform for institutes to manage donor and patient records through a responsive, data-backed interface.',
    technologies: ['React.js', 'Supabase', 'Tailwind CSS', 'OAuth'],
    liveDemo: 'https://final-main-project.netlify.app/',
    highlights: [
      'OAuth authentication with role-based access',
      'Real-time Supabase data operations',
      'Responsive donor and patient management interface',
    ],
  },
  {
    id: 'food',
    category: 'fullstack',
    number: '02',
    kind: 'COMMERCE',
    title: 'Food Delivery App',
    description:
      'A full-stack food ordering experience with restaurant browsing, cart management, authentication, and order history.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
    liveDemo: 'https://food-delivery-app-dablu.vercel.app/',
    highlights: [
      'Restaurant browsing and cart management',
      'REST APIs for menus and order processing',
      'Authentication, checkout, and order history',
    ],
  },
  {
    id: 'quiz',
    category: 'python',
    number: '03',
    kind: 'LEARNING',
    title: 'The Quiz Adda',
    description:
      'A Python quiz application with a JSON-backed question bank, randomized questions, score tracking, and a final results summary.',
    technologies: ['Python', 'JSON'],
    highlights: [
      'Randomized questions across categories',
      'Input validation and score tracking',
      'Modular question bank for adding categories',
    ],
  },
]

export const skillGroups = [
  {
    name: 'Frontend Development',
    skills: ['React.js', 'Tailwind CSS', 'Bootstrap', 'Responsive Web Design'],
  },
  {
    name: 'Backend & Data',
    skills: ['Node.js', 'Express.js', 'REST APIs', 'OAuth', 'MongoDB', 'Supabase'],
  },
  {
    name: 'Programming Languages',
    skills: ['C', 'C++', 'Java', 'Python', 'SQL', 'JavaScript', 'HTML5', 'CSS3'],
  },
  {
    name: 'Computer Science Foundations',
    skills: [
      'Data Structures & Algorithms',
      'Object-Oriented Programming',
      'Operating Systems',
      'Computer Networks',
    ],
  },
  {
    name: 'Tools & Data',
    skills: ['Git', 'GitHub', 'VS Code', 'NumPy'],
  },
]
