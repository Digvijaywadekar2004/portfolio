import React, { useState } from 'react'
import projects from '../components/projectsData'
import CTA from '../components/CTA'

// Dynamically derive categories, preserving insertion order
const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))]

// ── Image with shimmer placeholder ──────────────────────────────────
const ProjectImage = ({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(false)
  return (
    <div className="relative w-full h-full">
      {!loaded && <div className="absolute inset-0 shimmer rounded-none" aria-hidden="true" />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`${className} transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  )
}

// ── Featured (first) project card — full-width hero layout ───────────
const FeaturedCard = ({ name, category, tagline, highlights, stack, image, link }) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="project-card group col-span-full flex flex-col lg:flex-row rounded-3xl overflow-hidden border border-gray-100 bg-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 min-h-[320px]"
  >
    {/* Image — left side on desktop */}
    <div className="relative lg:w-[55%] overflow-hidden bg-slate-900 h-56 lg:h-auto shrink-0">
      <ProjectImage
        src={image}
        alt={name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/0 lg:to-white pointer-events-none" />
      {/* Category badge */}
      <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-heading font-semibold bg-black/70 text-white backdrop-blur-md">
        {category}
      </span>
      {/* Arrow */}
      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
        ↗
      </div>
    </div>

    {/* Content — right side on desktop */}
    <div className="flex flex-col gap-4 p-7 lg:p-10 flex-1 justify-center">
      {/* "Featured Project" label */}
      <span className="text-xs font-heading font-semibold uppercase tracking-[0.2em] text-purple-500">
        ✦ Featured Project
      </span>

      <h3 className="uppercase font-heading font-bold text-2xl lg:text-4xl leading-tight tracking-tight text-black group-hover:text-purple-600 transition-colors">
        {name}
      </h3>

      <p className="text-gray-700 font-medium text-sm lg:text-base leading-relaxed">
        {tagline}
      </p>

      {/* Highlights */}
      {highlights && highlights.length > 0 && (
        <ul className="space-y-2 mt-1">
          {highlights.map((bullet, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
              <span className="text-purple-500 font-bold leading-none mt-1 shrink-0">▸</span>
              <span className="leading-snug">{bullet}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Stack badges */}
      <div className="flex flex-wrap gap-1.5 mt-2">
        {stack.map((tech) => (
          <span
            key={tech}
            className="text-xs font-heading font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200/60"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  </a>
)

// ── Regular project card ─────────────────────────────────────────────
const ProjectCard = ({ name, category, tagline, highlights, stack, image, link }) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="project-card group flex flex-col rounded-3xl overflow-hidden border border-gray-100 bg-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5"
  >
    {/* Image */}
    <div className="overflow-hidden h-52 lg:h-60 relative bg-slate-100">
      <ProjectImage
        src={image}
        alt={name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-heading font-semibold bg-black/70 text-white backdrop-blur-md">
        {category}
      </span>
      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
        ↗
      </div>
    </div>

    {/* Content */}
    <div className="flex flex-col gap-3 p-6 lg:p-7 flex-1">
      <h3 className="uppercase font-heading font-bold text-xl lg:text-2xl leading-tight tracking-tight text-black group-hover:text-purple-600 transition-colors">
        {name}
      </h3>

      <p className="text-gray-700 font-medium text-sm lg:text-base leading-relaxed">
        {tagline}
      </p>

      {highlights && highlights.length > 0 && (
        <ul className="space-y-1.5 text-xs lg:text-sm text-gray-500 my-1">
          {highlights.map((bullet, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-purple-500 font-bold leading-none mt-1 shrink-0">▸</span>
              <span className="leading-snug text-gray-600">{bullet}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-wrap gap-1.5 mt-auto pt-3">
        {stack.map((tech) => (
          <span
            key={tech}
            className="text-xs font-heading font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200/60"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  </a>
)

// ── Page ─────────────────────────────────────────────────────────────
const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory)

  // First card is featured (only in "All" view)
  const featuredProject = activeCategory === 'All' ? filteredProjects[0]   : null
  const restProjects    = activeCategory === 'All' ? filteredProjects.slice(1) : filteredProjects

  return (
    <>
      <div className="bg-white text-black min-h-screen page-enter">
        <div className="main-container py-28">
          <h1 className="text-6xl lg:text-[8vw] font-heading font-bold leading-[1] tracking-tight text-center">
            Projects
          </h1>
          <p className="text-gray-500 text-center text-lg lg:text-xl mt-4 max-w-xl mx-auto">
            A curated collection of frontend platforms, real-time architectures, and interactive web tools.
          </p>

          {/* Category Filter Pills */}
          <div className="flex justify-center items-center gap-3 mt-10 flex-wrap">
            {categories.map((cat) => {
              const count =
                cat === 'All'
                  ? projects.length
                  : projects.filter((p) => p.category === cat).length
              const isActive = activeCategory === cat

              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full font-heading font-medium text-sm lg:text-base transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-black text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Project Grid */}
          <div className="grid md:grid-cols-2 gap-8 mt-12 lg:mt-16">
            {/* Featured card — full-width */}
            {featuredProject && (
              <FeaturedCard key={featuredProject.id} {...featuredProject} />
            )}

            {/* Remaining cards */}
            {restProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>

        </div>
      </div>
      <CTA />
    </>
  )
}

export default Projects