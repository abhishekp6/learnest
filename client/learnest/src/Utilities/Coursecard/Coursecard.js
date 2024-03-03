import React from 'react'
import './Coursecard.css'

const Coursecard = (props) => {
  return (
    <div className='mb-4 bg-white shadow-lg rounded-lg overflow-hidden w-full flex'>
      {props.data.courseImage ? (
        <div className='w-1/3'>
          <img src={props.data.courseImage} alt={props.data.courseTitle} className='w-full h-full object-cover' />
        </div>
      ) : (
        <div className='w-1/3 flex items-center justify-center bg-gray-200'>
          <span className='text-gray-500'>No Image</span>
        </div>
      )}
      <div className='w-2/3 p-4'>
        <h3 className='text-xl mb-2'>{props.data.courseTitle}</h3>
        <p className='text-gray-700 mb-2'>{props.data.courseOverView}</p>
        <p className='text-gray-700'>Price: {props.data.coursePrice} $</p>
      </div>
    </div>
  )
}

export default Coursecard
