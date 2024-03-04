import React from 'react'
import { useNavigate } from 'react-router-dom'
import EmblaCarousel from '../../Utilities/Carousel/EmblaCarousel'
import './Homepage.css'
import { SLIDES, OPTIONS } from '../../config/Const'

const Homepage = () => {
  const navigate = useNavigate()
  return (
    <div className='App'>
      <section className='hero'>
        <div className='container'>
          <h2>Learn Anything, Anytime, Anywhere</h2>
          <p>Take your skills to the next level with our wide range of courses.</p>
          <a
            href=''
            onClick={() => {
              navigate('/view/all')
            }}
            className='btn btn-primary'>
            Browse Courses
          </a>
        </div>
      </section>

      <div>
        <div className='midHead'>
          <h3>Featured Courses</h3>
        </div>
        <div className='carousel'>
          <EmblaCarousel slides={SLIDES} options={OPTIONS} />
        </div>
      </div>

      <div className='body-section'>
        <h2 className='section-header'>Why Choose Us</h2>
        <div className='section'>
          <img src={SLIDES[0]} alt='Image 1' className='image' />
          <div className='text'>
            <h3>Quality Content</h3>
            <p>Our courses offer top-notch content curated by industry experts.</p>
          </div>
        </div>
        <div className='section'>
          <div className='text'>
            <h3>Flexible Learning</h3>
            <p>Learn at your own pace with our flexible scheduling options.</p>
          </div>
          <img src={SLIDES[1]} alt='Image 2' className='image' />
        </div>
        <div className='section'>
          <img src={SLIDES[2]} alt='Image 3' className='image' />
          <div className='text'>
            <h3>Expert Instructors</h3>
            <p>Learn from the best with our team of experienced instructors.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Homepage
