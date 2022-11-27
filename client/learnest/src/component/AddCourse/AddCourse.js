
import React from "react";
import { useState } from "react";
import CustomUploadButton from "../Upload/CustomUploadButton";
import axios from "axios";
import environment from "../../config/Config";

const AddCourse = () => {

    const [section, setSection] = useState(
        {
            "courseId": "",
            "courseTitle": "",
            "courseOverView": "",
            "courseLearning": [""],
            "preRequisite": [""],
            "courseHeaderImage":"",
            "courseThumbnail":"",
            "coursePrice": 0,
            "course": [ 
                { 
                    "sectionTitle": "",
                    "sectionData": [{"title": "", "description": "", "videoId":""}]
                } 
            ]
        }
    );

    const [error, setError] = useState({
        "courseId": "",
        "courseTitle": "",
        "courseOverView": "",
        "courseLearning": "",
        "preRequisite": "",
        "courseHeaderImage":"",
        "courseThumbnail":"",
        "coursePrice": null,
        "course": [ 
            {
                "sectionTitle": "",
                "sectionData": [{"title": "", "description": "", "videoId":""}]
            } 
        ],
        "courseLength": "",
        "sectionLength": ""
    })

    const [allowSubmit, setAllowSubmit] = useState(false);

    const onFormInput = (lectureIndex, index, event) => {
        console.log(lectureIndex, index, event.target.value, event.target.name)
        
        //Set Course Details
        if(lectureIndex === -1 && index === -1){
            let sectionVar = JSON.parse(JSON.stringify(section));
            sectionVar.courseTitle = event.target.value;
            setSection(sectionVar);
        }
        else if(lectureIndex === -2 && index === -2){
            let sectionVar = JSON.parse(JSON.stringify(section));
            sectionVar.courseOverView = event.target.value;
            setSection(sectionVar);
        }
        else if(lectureIndex === -3 && index >= 0){
            let sectionVar = JSON.parse(JSON.stringify(section));
            sectionVar.courseLearning[index] = event.target.value;
            setSection(sectionVar);
        }
        else if(lectureIndex === -4 && index >= 0){
            let sectionVar = JSON.parse(JSON.stringify(section));
            sectionVar.preRequisite[index] = event.target.value;
            setSection(sectionVar);
        }
        else if(lectureIndex === -5 && index === -5){
            let sectionVar = JSON.parse(JSON.stringify(section));
            sectionVar.coursePrice = event.target.value;
            setSection(sectionVar);
        }
        else if(lectureIndex === -6 && index === -6){
            event.preventDefault();
            console.log(event.target.files[0], "UPLOADED_IMAGE")
        }
        else if(lectureIndex === -7 && index === -7){
            let sectionVar = JSON.parse(JSON.stringify(section));
            sectionVar.courseId = event.target.value;
            setSection(sectionVar);
        }
        // Set Section Title Flow
        else if(lectureIndex >= 0 && index === -1){
            let sectionVar = JSON.parse(JSON.stringify(section));
            sectionVar.course[lectureIndex].sectionTitle = event.target.value;
            setSection(sectionVar);
        }
        // Set section Data flow
        else{
            let newFormValues = JSON.parse(JSON.stringify(section));
            newFormValues.course[lectureIndex].sectionData[index][event.target.name] = event.target.value;
            setSection(newFormValues);
        }
        validateFormInput();
    }

    const addLecture = (lectureIndex) => {
        let sectionVar = section;
        sectionVar.course[lectureIndex].sectionData = [...sectionVar.course[lectureIndex].sectionData, {"title": "", "description": "", "videoId":""} ];
        let newSectionVar = JSON.parse(JSON.stringify(sectionVar)); // New Variable to get a new object, not the reference object, for react to rerender
        setSection(newSectionVar)
        setError([...error.course[lectureIndex].sectionData, {"title": "", "description": "", "videoId":""} ])
        console.log(section, "Lecture")
    }

    const addSection = () => {
        let sectionVar = JSON.parse(JSON.stringify(section));
        sectionVar.course = [...section.course, { "sectionTitle": "", "sectionData": [{"title": "", "description": "", "videoId":""}] }];
        setSection(sectionVar);
        setError([...error.course, { "sectionTitle": "", "sectionData": [{"title": "", "description": "", "videoId":""}] }])
        console.log(section, "Section")
    }

    const removeLecture = (lectureIndex, index) => {
        let rerenderVar = JSON.parse(JSON.stringify(section)); // New Variable to get a new array, not the reference array, for react to rerender
        let errorObject = JSON.parse(JSON.stringify(error));

        rerenderVar.course[lectureIndex].sectionData.splice(index, 1);
        if(rerenderVar.course[lectureIndex].sectionData.length === 0){
            rerenderVar.course.splice(lectureIndex, 1);
        }
        setSection(rerenderVar);

        errorObject.course[lectureIndex].sectionData.splice(index, 1);
        if(errorObject.course[lectureIndex].sectionData.length === 0){
            errorObject.course.splice(lectureIndex, 1);
        }

        setError(errorObject);
        
    }

    const addPreRequisite = () => {
        let sectionVar = JSON.parse(JSON.stringify(section));
        sectionVar.preRequisite.push("");
        setSection(sectionVar);
        console.log(section.preRequisite);
    }

    const addLearning = () => {
        let sectionVar = JSON.parse(JSON.stringify(section));
        sectionVar.courseLearning.push("");
        setSection(sectionVar);
        console.log(section.courseLearning);
    }

    const removePoint = (param, index) => {
        if(param === 'courseLearning'){
            let rerenderVar = JSON.parse(JSON.stringify(section)); // New Variable to get a new array, not the reference array, for react to rerender
            if(rerenderVar.courseLearning.length > 1){
                rerenderVar.courseLearning.splice(index, 1);
            }
            setSection(rerenderVar);
        }
        else if(param === 'preRequisite'){
            let rerenderVar = JSON.parse(JSON.stringify(section)); // New Variable to get a new array, not the reference array, for react to rerender
            rerenderVar.preRequisite.splice(index, 1);
            setSection(rerenderVar);
        }
    }

    const setVideoId = (lectureIndex, index, videoId) => {
        let lectureList = section;
        lectureList.course[lectureIndex].sectionData[index].videoId = videoId;
        let renderVal = JSON.parse(JSON.stringify(lectureList));
        setSection(renderVal); 
        console.log(section, "UPLOAD_SUCCESS")
    }

    const returnFormData = (lectureIndex, index) => {
        const formData = section.course[lectureIndex].sectionData[index];
        return formData;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("SUBMIT", section)
        
        // Validate Form Input
        validateFormInput();

        if(allowSubmit){
            try {
                let saveCourseData = await axios.post(environment.SAVE_COURSE, section);   
            } catch (error) {
                console.log(error);
            }
        }
        else{
            console.log("Form Values Not Valid! Please Revisit")
            // Open Snackbar with Validation Error
        }
    }

    const validateFormInput = () => {

        let errorObject = error;
        let valid = true;

        // Required Validations
        if(!section.courseId){
            errorObject.courseId = "Course Id Mandatory! Please Enter Course Id";
            valid = false
        }else{
            errorObject.courseId = "";
            valid = true
        }
        if(!section.courseTitle){
            errorObject.courseTitle = "Course Title Mandatory! Please Enter Course Title"
            valid = false
        }else{
            errorObject.courseTitle = ""
            valid = true
        }
        if(!section.courseOverView || section.courseOverView.length === 0 || (section.courseOverView.length === 1 && section.courseOverView[0] === "")){
            errorObject.courseOverView = "Course Overview Mandatory! Please Enter Course Overview"
            valid = false
        }else{
            errorObject.courseOverView = ""
            valid = true
        }
        if(!section.courseLearning || section.courseLearning.length === 0 || (section.courseLearning.length === 1 && section.courseLearning[0] === "")){
            errorObject.courseLearning = "Course Learning Mandatory! Please Enter Course Learning"
            valid = false
        }else{
            errorObject.courseLearning = ""
            valid = true
        }
        if(!section.coursePrice){
            errorObject.coursePrice = "Course Price Mandatory! Please Enter Course Price"
            valid = false
        }else{
            errorObject.coursePrice = ""
            valid = true
        }
        if(!isParamValid(errorObject)){
            valid = false
        }else{
            valid = true
        }
        if(section.course.length === 0){
            errorObject.courseLength = "Atleast One Section Required !!"
            valid = false
        }else{
            errorObject.courseLength = ""
            valid = true
        }
        if(isParamValid(errorObject)){
            errorObject.sectionLength = "Atleast One Course Required !!"
            valid = false
        }else{
            errorObject.sectionLength = ""
            valid = true
        }
        if(valid){
            clearErrorObject(errorObject);
            setAllowSubmit(true);
        }
        setError(errorObject);
        console.log(errorObject, "ERR")
    }

    function isParamValid(errorObject) {
        let validity = true;

        // title
        section.course.forEach((courseVar, courseIndex) => {
            courseVar.sectionData.forEach((sectionVar, sectionIndex) => {
                if(!sectionVar.title){
                    validity = false;
                    errorObject.course[courseIndex].sectionData[sectionIndex].title = "Section Title Mandatory! Please Enter Section Title"
                }else{
                    errorObject.course[courseIndex].sectionData[sectionIndex].title = ""
                }
            })
        })

        // videoId
        section.course.forEach((courseVar, courseIndex) => {
            courseVar.sectionData.forEach((sectionVar, sectionIndex) => {
                if(!sectionVar.videoId){
                    validity = false;
                    errorObject.course[courseIndex].sectionData[sectionIndex].videoId = "Video Not Uploaded Successfully!! Please Upload Video Again"
                }else{
                    errorObject.course[courseIndex].sectionData[sectionIndex].videoId = ""
                }
            })
        })

        // sectionTitle
        section.course.forEach((courseVar, index) => {
            if(!courseVar.sectionTitle){
                validity = false;
                errorObject.course[index].sectionTitle = "Section Title Mandatory! Please Enter Section Title"
            }else{
                errorObject.course[index].sectionTitle = ""
            }
        })

        // sectionLength            
        section.course.forEach((courseVar) => {
            if(courseVar.length === 0){
                validity = false;
            }
        })

        if(!validity){
            return false;
        }else{
            return true;
        }
        
    }

    function clearErrorObject(errorObject){
        errorObject = {
            "courseId": "",
            "courseTitle": "",
            "courseOverView": "",
            "courseLearning": [""],
            "preRequisite": [""],
            "courseHeaderImage":"",
            "courseThumbnail":"",
            "coursePrice": 0,
            "course": [ 
                { 
                    "sectionTitle": "",
                    "sectionData": [{"title": "", "description": "", "videoId":""}]
                } 
            ]
        };
    }

    return(
        <form onSubmit={handleSubmit}>

            <div>Upload Course Banner</div>
            <input type="file" onChange={(event) => {onFormInput(-6, -6, event)}}/>
            <div>---------------------------------------------------------------------------------------------------</div>

            <input value={section.courseTitle} onChange={(event) => {onFormInput(-1, -1, event)}} name="courseTitle" placeholder="Course Title"></input>
            <span>{error.courseTitle}</span>
            <input value={section.courseOverView} onChange={(event)=> {onFormInput(-2, -2, event)}} name="courseOverView" placeholder="Course OverView"></input>
            <span>{error.courseOverView}</span>
            <input value={section.courseId} onChange={(event)=> {onFormInput(-7, -7, event)}} name="courseId" placeholder="Course ID"></input>
            <span>{error.courseId}</span>

            <div>---------------------------------------------------------------------------------------------------</div>
            <div>
                {
                    section.courseLearning.map((point, index) => {
                        return(
                            <div key={index}>
                                <input value={point} onChange={(event) => {onFormInput(-3, index, event)}} name="courseLearning" placeholder="Course Learnings"></input>
                                <button onClick={() => {removePoint('courseLearning', index)}}>Remove Form Field</button>
                            </div>
                        )
                    })
                }   
                <button onClick={() => {addLearning()}}>Add Point</button>
            </div>
            <span>{error.courseLearning}</span>
            <div>
                {
                    section.preRequisite.map((point, index) => {
                        return(
                            <div key={index}>
                                <input value={point} onChange={(event) => {onFormInput(-4, index, event)}} name="coursePreRequisite" placeholder="PreRequisites"></input>
                                <button onClick={() => {removePoint('preRequisite', index)}}>Remove Form Field</button>
                            </div>                            
                        )
                    })
                }
                <button onClick={() => {addPreRequisite()}}>Add Point</button>
            </div>
            <span>{error.preRequisite}</span>
            <div>***********************************************************</div>
            {
                section.course.map((lecture, lectureIndex) => {
                    return(
                        <div key={lectureIndex}>
                            <div>-----------------------------------------------------------------------------------------------------------------------------------------------------------</div>
                            <input value={lecture.sectionTitle} onChange={(event) => {onFormInput(lectureIndex, -1, event)}} name="sectionTitle" placeholder="Add Section Title"></input>
                            <span>{error.course[lectureIndex].sectionTitle}</span>
                            {
                                lecture.sectionData.map((element, index) => {
                                    return(
                                        <div key={index}>
                                            <input value={element.title} name="title" onChange={(event) => {onFormInput(lectureIndex, index, event)}} placeholder="Add Title"></input>
                                            <span>{error.course[lectureIndex].sectionData[index].title}</span>
                                            <input value={element.description} name="description" onChange={(event) => {onFormInput(lectureIndex, index, event)}} placeholder="Add Lecture Description"></input>
                                            <span>{error.course[lectureIndex].sectionData[index].description}</span>
                                            <CustomUploadButton currentIndexForm={returnFormData} setVideoId={setVideoId} index={index} lectureIndex={lectureIndex}/>
                                            <button onClick={() => {removeLecture(lectureIndex, index)}}>Remove Form Field</button>
                                        </div>
                                    )
                                    })
                            }
                            <button onClick={() => {addLecture(lectureIndex)}}>Add Lecture</button>
                        </div>
                    )
                })
            }
            <div>===================================================================================================================</div>
            <input name="coursePrice" onChange={(event) => {onFormInput(-5, -5, event)}} placeholder="Course Price"></input>
            <span>{error.coursePrice}</span>
            <button type="submit" placeholder="Submit">Submit</button>
            <button onClick={() => {addSection()}}>Add Section</button>
            <div>***********************************************************</div>
        </form>
    );
}

export default AddCourse;