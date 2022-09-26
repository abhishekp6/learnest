const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    courseId: {
        type: String,
        require: true,
        unique: [true, 'Course_ID_Should_Be_Unique'],
        trim: true
    },
    course: {
        sectionData: {
            description: {
                type: String,
                require: true
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
    courseHeaderImage: {
        type: String,
        require: false,
        trim: true
    },
    courseLearning: {
        type: Array,
        require: true
    },
    courseOverView: {
        type: String,
        require: true
    },
    coursePrice: {
        type: Number,
        require: true
    },
    courseThumbnail: {
        type: String,
        require: false
    },
    courseTitle: {
        type: String,
        require: true
    },
    preRequisite: {
        type: Array,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('courseDetails', CourseSchema);