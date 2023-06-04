const CourseSchema = require('../models/Course');

exports.getCourseById = async (req, res, next) => {
    // Validations
    if(!req.params || !req.params.courseId){
        return res.status(400).send({"statusMessage": "Invalid Request! Missing Params"});
    }
    // Response Logic
    let query = {"courseId": req.params.courseId};
    try {
        const courseData = await CourseSchema.findOne(query);
        return res.status(200).send(courseData);
    } catch (error) {
        return res.status(500).send({"statusMessage": "Internal Server Error", "Error": error});
    }
    
}

exports.saveCourse = async (req, res, next) => {
    try {
      let courseData = req.body;
      
      // Check if courseId in request body already exists in database
      let courseIdExists = await CourseSchema.exists({"courseId": courseData.courseId});
      
      if(courseIdExists === null){
        let createCourse = await CourseSchema.create(courseData);
        res.status(201).send({"Status": "Success", "data": createCourse});
      }
      else{
        res.status(400).send({"Status": "Bad Request", "Error": "Course Id already exists"});
      }
  
    } catch (error) {
      res.status(500).send({"Status": "Internal Server Error", "Error": error})
    }
  }

  exports.updateCourse = async (req, res, next) => {
    try {
        let courseData = req.body;

        let courseIdExists = await CourseSchema.exists({"courseId": courseData.courseId});

        if(courseIdExists !== null){
            let filter = {"courseId": courseData.courseId};
            let updateCourse = await CourseSchema.findOneAndUpdate(filter, courseData);
            res.status(200).send({"Status": "Success", "data": updateCourse});
        }else{
            res.status(304).send({"Status": "Not Modified", "Error": "Course does not exists"});
        }

    } catch (error) {
        res.status(500).send({"Status": "Internal Server Error", "Error": error});
    }
  }