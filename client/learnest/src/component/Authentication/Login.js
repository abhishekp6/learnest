import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { googleLogout, useGoogleLogin } from '@react-oauth/google'
import './Login.css'

const Login = () => {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse)
      console.log(codeResponse, 'Initial Login')
      localStorage.setItem('accessToken', user.access_token)
    },
    onError: (error) => console.log('Login Failed:', error),
  })

  useEffect(() => {
    if (user) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
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
  }, [user])

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout()
    setProfile(null)
    localStorage.removeItem('accessToken')
  }

  return (
    <div className='loginComponent'>
      {profile ? (
        <div>
          <img src={profile.picture} alt='user' />
          <p>Name: {profile.name}</p>
          <p>Email Address: {profile.email}</p>
          <br />
          <br />
          <button onClick={logOut}>Log out</button>
        </div>
      ) : (
        <div className='login-container'>
          <div className='login-box'>
            <h2>Lets get you going!</h2>
            <button className='google-login-btn' onClick={() => login()}>
              Login with Google 🚀
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
export default Login
