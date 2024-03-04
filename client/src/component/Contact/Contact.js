import React, { useState } from 'react'

const ContactPage = () => {
  const [message, setMessage] = useState('')

  const handleSendMessage = () => {
    // Replace 'your-email@example.com' with the desired recipient email address
    const recipientEmail = 'your-email@example.com'

    // Trigger email sending
    window.location.href = `mailto:${recipientEmail}?subject=Learnest Contact Section&body=${encodeURIComponent(message)}`
  }

  return (
    <div className='bg-gray-100 min-h-screen'>
      <div className='container mx-auto py-12'>
        <h1 className='text-3xl font-bold text-center mb-8'>Contact Us</h1>
        <div className='max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg'>
          <textarea
            className='w-full border border-gray-300 rounded-lg p-2 mb-4'
            placeholder='Enter your message'
            rows='4'
            value={message}
            onChange={(e) => setMessage(e.target.value)}></textarea>
          <button
            className='w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'
            onClick={handleSendMessage}>
            Send Mail
          </button>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
