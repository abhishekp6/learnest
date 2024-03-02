import React from 'react'
import './AdminPanel.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import environment from '../../config/Config'
import axios from 'axios'

const AdminPanel = () => {
  const [courseIdUpdate, setCourseIdUpdate] = useState('')
  const [courseIdDelete, setCourseIdDelete] = useState('')
  const navigate = useNavigate()

  const navigateTo = (param) => {
    navigate(param)
  }

  const routeToUpdate = () => {
    navigate(`/update/course/${courseIdUpdate}`)
  }

  const deleteCourse = async () => {
    let deleteUrl = `${environment.DELETE_COURSE}${courseIdDelete}`
    let deleteResponse = await axios.delete(deleteUrl)
    console.log(deleteResponse)
  }

  const onInputChange = (event, param) => {
    event.preventDefault()
    switch (param) {
      case 'update':
        setCourseIdUpdate(event.target.value)
        break
      case 'delete':
        setCourseIdDelete(event.target.value)
        break
      default:
        break
    }
  }

  return (
    <div className='adminContainer'>
      <div className='adminNavbar'>Welcome to Admin&apos;s Den</div>
      <div className='admin-center'>
        <div>
          <button
            onClick={() => {
              navigateTo('/view/all')
            }}
            className='bg-blue-500 hover:bg-blue-700 text-white font-light py-2 px-4 rounded'>
            View All Courses
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              navigateTo('/add/course')
            }}
            className='bg-blue-500 hover:bg-blue-700 text-white font-light py-2 px-4 rounded mt-4'>
            Add New Course
          </button>
        </div>
        <div>
          <form onSubmit={routeToUpdate} className='flex justify-center mt-4'>
            <input
              value={courseIdUpdate}
              onChange={(event) => {
                onInputChange(event, 'update')
              }}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-sm p-2.5 ml-auto mr-2'></input>
            <button
              type='submit'
              className='bg-blue-500 hover:bg-blue-700 text-white font-light py-2 px-4 rounded mr-auto'>
              Update Course
            </button>
          </form>
        </div>
        <div className='flex justify-center mt-4'>
          <input
            value={courseIdDelete}
            onChange={(event) => {
              onInputChange(event, 'delete')
            }}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-sm p-2.5 ml-auto mr-2'></input>
          <button
            onClick={() => {
              deleteCourse()
            }}
            className='bg-blue-500 hover:bg-blue-700 text-white font-light py-2 px-5 rounded mr-auto'>
            Delete Course
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminPanel
