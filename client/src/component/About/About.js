import React from 'react'

const AboutPage = () => {
  return (
    <div className='bg-gray-100 min-h-screen'>
      <div className='container mx-auto py-12'>
        <h1 className='text-3xl font-bold text-center mb-8'>About Us</h1>
        <div className='max-w-2xl mx-auto text-lg text-gray-700'>
          <p>
            Welcome to our platform! We are dedicated to providing exclusive premium content for upskilling online. Our
            platform connects students with their favorite instructors, offering a wide range of courses across various
            domains.
          </p>
          <p className='mt-4'>
            Whether you&apos;re looking to improve your professional skills, dive into a new hobby, or explore advanced
            topics, we have something for everyone. Our mission is to empower individuals to achieve their learning
            goals and enhance their careers through high-quality, engaging, and accessible education.
          </p>
          <p className='mt-4'>
            Join us on this journey of continuous learning and skill development. Let&apos;s unlock your full potential
            together!
          </p>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
