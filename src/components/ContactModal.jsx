import React, { useState, useEffect } from 'react'
import { useContact } from '../context/ContactContext'

const ContactModal = () => {
  const { isContactOpen, closeContact } = useContact()

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  })

  const [status, setStatus] = useState({ submitted: false, loading: false })

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isContactOpen) {
        closeContact()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isContactOpen, closeContact])

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isContactOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isContactOpen])

  if (!isContactOpen) return null

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Build mailto with pre-filled content
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`)
    const body = encodeURIComponent(
      `Name: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )
    const mailtoUrl = `mailto:digvijaywadekar350@gmail.com?subject=${subject}&body=${body}`
    
    // Trigger immediately inside the user click/submit context
    const link = document.createElement('a')
    link.href = mailtoUrl
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    setStatus({ submitted: true, loading: false })
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity duration-300 overflow-y-auto"
      onClick={closeContact}
    >
      <div
        className="relative w-full max-w-2xl bg-[#121217] border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl text-white my-8 transition-transform duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeContact}
          aria-label="Close modal"
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {/* Header matching screenshot */}
        <div className="text-center mb-6 pb-6 border-b border-white/10">
          <h2 className="text-3xl sm:text-5xl font-heading font-bold tracking-tight mb-2">
            Contact
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-md mx-auto">
            Get in touch with me. I will get back to you as soon as possible.
          </p>
        </div>

        {/* Subheader */}
        <div className="mb-6">
          <h3 className="font-heading font-semibold text-lg sm:text-xl text-white">
            Send me a message
          </h3>
          <p className="text-gray-400 text-xs sm:text-sm mt-0.5">
            Fill out the form below and I will get back to you as soon as possible.
          </p>
        </div>

        {/* Success message */}
        {status.submitted ? (
          <div className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 rounded-2xl p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center text-2xl font-bold mb-3">
              ✓
            </div>
            <h4 className="font-heading font-bold text-lg text-white mb-1">Message Ready!</h4>
            <p className="text-sm text-gray-300">
              Opening your email client to send your message to Digvijay. Thank you for reaching out!
            </p>
            <button
              onClick={closeContact}
              className="mt-5 px-6 py-2 rounded-full bg-white text-black font-heading font-semibold text-sm hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          /* Form matching screenshot */
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Row 1: Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-xs sm:text-sm font-medium text-gray-300">
                  Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-[#1A1A22] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-sm sm:text-base"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs sm:text-sm font-medium text-gray-300">
                  Phone <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="+91 (123) 456-7890"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-[#1A1A22] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Row 2: Email */}
            <div className="flex flex-col gap-2">
              <label className="text-xs sm:text-sm font-medium text-gray-300">
                Email <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-[#1A1A22] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-sm sm:text-base"
              />
            </div>

            {/* Row 3: Message */}
            <div className="flex flex-col gap-2">
              <label className="text-xs sm:text-sm font-medium text-gray-300">
                Message <span className="text-rose-500">*</span>
              </label>
              <textarea
                name="message"
                required
                rows={4}
                placeholder="Tell me about your project or just say hello..."
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-[#1A1A22] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-sm sm:text-base resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="mt-2 flex justify-end">
              <button
                type="submit"
                disabled={status.loading}
                className="btn uppercase font-heading border-2 border-transparent text-center min-w-[205px] px-8 py-3 rounded-full text-sm sm:text-base font-semibold cursor-pointer disabled:opacity-50"
              >
                {status.loading ? 'Sending...' : 'Send Message →'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default ContactModal
