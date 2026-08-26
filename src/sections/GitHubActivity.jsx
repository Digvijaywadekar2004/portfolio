import React, { useEffect, useState } from 'react'

const fallbackRepos = [
  {
    id: 1,
    name: 'portfolio',
    description: 'Modern developer portfolio built with React 19, Vite, Tailwind CSS v4, GSAP, and interactive UX.',
    language: 'JavaScript',
    stars: 1,
    forks: 0,
    html_url: 'https://github.com/Digvijaywadekar2004/portfolio',
  },
  {
    id: 2,
    name: 'password-strength-indicator',
    description: 'Real-time password strength meter and validator with color-coded feedback and live rule verification.',
    language: 'JavaScript',
    stars: 2,
    forks: 0,
    html_url: 'https://github.com/Digvijaywadekar2004/password-strength-indicator',
  },
  {
    id: 3,
    name: 'telemetry-dashboard',
    description: 'Vehicle telemetry dashboard with low-latency WebSocket data streaming and diagnostic charts.',
    language: 'React / Node.js',
    stars: 3,
    forks: 1,
    html_url: 'https://github.com/Digvijaywadekar2004',
  },
]

const languageColors = {
  JavaScript: '#F7DF1E',
  TypeScript: '#3178C6',
  Python: '#3776AB',
  HTML: '#E34F26',
  CSS: '#1572B6',
  React: '#61DAFB',
  'React / Node.js': '#61DAFB',
}

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
        // Graceful fallback to cached data
        console.warn('Using offline GitHub stats fallback:', err)
      }
    }

    fetchGitHubData()
  }, [])

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

        {/* Top Stats Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#121217] border border-white/10 rounded-2xl p-5 flex flex-col gap-1">
            <span className="text-gray-400 text-xs font-medium uppercase tracking-wider">Public Repos</span>
            <span className="text-3xl font-heading font-bold text-white">{profile.public_repos}</span>
          </div>

          <div className="bg-[#121217] border border-white/10 rounded-2xl p-5 flex flex-col gap-1">
            <span className="text-gray-400 text-xs font-medium uppercase tracking-wider">Followers</span>
            <span className="text-3xl font-heading font-bold text-white">{profile.followers}</span>
          </div>

          <div className="bg-[#121217] border border-white/10 rounded-2xl p-5 flex flex-col gap-1">
            <span className="text-gray-400 text-xs font-medium uppercase tracking-wider">Status</span>
            <span className="text-emerald-400 text-sm font-semibold flex items-center gap-2 mt-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Active
            </span>
          </div>

          <div className="bg-[#121217] border border-white/10 rounded-2xl p-5 flex flex-col gap-1">
            <span className="text-gray-400 text-xs font-medium uppercase tracking-wider">Primary Stack</span>
            <span className="text-sm font-bold text-purple-400 mt-1">React • Node • TS</span>
          </div>
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
                  <span className="text-gray-500 text-sm group-hover:text-white transition-colors">↗</span>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed line-clamp-3 mb-4">
                  {repo.description || 'Modern full-stack web application repository.'}
                </p>
              </div>

              {/* Language & Stats */}
              <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs text-gray-400">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: languageColors[repo.language] || '#9333EA' }}
                  />
                  <span>{repo.language || 'JavaScript'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span>⭐ {repo.stargazers_count ?? repo.stars ?? 0}</span>
                  <span>🍴 {repo.forks_count ?? repo.forks ?? 0}</span>
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
