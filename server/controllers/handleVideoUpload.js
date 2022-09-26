const ApiVideoClient =  require('@api.video/nodejs-client')
const Crypt = require('hybrid-crypto-js').Crypt;
const axios = require('axios');
const CourseSchema = require('../models/Course'); 
const { Mongoose } = require('mongoose');

exports.getCustomUploadToken = async (req, res, next) => {
  try {
    const tokenApiResponse = await axios.post(process.env.GET_CUSTOM_VIDEO_UPLOAD_TOKEN_URL, {"apiKey": process.env.VIDEO_API_KEY});
    const customUploadToken = tokenApiResponse?.data?.access_token ? tokenApiResponse.data.access_token : ""; 
    res.status(200).send({"statusMessage": "Token Fetched Successfully", "customUploadToken": customUploadToken});
  } catch (error) {
    console.log(error);
    res.status(500).send({"statusMessage": "Internal Server Error", "errorMessage": error});
  }
}

exports.saveCourse = async (req, res, next) => {
  try {
    let courseData = req.body;
    let createCourse = await CourseSchema.create(courseData);

    res.status(201).send({"Status": "Success", "data": createCourse});
  } catch (error) {
    res.status(500).send({"Status": "Internal Server Error", "Error": error})
  }
}