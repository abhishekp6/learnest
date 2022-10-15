const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    courseId: {
        type: String,
        require: true,
        unique: [true, 'Course_ID_Should_Be_Unique'],
        trim: true
    },
    courseTitle: {
        type: String,
        require: true
    },
    courseOverView: {
        type: String,
        require: true
    },
    courseLearning: {
        type: Array,
        require: true
    },
    preRequisite: {
        type: Array,
        require: false
    },
    courseHeaderImage: {
        type: String,
        require: false,
        trim: true
    },
    courseThumbnail: {
        type: String,
        require: false
    },
    coursePrice: {
        type: Number,
        require: true
    },
    course: {
        sectionData: {
            description: {
                type: String,
                require: false
            },
            title: {
                type: String,
                require: true
            },
            videoId: {
                type: String,
                require: true
            }
        },
        sectionTitle: {
            type: String,
            require: true
        },
        type: Array,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('courseDetails', CourseSchema);