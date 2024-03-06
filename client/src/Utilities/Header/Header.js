import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { googleLogout, useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import environment from '../../config/Config'
import './Header.css'

const Header = () => {
  let navigate = useNavigate()
  const [profile, setProfile] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

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

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log(codeResponse, 'Initial Login')
      localStorage.setItem('accessToken', codeResponse.access_token)
      setLoggedIn(true)
      setIsOpen(false)
    },
    onError: (error) => console.log('Login Failed:', error),
  })

  const loginSection = () => {
    if (loggedIn) {
      return (
        <li>
          <a onClick={toggleDropdown} className='logout-sec'>
            {profile?.name[0]}
          </a>
          {showLogoutDropdown()}
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

  const showLogoutDropdown = () => {
    if (isOpen) {
      return (
        <div className='dropdownMenu'>
          <div className='triangle-up'></div>
          <button className='logout-btn' onClick={() => logOut()}>
            Logout
          </button>
        </div>
      )
    }
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  // Log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout()
    setProfile(null)
    localStorage.removeItem('accessToken')
    setLoggedIn(false)
  }

  return (
    <div className='container mx-auto flex justify-between items-center py-4'>
      <h1
        className='text-2xl font-bold cursor-pointer'
        onClick={() => {
          navigate('')
        }}>
        Learnest
      </h1>
      <ul className='flex items-center space-x-4'>
        <li>
          <a
            onClick={() => {
              navigate('/about')
            }}
            className='text-gray-800 hover:text-gray-600 cursor-pointer'>
            About
          </a>
        </li>
        <li>
          <a
            onClick={() => {
              navigate('/contact')
            }}
            className='text-gray-800 hover:text-gray-600 cursor-pointer'>
            Contact
          </a>
        </li>
        <li>
          <a
            href=''
            onClick={() => {
              navigate('/admin')
            }}
            className='text-gray-800 hover:text-gray-600'>
            Admin panel
          </a>
        </li>
        {loginSection()}
      </ul>
    </div>
  )
}

export default Header
