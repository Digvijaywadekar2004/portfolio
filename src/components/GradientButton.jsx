import React from 'react'
import { Link } from 'react-router-dom'

const FILE_EXT = /\.(pdf|jpg|jpeg|png|webp|svg|zip)$/i

const GradientButton = ({ text, link, onClick, type = "button", className = "" }) => {
  const cls = `btn uppercase font-heading border-2 border-transparent text-center min-w-[205px] px-12 py-2 lg:py-3 rounded-full max-sm:text-lg ${className}`

  // 0. If onClick is provided, render a native <button>
  if (onClick) {
    return (
      <button type={type} onClick={onClick} className={cls}>
        {text}
      </button>
    )
  }

  // 1. External / protocol links  →  plain <a> new tab
  if (link?.startsWith('http') || link?.startsWith('//')) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className={cls}>
        {text}
      </a>
    )
  }

  // 2. mailto: or tel: links  →  plain native <a>, no JS, let browser handle it
  if (link?.startsWith('mailto:') || link?.startsWith('tel:')) {
    return (
      <a href={link} className={cls}>
        {text}
      </a>
    )
  }

  // 3. File paths (.pdf, .png, .zip …)  →  plain <a> new tab
  if (link && FILE_EXT.test(link)) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className={cls}>
        {text}
      </a>
    )
  }

  // 4. Internal SPA routes  →  React Router <Link>
  return (
    <Link to={link ?? '/'} className={cls}>
      {text}
    </Link>
  )
}

export default GradientButton