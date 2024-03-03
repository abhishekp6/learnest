/* eslint-disable react/jsx-key */
import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import CheckIcon from '@mui/icons-material/Check'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import environment from '../../config/Config'
import config from '../../config/SecretConfig'
import './CoursePage.css'

import Popup from '../../Utilities/Popup/Popup'

const CoursePage = () => {
  let { courseId } = useParams()
  const [courseData, setCourseData] = useState({})
  const [videoId, setVideoId] = useState('')
  const [openPopup, setOpenPopup] = useState(false)

  const getData = async () => {
    console.log('HERE')
    // Get Course Data by Course ID
    let getCourseURL = `${environment.GET_COURSE_BY_ID}${courseId}`
    let courseDataRes = await axios.get(getCourseURL)
    setCourseData(courseDataRes.data)
    console.log(courseDataRes.data, 'COURSEDATA_RES')
    // Get Video URL
    /* Step 1: Get Token */
    await axios.get(environment.GET_CUSTOM_UPLOAD_TOKEN)
    /* Step 1: Get Video URL By Id */
  }

  const setRazorpayEnv = () => {
    const script = document.createElement('script')
    script.src = environment.RAZORPAY_CHECKOUT
    script.async = true
    document.body.appendChild(script)
  }

  useEffect(() => {
    console.log(`${environment.GET_COURSE_BY_ID}${courseId}`, 'HERE')
    getData()
    setRazorpayEnv()
  }, [])

  const setPopupData = (videoId) => {
    setVideoId(videoId)
    setOpenPopup(true)
  }

  const closePopup = () => {
    setOpenPopup(false)
  }

  const intiatePayment = async () => {
    console.log('Payment_Initiated_with_Amount', courseData?.coursePrice)
    let amountInPaisa = courseData?.coursePrice ? courseData?.coursePrice * 100 : 0

    const options = {
      key: config.RAZORPAY_KEY_ID,
      amount: 0,
      name: '',
      description: '',
      order_id: '',
      handler: function (response) {
        console.log(response)
        var values = {
          razorpay_signature: response.razorpay_signature,
          razorpay_order_id: response.razorpay_order_id,
          transactionid: response.razorpay_payment_id,
          transactionamount: courseData?.coursePrice ? courseData?.coursePrice : 0,
        }
        axios
          .post(environment.VERIFY_PAYMENT, values)
          .then(() => {
            alert('Success')
          })
          .catch((e) => console.log(e))
      },
      prefill: {
        name: 'First Last',
        email: 'first@gmail.com',
        contact: '1234567890',
      },
      notes: {
        address: 'Hello World',
      },
      theme: {
        color: '#528ff0',
      },
    }

    // Create Razorpay order
    const createOrderPayload = {
      amount: amountInPaisa,
    }
    try {
      const orderDetails = await axios.post(environment.CREATE_ORDER, createOrderPayload)
      console.log(orderDetails, 'ORDER_DETAILS')
      options.order_id = orderDetails.data.id
      options.amount = orderDetails.data.amount
      const paymentPopup = new window.Razorpay(options)
      paymentPopup.open()
    } catch (error) {
      console.log(error, 'Error')
    }
  }

  return (
    <div>
      <div className='header bg-blue-500'>
        <div className='heading'>{courseData.courseTitle}</div>
        <div className='desc'>{courseData.courseOverView}</div>
        <button
          className='payment-btn'
          onClick={() => {
            intiatePayment()
          }}>
          Enroll now
        </button>
      </div>
      <div className='midSection'>
        <div className='midSecLeft'>
          <div className='midHeadL'>Learnings</div>
          <div className='learning'>
            <div className='lessonColLeft'>
              {courseData?.courseLearning?.map((lesson, indexL) => {
                return (
                  indexL <= courseData?.courseLearning.length / 2 && (
                    <div className='point'>
                      <div>
                        <CheckIcon />
                      </div>
                      <div className='lesson' key={indexL}>
                        {lesson}
                      </div>
                    </div>
                  )
                )
              })}
            </div>
            <div className='lessonColRight'>
              {courseData?.courseLearning?.map((lesson, indexR) => {
                return (
                  indexR > courseData?.courseLearning.length / 2 && (
                    <div className='point'>
                      <div>
                        <CheckIcon />
                      </div>
                      <div className='lesson' key={indexR}>
                        {lesson}
                      </div>
                    </div>
                  )
                )
              })}
            </div>
          </div>
        </div>
        <div className='gap'></div>
        <div className='midSecRight'>
          <div className='midHeadR'>PreRequisites</div>
          <div className='preReq'>
            <div className='preReqColLeft'>
              {courseData?.preRequisite?.map((preReq, indexL) => {
                return (
                  indexL <= courseData?.preRequisite.length / 2 && (
                    <div className='point'>
                      <div>
                        <CheckIcon />
                      </div>
                      <div className='preRequisite' key={indexL}>
                        {preReq}
                      </div>
                    </div>
                  )
                )
              })}
            </div>
            <div className='preReqColRight'>
              {courseData?.preRequisite?.map((preReq, indexR) => {
                return (
                  indexR > courseData?.preRequisite.length / 2 && (
                    <div className='point'>
                      <div>
                        <CheckIcon />
                      </div>
                      <div className='preRequisite' key={indexR}>
                        {preReq}
                      </div>
                    </div>
                  )
                )
              })}
            </div>
          </div>
        </div>
      </div>
      <div className='content'>
        <div className='contentHeading'>Course Content</div>
        <div className='accordianDiv'>
          {courseData?.course?.map((section) => {
            return (
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
                  <Typography>{section?.sectionTitle}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {section?.lectures?.map((lecture) => {
                    return (
                      <Typography>
                        <Accordion>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls='panel1a-content'
                            id='panel1a-header'>
                            <Typography>
                              <div
                                className='linkToVideo'
                                onClick={() => {
                                  setPopupData(lecture?.videoId)
                                }}>
                                Popup Open
                              </div>
                              {/* Open popup trigger set, and video Id set */}
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography>{lecture?.description}</Typography>
                          </AccordionDetails>
                        </Accordion>
                      </Typography>
                    )
                  })}
                </AccordionDetails>
              </Accordion>
            )
          })}
        </div>
      </div>
      <div className='videoPopup'>
        <Popup trigger={openPopup} videoId={videoId} closePopup={closePopup}></Popup>
      </div>
    </div>
  )
}

export default CoursePage
