import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminPanel from './AdminPanel/AdminPanel'
import AddCourse from './AddCourse/AddCourse'
import CoursePage from './CoursePage/CoursePage'
import ViewAllCourses from './ViewAllCourses/ViewAllCourses'
import Homepage from './Homepage/Homepage'
import AboutPage from './About/About'
import ContactPage from './Contact/Contact'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Header from '../Utilities/Header/Header'
import Footer from '../Utilities/Footer/Footer'

const LandingPage = () => {
  return (
    // eslint-disable-next-line no-undef
    <GoogleOAuthProvider clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}>
      <div>
        <Header />
        <Routes>
          <Route path='' element={<Homepage />} />
          <Route path='/add/course' element={<AddCourse />} />
          <Route path='/update/course/:courseId' element={<AddCourse />} />
          <Route path='/admin' element={<AdminPanel />} />
          <Route path='/course/:courseId' element={<CoursePage />} />
          <Route path='/view/all' element={<ViewAllCourses />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/contact' element={<ContactPage />} />
        </Routes>
        <Footer />
      </div>
    </GoogleOAuthProvider>
  )
}

export default LandingPage
