import React from 'react'
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import NotFound from "./pages/NotFound";
import Footer from './components/Footer'
import ContactModal from './components/ContactModal'
import SmoothScroll from './components/SmoothScroll'
import CustomCursor from './components/CustomCursor'
import { ContactProvider } from './context/ContactContext'
import { ToastProvider } from './context/ToastContext'

const App = () => {
  return (
    <ToastProvider>
      <ContactProvider>
        <SmoothScroll />
        <CustomCursor />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <ContactModal />
      </ContactProvider>
    </ToastProvider>
  )
}

export default App