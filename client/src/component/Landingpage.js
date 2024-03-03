import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminPanel from './AdminPanel/AdminPanel'
import AddCourse from './AddCourse/AddCourse'
import CoursePage from './CoursePage/CoursePage'
import ViewAllCourses from './ViewAllCourses/ViewAllCourses'
import Homepage from './Homepage/Homepage'
import { GoogleOAuthProvider } from '@react-oauth/google'
import config from '../config/SecretConfig'
import Header from '../Utilities/Header/Header'

const LandingPage = () => {
  return (
    <GoogleOAuthProvider clientId={config.OAUTH_CLIENT_ID}>
      <div>
        <Header />
        <Routes>
          <Route path='' element={<Homepage />} />
          <Route path='/add/course' element={<AddCourse />} />
          <Route path='/update/course/:courseId' element={<AddCourse />} />
          <Route path='/admin' element={<AdminPanel />} />
          <Route path='/course/:courseId' element={<CoursePage />} />
          <Route path='/view/all' element={<ViewAllCourses />} />
        </Routes>
      </div>
    </GoogleOAuthProvider>
  )
}

export default LandingPage
