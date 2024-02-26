import React from 'react'
import { useNavigate } from 'react-router-dom'
import EmblaCarousel from '../../Utilities/Carousel/EmblaCarousel'
import './Homepage.css'

const Homepage = () => {
  let navigate = useNavigate()
  const OPTIONS = {
    align: 'start',
    loop: true,
    containScroll: 'keepSnaps',
    dragFree: true,
  }
  const SLIDES = [
    'https://img-b.udemycdn.com/course/240x135/625204_436a_3.jpg',
    'https://img-b.udemycdn.com/course/240x135/1565838_e54e_18.jpg',
    'https://img-b.udemycdn.com/course/240x135/965528_737d_7.jpg',
    'https://img-b.udemycdn.com/course/240x135/625204_436a_3.jpg',
    'https://img-b.udemycdn.com/course/240x135/1565838_e54e_18.jpg',
    'https://img-b.udemycdn.com/course/240x135/965528_737d_7.jpg',
    'https://img-b.udemycdn.com/course/240x135/625204_436a_3.jpg',
    'https://img-b.udemycdn.com/course/240x135/1565838_e54e_18.jpg',
    'https://img-b.udemycdn.com/course/240x135/965528_737d_7.jpg',
  ]

  return (
    <div className='App'>
      <header>
        <nav>
          <div className='container'>
            <h1>Learnest</h1>
            <ul>
              <li>
                <a href=''>About</a>
              </li>
              <li>
                <a href=''>Contact</a>
              </li>
              <li>
                <a
                  href=''
                  onClick={() => {
                    navigate('/admin')
                  }}>
                  Admin panel
                </a>
              </li>
              <li>
                <a
                  href=''
                  onClick={() => {
                    navigate('/login')
                  }}>
                  Login
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>

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
          <img src='https://img-b.udemycdn.com/course/240x135/625204_436a_3.jpg' alt='Image 1' className='image' />
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
          <img src='https://img-b.udemycdn.com/course/240x135/1565838_e54e_18.jpg' alt='Image 2' className='image' />
        </div>
        <div className='section'>
          <img src='https://img-b.udemycdn.com/course/240x135/965528_737d_7.jpg' alt='Image 3' className='image' />
          <div className='text'>
            <h3>Expert Instructors</h3>
            <p>Learn from the best with our team of experienced instructors.</p>
          </div>
        </div>
      </div>

      <footer>
        <div className='container'>
          <p>&copy; 2024 Course Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Homepage
