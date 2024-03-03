import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import environment from '../../config/Config'

const CustomUploadButton = (props) => {
  const [customUploadToken, setCustomUploadToken] = useState('')
  const [file, setFile] = useState(null)

  useEffect(() => {
    getCustomUploadToken()
  }, [])

  const getCustomUploadToken = async () => {
    try {
      const customUploadTokenResponse = await axios.get(environment.GET_CUSTOM_UPLOAD_TOKEN)
      let customToken = customUploadTokenResponse?.data?.customUploadToken
        ? customUploadTokenResponse.data.customUploadToken
        : ''
      setCustomUploadToken(customToken)
    } catch (error) {
      console.log(error)
    }
  }

  const handleOnChange = (event) => {
    event.preventDefault()
    console.log(event.target.files[0], 'Onchange')
    setFile(event.target.files[0])

    const fileName = event.target.files[0].name
    const fileNameElement = document.getElementById('file-name')
    fileNameElement.innerText = fileName
    fileNameElement.classList.remove('hidden')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Get Current Index Video Data
    const videoData = props.currentIndexForm(props.sectionIndex, props.index)

    // Validation on title
    if (!videoData.title) {
      console.log('Please Enter Lecture Title')
      return
    }

    //Create Video
    const options = {
      headers: {
        Authorization: `Bearer ${customUploadToken}`,
      },
    }
    const createVideoResponse = await axios.post(
      environment.API_VIDEO_BASE,
      { title: `${videoData.title}`, public: false },
      { ...options },
    )
    let resVideoId = createVideoResponse?.data?.videoId ? createVideoResponse.data.videoId : ''

    //Upload Video
    const uploadOptions = {
      headers: {
        Authorization: `Bearer ${customUploadToken}`,
        'Content-Type': 'multipart/form-data',
      },
    }
    const formData = new FormData()
    formData.append('file', file)
    const uploadVideoResponse = await axios.post(`${environment.API_VIDEO_BASE}/${resVideoId}/source`, formData, {
      ...uploadOptions,
    })
    if (uploadVideoResponse && uploadVideoResponse.status === 201) {
      props.setVideoId(props.sectionIndex, props.index, resVideoId)
    }
  }

  return (
    <>
      <label
        htmlFor='file-upload'
        className='relative cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center mr-2'>
        <span>Choose File</span>
        <input id='file-upload' type='file' className='hidden' onChange={handleOnChange} />
      </label>
      <span id='file-name' className='hidden'></span>
      <button onClick={handleSubmit} className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded'>
        Upload
      </button>
    </>
  )
}

export default CustomUploadButton
