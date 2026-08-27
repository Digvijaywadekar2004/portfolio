import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from './components/Navbar'
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import NotFound from "./pages/NotFound";
import Footer from './components/Footer'
import ContactModal from './components/ContactModal'
import SmoothScroll from './components/SmoothScroll'
import CustomCursor from './components/CustomCursor'
import BackToTop from './components/BackToTop'
import { ContactProvider } from './context/ContactContext'
import { ToastProvider } from './context/ToastContext'

// Scroll to top on every route change
const ScrollToTopOnNav = () => {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

const App = () => {
  return (
    <ToastProvider>
      <ContactProvider>
        <SmoothScroll />
        <CustomCursor />
        <Navbar />
        <ScrollToTopOnNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <ContactModal />
        <BackToTop />
      </ContactProvider>
    </ToastProvider>
  )
}

export default App