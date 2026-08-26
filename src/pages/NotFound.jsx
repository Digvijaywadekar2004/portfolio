import React from 'react'
import GradientButton from '../components/GradientButton'

const NotFound = () => {
  return (
    <div className='min-h-screen bg-white text-black flex flex-col items-center justify-center gap-6 px-4'>
      <h1 className='text-[20vw] font-heading font-bold leading-none text-stroke-dark tracking-tight select-none'>
        404
      </h1>
      <p className='font-heading text-2xl lg:text-3xl font-semibold text-center'>
        Page not found
      </p>
      <p className='text-gray-500 text-lg text-center max-w-md'>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <GradientButton text="Back to Home" link="/" className="btn-light mt-4" />
    </div>
  )
}

export default NotFound
