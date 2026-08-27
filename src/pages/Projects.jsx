import React, { useState } from 'react'
import projects from '../components/projectsData'
import CTA from '../components/CTA'

const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))]

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory)

  return (
    <>
      <div className="bg-white text-black min-h-screen">
        <div className="main-container py-28">
          <h1 className="text-6xl lg:text-[8vw] font-heading font-bold leading-[1] tracking-tight text-center">
            Projects
          </h1>
          <p className="text-gray-500 text-center text-lg lg:text-xl mt-4 max-w-xl mx-auto">
            A curated collection of systems architectures, full-stack platforms, and interactive engineering tools.
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
            {filteredProjects.map(({ id, name, category, tagline, highlights, stack, image, link }) => (
              <a
                key={id}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col rounded-3xl overflow-hidden border border-gray-100 bg-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5"
              >
                {/* Image */}
                <div className="overflow-hidden h-52 lg:h-64 aspect-video relative bg-slate-900">
                  <img
                    src={image}
                    alt={name}
                    width={500}
                    height={280}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-heading font-semibold bg-black/70 text-white backdrop-blur-md">
                    {category}
                  </span>
                  {/* Top-Right Link Arrow */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
                    ↗
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-3 p-6 lg:p-8 flex-1">
                  {/* Name */}
                  <h3 className="uppercase font-heading font-bold text-xl lg:text-2xl leading-tight tracking-tight text-black group-hover:text-purple-600 transition-colors">
                    {name}
                  </h3>

                  {/* Tagline */}
                  <p className="text-gray-700 font-medium text-sm lg:text-base leading-relaxed">
                    {tagline}
                  </p>

                  {/* Highlights / Features */}
                  {highlights && highlights.length > 0 && (
                    <ul className="space-y-1.5 text-xs lg:text-sm text-gray-500 my-2">
                      {highlights.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-purple-500 font-bold leading-none mt-1">▸</span>
                          <span className="leading-snug text-gray-600">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Stack badges */}
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
            ))}
          </div>

        </div>
      </div>
      <CTA />
    </>
  )
}

export default Projects