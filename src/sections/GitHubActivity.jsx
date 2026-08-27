import React, { useEffect, useState } from 'react'

const fallbackRepos = [
  {
    id: 1,
    name: 'mini-kubernetes',
    description: 'Kubernetes-inspired container orchestrator in Go — API server, scheduler, worker agents, health checks, and a kubectl-like CLI using gRPC and the Docker API.',
    language: 'Go',
    stars: 3,
    forks: 0,
    html_url: 'https://github.com/Digvijaywadekar2004',
  },
  {
    id: 2,
    name: 'portfolio',
    description: 'Modern developer portfolio built with React 19, Vite, Tailwind CSS v4, GSAP animations, and interactive UX components.',
    language: 'JavaScript',
    stars: 1,
    forks: 0,
    html_url: 'https://github.com/Digvijaywadekar2004/portfolio',
  },
  {
    id: 3,
    name: 'password-strength-indicator',
    description: 'Real-time password strength meter and validator with color-coded feedback and live rule verification.',
    language: 'JavaScript',
    stars: 2,
    forks: 0,
    html_url: 'https://github.com/Digvijaywadekar2004/password-strength-indicator',
  },
]

const languageColors = {
  Go:               '#00ADD8',
  JavaScript:       '#F7DF1E',
  TypeScript:       '#3178C6',
  Python:           '#3776AB',
  HTML:             '#E34F26',
  CSS:              '#1572B6',
  React:            '#61DAFB',
  'React / Node.js':'#61DAFB',
}

// Accent colors and icons per stat card
const statCards = [
  {
    key: 'repos',
    label: 'Public Repos',
    accentColor: '#7B2FF7',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 7C3 5.9 3.9 5 5 5H19C20.1 5 21 5.9 21 7V17C21 18.1 20.1 19 19 19H5C3.9 19 3 18.1 3 17V7Z" stroke="#7B2FF7" strokeWidth="1.5"/>
        <path d="M8 12H16M8 9H12" stroke="#7B2FF7" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    key: 'followers',
    label: 'Followers',
    accentColor: '#FF4D6D',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="9" cy="7" r="3.5" stroke="#FF4D6D" strokeWidth="1.5"/>
        <path d="M2 20C2 16.686 5.134 14 9 14" stroke="#FF4D6D" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M16 14L19 17L22 14" stroke="#FF4D6D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M19 17V11" stroke="#FF4D6D" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    key: 'status',
    label: 'Status',
    accentColor: '#10B981',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2Z" stroke="#10B981" strokeWidth="1.5"/>
        <path d="M8 12L11 15L16 9" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    key: 'stack',
    label: 'Primary Stack',
    accentColor: '#2F86F7',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L20 7V17L12 22L4 17V7L12 2Z" stroke="#2F86F7" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M12 12L20 7M12 12V22M12 12L4 7" stroke="#2F86F7" strokeWidth="1.5"/>
      </svg>
    ),
  },
]

// SVG icon for stars
const StarIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
  </svg>
)

// SVG icon for forks
const ForkIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/>
    <path d="M6 9v2c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V9"/>
    <line x1="12" y1="12" x2="12" y2="15"/>
  </svg>
)

const GitHubActivity = () => {
  const [profile, setProfile] = useState({
    public_repos: 12,
    followers: 5,
    avatar_url: 'https://github.com/Digvijaywadekar2004.png',
  })
  const [repos, setRepos] = useState(fallbackRepos)

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch('https://api.github.com/users/Digvijaywadekar2004'),
          fetch('https://api.github.com/users/Digvijaywadekar2004/repos?sort=updated&per_page=3'),
        ])

        if (profileRes.ok) {
          const profileData = await profileRes.json()
          setProfile((prev) => ({
            ...prev,
            public_repos: profileData.public_repos ?? prev.public_repos,
            followers: profileData.followers ?? prev.followers,
            avatar_url: profileData.avatar_url ?? prev.avatar_url,
          }))
        }

        if (reposRes.ok) {
          const reposData = await reposRes.json()
          if (Array.isArray(reposData) && reposData.length > 0) {
            setRepos(reposData.slice(0, 3))
          }
        }
      } catch (err) {
        console.warn('Using offline GitHub stats fallback:', err)
      }
    }

    fetchGitHubData()
  }, [])

  const statValues = {
    repos:     profile.public_repos,
    followers: profile.followers,
    status:    'Active',
    stack:     'React • Go • Node',
  }

  return (
    <section className="bg-black text-white py-20 lg:py-28 border-t border-white/10 relative overflow-hidden">
      <div className="main-container">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <span className="text-gray-400 font-heading uppercase text-sm tracking-widest block mb-2">
              Open Source &amp; Code
            </span>
            <h2 className="text-4xl lg:text-5xl font-heading font-bold tracking-tight">
              GitHub <span className="text-stroke">Activity</span>
            </h2>
          </div>

          <a
            href="https://github.com/Digvijaywadekar2004"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/20 hover:border-white text-sm font-heading font-semibold hover:bg-white hover:text-black transition-all duration-300"
          >
            <span>@Digvijaywadekar2004</span>
            <span>↗</span>
          </a>
        </div>

        {/* Top Stats Banner — each card has unique accent color */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {statCards.map(({ key, label, accentColor, icon }) => (
            <div
              key={key}
              className="bg-[#121217] border border-white/10 rounded-2xl p-5 flex flex-col gap-2 hover:border-white/25 hover:scale-[1.02] transition-all duration-300 relative overflow-hidden group"
            >
              {/* Subtle accent glow top line */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl opacity-70 group-hover:opacity-100 transition-opacity"
                style={{ background: accentColor }}
                aria-hidden="true"
              />
              <div className="flex items-center gap-2">
                {icon}
                <span className="text-gray-400 text-xs font-medium uppercase tracking-wider">{label}</span>
              </div>
              {key === 'status' ? (
                <span className="text-emerald-400 text-sm font-semibold flex items-center gap-2 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
                  Active
                </span>
              ) : key === 'stack' ? (
                <span className="text-sm font-bold mt-0.5" style={{ color: accentColor }}>
                  React • Go • Node
                </span>
              ) : (
                <span className="text-3xl font-heading font-bold text-white stat-number">
                  {statValues[key]}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Recent Repos Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {repos.map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[#121217] border border-white/10 hover:border-purple-500/50 rounded-2xl p-6 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 shadow-xl"
            >
              <div>
                {/* Repo Name */}
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-heading font-bold text-lg text-white group-hover:text-purple-400 transition-colors truncate">
                    {repo.name}
                  </h3>
                  <span className="text-gray-500 text-sm group-hover:text-white transition-colors shrink-0 ml-2">↗</span>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed line-clamp-3 mb-4">
                  {repo.description || 'Modern frontend & web application repository.'}
                </p>
              </div>

              {/* Language & Stats */}
              <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs text-gray-400">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: languageColors[repo.language] || '#9333EA' }}
                  />
                  <span>{repo.language || 'JavaScript'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <StarIcon /> {repo.stargazers_count ?? repo.stars ?? 0}
                  </span>
                  <span className="flex items-center gap-1">
                    <ForkIcon /> {repo.forks_count ?? repo.forks ?? 0}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  )
}

export default GitHubActivity
