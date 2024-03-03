import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import environment from '../../config/Config'
import Coursecard from '../../Utilities/Coursecard/Coursecard'
import { useNavigate } from 'react-router-dom'

const ViewAllCourses = () => {
  const [courseData, setCourseData] = useState([])
  const navigateTo = useNavigate()

  const getAllCourseData = async () => {
    let url = environment.GET_ALL_COURSE
    let courseDataRes = await axios.get(url)
    console.log(courseDataRes.data.data, 'COURSEDATA')
    setCourseData(courseDataRes.data.data)
    console.log(courseData, 'COURSEDATA')
  }

  useEffect(() => {
    getAllCourseData()
  }, [])

  return (
    <div className='ml-6 mr-6'>
      <div className='bg-blue-500 text-white py-4 px-6 rounded-t-lg mb-8 mt-6 text-center'>
        <h2 className='text-4xl mb-2'>Course Catalog</h2>
      </div>
      <div>
        {courseData.map((course) => {
          return (
            <div
              key={course._id}
              className='hover:cursor-pointer'
              onClick={() => {
                navigateTo(`/course/${course.courseId}`)
              }}>
              <Coursecard data={course} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ViewAllCourses
