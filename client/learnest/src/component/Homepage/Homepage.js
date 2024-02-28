import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import EmblaCarousel from '../../Utilities/Carousel/EmblaCarousel'
import { googleLogout, useGoogleLogin } from '@react-oauth/google'
import './Homepage.css'
import { SLIDES, OPTIONS } from '../../config/Const'
import environment from '../../config/Config'

const Homepage = () => {
  const [profile, setProfile] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)
  let navigate = useNavigate()

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log(codeResponse, 'Initial Login')
      localStorage.setItem('accessToken', codeResponse.access_token)
      setLoggedIn(true)
    },
    onError: (error) => console.log('Login Failed:', error),
  })

  useEffect(() => {
    if (loggedIn) {
      axios
        .get(`${environment.GOOGLE_USER_INFO}${localStorage.getItem('accessToken')}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            Accept: 'application/json',
          },
        })
        .then((res) => {
          setProfile(res.data)
        })
        .catch((err) => {
          setProfile(null)
          console.log(err)
        })
    }
  }, [loggedIn])

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      setLoggedIn(true) // User is logged in
    }
  })

  // Log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout()
    setProfile(null)
    localStorage.removeItem('accessToken')
    setLoggedIn(false)
  }

  const loginSection = () => {
    if (loggedIn) {
      return (
        <li>
          <a className='logout-btn' onClick={() => logOut()}>
            {profile?.name[0]}
          </a>
        </li>
      )
    } else {
      return (
        <li>
          <a className='login-btn' onClick={() => login()}>
            Login
          </a>
        </li>
      )
    }
  }

  return (
    <div className='App'>
      <header>
        <nav>
          <div className='container'>
            <h1>Learnest</h1>
            <ul className='rightNav'>
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
              {loginSection()}
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

      <footer>
        <div className='container'>
          <p>&copy; 2024 Course Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Homepage
