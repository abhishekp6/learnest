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