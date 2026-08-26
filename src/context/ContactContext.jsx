import React, { createContext, useContext, useState } from 'react'

const ContactContext = createContext()

export const ContactProvider = ({ children }) => {
  const [isContactOpen, setIsContactOpen] = useState(false)

  const openContact = () => setIsContactOpen(true)
  const closeContact = () => setIsContactOpen(false)

  return (
    <ContactContext.Provider value={{ isContactOpen, openContact, closeContact }}>
      {children}
    </ContactContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useContact = () => {
  const context = useContext(ContactContext)
  if (!context) {
    throw new Error('useContact must be used within a ContactProvider')
  }
  return context
}
