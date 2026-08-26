import React, { createContext, useContext, useState, useCallback } from 'react'

const ToastContext = createContext()

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' })

  const showToast = useCallback((message, type = 'success') => {
    setToast({ show: true, message, type })
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }))
    }, 3000)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast Notification Popup */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-300 transform ${
          toast.show ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 pointer-events-none scale-95'
        }`}
      >
        <div className="flex items-center gap-3 bg-[#1A1A24] border border-white/20 text-white px-5 py-3.5 rounded-2xl shadow-2xl backdrop-blur-xl">
          <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">
            ✓
          </span>
          <span className="text-sm font-medium font-body">{toast.message}</span>
        </div>
      </div>
    </ToastContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
