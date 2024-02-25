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

  useEffect(() => {
    console.log(`${environment.GET_COURSE_BY_ID}${courseId}`, 'HERE')
    getData()
  }, [])

  const setPopupData = (videoId) => {
    setVideoId(videoId)
    setOpenPopup(true)
  }

  const closePopup = () => {
    setOpenPopup(false)
  }

  return (
    <div>
      <div className='header'>
        <div className='heading'>{courseData.courseTitle}</div>
        <div className='desc'>{courseData.courseOverView}</div>
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
