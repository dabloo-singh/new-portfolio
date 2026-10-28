import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import {
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
  Code2,
  Database,
  GraduationCap,
  Layers3,
  Menu,
  Moon,
  Sun,
  X,
} from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { portfolioConfig, portfolioProjects, skillGroups } from './data/portfolio.js'
import './App.css'

const HeroScene = lazy(() => import('./components/Scene3D.jsx'))

const navItems = [
  ['Home', 'home'],
  ['About', 'about'],
  ['Skills', 'skills'],
  ['Projects', 'projects'],
  ['Experience', 'experience'],
  ['Education', 'education'],
  ['Contact', 'contact'],
]

const socialLinks = {
  github: 'https://github.com/dabloo-singh',
  linkedin: 'https://www.linkedin.com/in/dabloo-singh-1a7716298',
  email: 'dabloosingh463@gmail.com',
}

function useTheme() {
  const [theme, setTheme] = useState(
    () => document.documentElement.dataset.theme || 'dark',
  )

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    const themeColor = document.querySelector('meta[name="theme-color"]')
    themeColor?.setAttribute('content', theme === 'light' ? '#f5f7fc' : '#070711')
    try {
      localStorage.setItem('portfolio-theme', theme)
    } catch (error) {
      console.warn('Unable to save the selected theme.', error)
    }
  }, [theme])

  return [theme, setTheme]
}

function ScrollProgress() {
  const progressRef = useRef(null)

  useEffect(() => {
    const updateProgress = () => {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0
      progressRef.current?.style.setProperty('--scroll-progress', progress)
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)
    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  return <div className="scroll-progress" ref={progressRef} aria-hidden="true" />
}

function Navigation({ theme, setTheme }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const sections = navItems
      .map(([, id]) => document.getElementById(id))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (current) setActiveSection(current.target.id)
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: [0, 0.1, 0.3, 0.6] },
    )
    sections.forEach((section) => observer.observe(section))

    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    if (!menuOpen) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <a className="brand" href="#home" onClick={closeMenu} aria-label="Dabloo Singh, home">
        <span className="brand-mark">DS<span>.</span></span>
        <span className="brand-caption">INDEPENDENT DEVELOPER</span>
      </a>

      <nav
        className={`navigation${menuOpen ? ' is-open' : ''}`}
        id="primary-navigation"
        aria-label="Main navigation"
      >
        {navItems.map(([label, id]) => (
          <a
            href={`#${id}`}
            key={id}
            aria-current={activeSection === id ? 'location' : undefined}
            onClick={closeMenu}
          >
            {label}
          </a>
        ))}
        <a className="nav-cta" href="#contact" onClick={closeMenu}>
          LET&apos;S TALK <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </nav>

      <div className="header-actions">
        <button
          className="theme-toggle"
          type="button"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          aria-pressed={theme === 'light'}
        >
          {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
        </button>
        <button
          className="menu-toggle"
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  )
}

function SectionHeading({ eyebrow, title, accent, number, note }) {
  return (
    <div className="section-topline">
      <div className="section-heading">
        <p className="eyebrow">{eyebrow} <span>/ {number}</span></p>
        <h2>{title}<br /><span className="blue-text">{accent}</span></h2>
      </div>
      {note && <p className="section-note">{note}</p>}
    </div>
  )
}

function Hero({ prefersReducedMotion }) {
  const [allow3d, setAllow3d] = useState(false)

  useEffect(() => {
    const lowPowerDevice = window.matchMedia(
      '(max-width: 720px), (pointer: coarse)',
    )
    const update = () => setAllow3d(!lowPowerDevice.matches)
    update()
    lowPowerDevice.addEventListener('change', update)
    return () => lowPowerDevice.removeEventListener('change', update)
  }, [])

  return (
    <section className="hero section-shell" id="home">
      <div className="hero-copy">
        <div className="availability">
          <span className="status-dot" />
          <span>{portfolioConfig.availability}</span>
          <span className="availability-line" />
        </div>
        <p className="eyebrow">FULL-STACK DEVELOPER <span>/</span> INDIA</p>
        <h1>Hi, I&apos;m<br /><span className="name-accent">Dabloo Singh.</span></h1>
        <h2 className="hero-tagline">Building digital experiences that stand out.</h2>
        <p className="hero-intro">
          A Computer Science developer crafting useful, responsive, and engaging
          web applications — from thoughtful interfaces to dependable full-stack features.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#projects">
            EXPLORE MY WORK <ArrowDownRight size={17} aria-hidden="true" />
          </a>
          <a className="button button-contact" href="#contact">
            LET&apos;S CONNECT <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
        <div className="social-links" aria-label="Social profiles">
          <a href={socialLinks.github} target="_blank" rel="noopener noreferrer">
            GITHUB <ArrowUpRight size={13} aria-hidden="true" />
          </a>
          <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
            LINKEDIN <ArrowUpRight size={13} aria-hidden="true" />
          </a>
        </div>
        <div className="hero-footnote"><span>01</span> CODE WITH INTENT. SHIP WITH IMPACT.</div>
      </div>

      <div className="hero-visual" aria-label="Abstract electric-blue and violet energy sphere" role="img">
        <div className="hero-visual-fallback" aria-hidden="true">
          <span className="fallback-orbit fallback-orbit-one" />
          <span className="fallback-orbit fallback-orbit-two" />
          <span className="fallback-sphere" />
        </div>
        {allow3d && !prefersReducedMotion && (
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        )}
        <span className="orb-coordinate orb-coordinate-top">DS / 2026</span>
        <span className="orb-coordinate orb-coordinate-bottom">BUILD · ITERATE · SHIP</span>
      </div>

      <a className="scroll-cue" href="#about">
        <ArrowDown size={16} aria-hidden="true" /> SCROLL TO EXPLORE
      </a>
    </section>
  )
}

function Ticker() {
  const words = ['DESIGN', 'DEVELOP', 'ITERATE', 'DELIVER']
  return (
    <div className="ticker" aria-label="Areas of focus">
      <div className="ticker-track" aria-hidden="true">
        {[0, 1].map((copy) => (
          <span className="ticker-set" key={copy}>
            {words.map((word) => (
              <span className="ticker-item" key={`${copy}-${word}`}>
                {word}<i>✳</i>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  )
}

function About({ prefersReducedMotion }) {
  return (
    <section className="about section-shell section-space" id="about">
      <motion.div
        className="section-heading"
        initial={prefersReducedMotion ? false : 'hidden'}
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={reveal}
      >
        <p className="eyebrow">A LITTLE ABOUT ME <span>/ 01</span></p>
        <h2>ABOUT<br /><span className="blue-text">ME.</span></h2>
      </motion.div>
      <motion.div
        className="about-content"
        initial={prefersReducedMotion ? false : 'hidden'}
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={reveal}
      >
        <p className="about-lead">I enjoy turning practical problems into clear, reliable digital experiences.</p>
        <p className="body-copy">
          I&apos;m Dabloo Singh, focused on full-stack web development. I enjoy working
          across responsive interfaces, REST APIs, authentication, and data-backed features.
        </p>
        <p className="body-copy">
          My approach is to understand the problem, keep the experience easy to use,
          and build each part with care. I&apos;m continually learning through projects
          and strengthening my foundations in algorithms, databases, and software design.
        </p>
        <a className="text-link" href={`mailto:${socialLinks.email}`}>
          LET&apos;S BUILD SOMETHING <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </motion.div>
      <motion.div
        className="stats-row"
        initial={prefersReducedMotion ? false : 'hidden'}
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={reveal}
      >
        <div className="stat"><strong>03</strong><span>FEATURED PROJECTS</span></div>
        <div className="stat"><strong>05</strong><span>SKILL CATEGORIES</span></div>
        <div className="stat"><strong>∞</strong><span>ROOM TO KEEP LEARNING</span></div>
      </motion.div>
    </section>
  )
}

const reveal = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.2, 0.7, 0.25, 1] },
  },
}

const projectFilters = [
  ['all', 'ALL'],
  ['fullstack', 'FULL-STACK'],
  ['python', 'PYTHON'],
]

function ProjectPreview({ type }) {
  if (type === 'donor') {
    return (
      <div className="preview-window donor-preview">
        <div className="preview-window-bar"><i /><i /><i /><span>life.link</span></div>
        <div className="preview-screen">
          <span>GIVE THE GIFT OF LIFE</span>
          <strong>Every match<br />matters.</strong>
          <b>FIND A DONOR ↗</b>
        </div>
        <span className="preview-stamp">DONOR<br />NETWORK</span>
      </div>
    )
  }
  if (type === 'food') {
    return (
      <div className="preview-window food-preview">
        <div className="food-preview-image">GOOD FOOD.<br />GOOD MOOD.</div>
        <div className="food-preview-copy">
          <strong>Crave something<br />delicious?</strong>
          <span>DISCOVER LOCAL FAVOURITES →</span>
        </div>
        <span className="preview-stamp food-stamp">FRESH<br />&amp; FAST</span>
      </div>
    )
  }
  return (
    <div className="quiz-board">
      <span className="quiz-prompt">QUICK THINKER, HUH?</span>
      <strong>01<span> / 10</span></strong>
      <div className="quiz-question">Which data structure<br />follows FIFO?</div>
      <div className="quiz-options">
        <span>A&nbsp; Stack</span>
        <span className="selected-option">B&nbsp; Queue&nbsp; ✓</span>
        <span>C&nbsp; Tree</span>
      </div>
    </div>
  )
}

function Projects({ prefersReducedMotion }) {
  const [filter, setFilter] = useState('all')
  const projects = portfolioProjects.filter(
    (project) => filter === 'all' || project.category === filter,
  )

  return (
    <section className="projects section-space" id="projects">
      <div className="section-shell">
        <SectionHeading
          eyebrow="SELECTED BUILDS"
          number="02"
          title="PROOF OF"
          accent="WORK."
          note="A few things I’ve designed, built, and learned from along the way."
        />
        <div className="project-controls" role="group" aria-label="Filter projects">
          {projectFilters.map(([id, label]) => (
            <button
              className={`project-filter${filter === id ? ' is-active' : ''}`}
              type="button"
              onClick={() => setFilter(id)}
              aria-pressed={filter === id}
              key={id}
            >
              {label}
              <span>
                {id === 'all'
                  ? portfolioProjects.length
                  : portfolioProjects.filter((project) => project.category === id).length}
              </span>
            </button>
          ))}
          <p className="project-count" aria-live="polite">
            SHOWING {projects.length} {projects.length === 1 ? 'PROJECT' : 'PROJECTS'}
          </p>
        </div>
        <div className="project-list" aria-live="polite" aria-label="Portfolio projects">
          {projects.map((project, index) => (
            <motion.article
              className={`project-card project-${project.id}`}
              key={project.id}
              initial={prefersReducedMotion ? false : 'hidden'}
              whileInView="visible"
              viewport={{ once: true, amount: 0.12 }}
              variants={reveal}
              transition={{ delay: index * 0.08 }}
              aria-labelledby={`project-title-${project.id}`}
            >
              <div className={`project-visual ${project.id}-visual`} aria-hidden="true">
                <span className="visual-number">{project.number} / {project.kind}</span>
                <span className="visual-coordinate">ILLUSTRATIVE ART / {project.number}</span>
                <ProjectPreview type={project.id} />
              </div>
              <div className="project-info">
                <div className="project-title-line">
                  <h3 id={`project-title-${project.id}`}>{project.title}</h3>
                  <ArrowUpRight className="project-arrow" size={18} aria-hidden="true" />
                </div>
                <p>{project.description}</p>
                <div className="tag-list" aria-label="Technologies">
                  {project.technologies.map((technology) => (
                    <span key={technology}>{technology}</span>
                  ))}
                </div>
                <div className="project-links">
                  {project.liveDemo && (
                    <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                      VIEW LIVE DEMO <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  )}
                  {project.repository && (
                    <a href={project.repository} target="_blank" rel="noopener noreferrer">
                      SOURCE CODE <Code2 size={14} aria-hidden="true" />
                    </a>
                  )}
                </div>
                <ul className="project-highlights">
                  {project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Skills({ prefersReducedMotion }) {
  const categoryIcons = [Layers3, Database, Code2, GraduationCap, Layers3]

  return (
    <section className="toolkit section-shell section-space" id="skills">
      <motion.div
        className="toolkit-intro"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={reveal}
      >
        <p className="eyebrow">WHAT I WORK WITH <span>/ 03</span></p>
        <h2>TOOLS OF<br /><span className="blue-text">THE TRADE.</span></h2>
        <p className="body-copy">The right tool for the right problem. Here’s what I bring to the build.</p>
      </motion.div>
      <div className="skill-groups">
        {skillGroups.map((group, index) => {
          const Icon = categoryIcons[index]
          return (
            <motion.article
              className="skill-group"
              key={group.name}
              initial={prefersReducedMotion ? false : 'hidden'}
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={reveal}
              transition={{ delay: index * 0.06 }}
            >
              <span className="skill-index">0{index + 1}</span>
              <div className="skill-content">
                <h3><Icon size={16} aria-hidden="true" /> {group.name}</h3>
                <ul className="skill-chips">
                  {group.skills.map((skill) => <li key={skill}>{skill}</li>)}
                </ul>
              </div>
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}

const education = [
  {
    date: '2022 — 2026',
    title: 'B.Tech, Computer Science & Engineering',
    detail: 'United Institute of Technology',
    type: 'B.TECH PROGRAM',
  },
  {
    date: '2020 — 2022',
    title: 'Intermediate, Science',
    detail: 'P.C. College, Buxar · 71.40%',
    type: 'INTERMEDIATE',
  },
  {
    date: '2018 — 2019',
    title: 'Class X',
    detail: 'Harihar Singh Academy · 74.60%',
    type: 'SECONDARY',
  },
]

const experience = [
  {
    date: 'Sep 2026 — Present · 2 mos',
    role: 'Full-Stack Development Intern',
    company: 'Last Minutes Deal',
    companyUrl: 'https://www.linkedin.com/company/113022256/',
    detail: 'Remote · Internship',
    type: 'INTERNSHIP',
  },
  {
    date: 'Oct 2024 · 1 month',
    role: 'Industrial Trainee',
    company: 'NETCAMP',
    detail: 'Industrial training',
    description:
      'Developed and optimized responsive user interfaces using frontend technologies, improving application structure and usability during a hands-on training program. Gained applied exposure to Network Management, Android App Development, Ethical Hacking, Data Science, and API Integration alongside core web development work. Collaborated within a structured training environment to apply real-world software development workflows to assigned projects.',
    type: 'TRAINING',
  },
]

function Experience({ prefersReducedMotion }) {
  return (
    <section className="experience section-shell section-space" id="experience">
      <SectionHeading
        eyebrow="EXPERIENCE"
        number="04"
        title="LEARNING BY"
        accent="BUILDING."
        note="Internship and hands-on industry training"
      />
      <div className="timeline">
        {experience.map((item, index) => (
          <motion.article
            className="timeline-item"
            key={item.role}
            initial={prefersReducedMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={reveal}
            transition={{ delay: index * 0.08 }}
          >
            <span className="timeline-dot" aria-hidden="true" />
            <div className="timeline-date">{item.date}</div>
            <div className="timeline-detail">
              <h3>{item.role}</h3>
              <p className="experience-company">
                {item.companyUrl ? (
                  <a href={item.companyUrl} target="_blank" rel="noopener noreferrer">
                    {item.company}
                  </a>
                ) : item.company}
                {' · '}{item.detail}
              </p>
              {item.description && <p className="experience-description">{item.description}</p>}
            </div>
            <span className="timeline-type">{item.type}</span>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

function Education({ prefersReducedMotion }) {
  return (
    <section className="education section-space" id="education">
      <div className="section-shell">
        <SectionHeading
          eyebrow="EDUCATION"
          number="05"
          title="ALWAYS"
          accent="LEARNING."
          note="Academic background"
        />
        <div className="timeline">
          {education.map((item, index) => (
            <motion.article
              className="timeline-item"
              key={item.title}
              initial={prefersReducedMotion ? false : 'hidden'}
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={reveal}
              transition={{ delay: index * 0.08 }}
            >
              <span className="timeline-dot" aria-hidden="true" />
              <div className="timeline-date">{item.date}</div>
              <div className="timeline-detail">
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </div>
              <span className="timeline-type">{item.type}</span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section className="contact section-shell section-space" id="contact">
      <p className="eyebrow">YOUR NEXT MOVE <span>/ 06</span></p>
      <div className="contact-layout">
        <div>
          <h2>LET&apos;S BUILD<br /><span className="blue-text">SOMETHING GREAT.</span></h2>
          <p className="contact-copy">
            Have a project, opportunity, or idea to discuss? I&apos;d be glad to hear from you.
          </p>
          <a
            className="button button-primary"
            href={`mailto:${socialLinks.email}?subject=Portfolio%20enquiry`}
          >
            START A CONVERSATION <ArrowUpRight size={17} aria-hidden="true" />
          </a>
          <p className="contact-note">Your email app will open; this site does not send or track messages.</p>
        </div>
        <div className="contact-links">
          <a href={`mailto:${socialLinks.email}`}>
            <span>EMAIL</span><strong>{socialLinks.email}</strong><ArrowUpRight size={16} />
          </a>
          <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
            <span>LINKEDIN</span><strong>Connect with me</strong><ArrowUpRight size={16} />
          </a>
          <a href={socialLinks.github} target="_blank" rel="noopener noreferrer">
            <span>GITHUB</span><strong>See what I’m building</strong><ArrowUpRight size={16} />
          </a>
          <div className="contact-location">
            <span>BASED IN</span><strong>Delhi, India <i>✳</i></strong>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const [currentYear] = useState(() => new Date().getFullYear())

  return (
    <footer className="site-footer">
      <a className="brand" href="#home" aria-label="Dabloo Singh, back to home">
        <span className="brand-mark">DS<span>.</span></span>
      </a>
      <nav className="footer-navigation" aria-label="Footer navigation">
        {navItems.slice(1).map(([label, id]) => <a href={`#${id}`} key={id}>{label}</a>)}
      </nav>
      <div className="footer-social">
        <a href={socialLinks.github} target="_blank" rel="noopener noreferrer">GITHUB</a>
        <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">LINKEDIN</a>
      </div>
      <span>© {currentYear} DABLOO SINGH</span>
      <a className="back-top" href="#home">BACK TO TOP ↑</a>
    </footer>
  )
}

function App() {
  const [theme, setTheme] = useTheme()
  const prefersReducedMotion = useReducedMotion()

  return (
    <>
      <ScrollProgress />
      <div className="page-noise" aria-hidden="true" />
      <Navigation theme={theme} setTheme={setTheme} />
      <main>
        <Hero prefersReducedMotion={prefersReducedMotion} />
        <Ticker />
        <About prefersReducedMotion={prefersReducedMotion} />
        <Projects prefersReducedMotion={prefersReducedMotion} />
        <Skills prefersReducedMotion={prefersReducedMotion} />
        <Experience prefersReducedMotion={prefersReducedMotion} />
        <Education prefersReducedMotion={prefersReducedMotion} />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
