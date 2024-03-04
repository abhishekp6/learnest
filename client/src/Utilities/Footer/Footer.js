import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-gray-900 text-gray-300 py-4'>
      <div className='container mx-auto text-center'>
        <p className='text-sm'>© {new Date().getFullYear()} Learnest. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
