
import React from "react";
import { useState } from "react";

import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import CustomUploadButton from "../Upload/CustomUploadButton";
import environment from "../../config/Config";
import './AddCourse.css';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const AddCourse = () => {

    const [mainForm, setMainForm] = useState(
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
                    "lectures": [{"title": "", "description": "", "videoId":""}]
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
                "lectures": [{"title": "", "description": "", "videoId":""}]
            } 
        ],
        "courseLength": "",
        "sectionLength": ""
    })

    // Snackbar open and close state management variables
    const [invalid, setInvalid] = React.useState(false);
    const [errorSnack, setErrorSnack] = React.useState(false);
    const [success, setSuccess] = React.useState(false);

    const onFormInput = (sectionIndex, index, event) => {
        console.log(sectionIndex, index, event.target.value, event.target.name)
        
        //Set Course Details
        if(sectionIndex === -1 && index === -1){
            let sectionVar = JSON.parse(JSON.stringify(mainForm));
            sectionVar.courseTitle = event.target.value;
            setMainForm(sectionVar);
        }
        else if(sectionIndex === -2 && index === -2){
            let sectionVar = JSON.parse(JSON.stringify(mainForm));
            sectionVar.courseOverView = event.target.value;
            setMainForm(sectionVar);
        }
        else if(sectionIndex === -3 && index >= 0){
            let sectionVar = JSON.parse(JSON.stringify(mainForm));
            sectionVar.courseLearning[index] = event.target.value;
            setMainForm(sectionVar);
        }
        else if(sectionIndex === -4 && index >= 0){
            let sectionVar = JSON.parse(JSON.stringify(mainForm));
            sectionVar.preRequisite[index] = event.target.value;
            setMainForm(sectionVar);
        }
        else if(sectionIndex === -5 && index === -5){
            let sectionVar = JSON.parse(JSON.stringify(mainForm));
            sectionVar.coursePrice = event.target.value;
            setMainForm(sectionVar);
        }
        else if(sectionIndex === -6 && index === -6){
            event.preventDefault();
            console.log(event.target.files[0], "UPLOADED_IMAGE")
        }
        else if(sectionIndex === -7 && index === -7){
            let sectionVar = JSON.parse(JSON.stringify(mainForm));
            sectionVar.courseId = event.target.value;
            setMainForm(sectionVar);
        }
        // Set Section Title Flow
        else if(sectionIndex >= 0 && index === -1){
            let sectionVar = JSON.parse(JSON.stringify(mainForm));
            sectionVar.course[sectionIndex].sectionTitle = event.target.value;
            setMainForm(sectionVar);
        }
        // Set mainForm Data flow
        else{
            let newFormValues = JSON.parse(JSON.stringify(mainForm));
            newFormValues.course[sectionIndex].lectures[index][event.target.name] = event.target.value;
            setMainForm(newFormValues);
        }
        validateFormInput();
    }

    const addLecture = (sectionIndex) => {
        let sectionVar = mainForm;
        sectionVar.course[sectionIndex].lectures = [...sectionVar.course[sectionIndex].lectures, {"title": "", "description": "", "videoId":""} ];
        let newSectionVar = JSON.parse(JSON.stringify(sectionVar)); // New Variable to get a new object, not the reference object, for react to rerender
        setMainForm(newSectionVar)

        let errorVar = error;
        errorVar.course[sectionIndex].lectures = [...errorVar.course[sectionIndex].lectures, {"title": "", "description": "", "videoId":""} ];
        let newErrorVar = JSON.parse(JSON.stringify(errorVar));
        setError(newErrorVar);
    }

    const addSection = () => {
        let sectionVar = JSON.parse(JSON.stringify(mainForm));
        sectionVar.course = [...mainForm.course, { "sectionTitle": "", "lectures": [{"title": "", "description": "", "videoId":""}] }];
        setMainForm(sectionVar);

        let errorVar = error;
        errorVar.course = [...errorVar.course, { "sectionTitle": "", "lectures": [{"title": "", "description": "", "videoId":""}] }]
        let newErrorVar = JSON.parse(JSON.stringify(errorVar));
        setError(newErrorVar);
    }

    const removeLecture = (sectionIndex, index) => {
        let rerenderVar = JSON.parse(JSON.stringify(mainForm)); // New Variable to get a new array, not the reference array, for react to rerender
        let errorObject = JSON.parse(JSON.stringify(error));

        rerenderVar.course[sectionIndex].lectures.splice(index, 1);
        if(rerenderVar.course[sectionIndex].lectures.length === 0){
            rerenderVar.course.splice(sectionIndex, 1);
        }
        setMainForm(rerenderVar);

        errorObject.course[sectionIndex].lectures.splice(index, 1);
        if(errorObject.course[sectionIndex].lectures.length === 0){
            errorObject.course.splice(sectionIndex, 1);
        }

        setError(errorObject);
        
    }

    const addPreRequisite = () => {
        let sectionVar = JSON.parse(JSON.stringify(mainForm));
        sectionVar.preRequisite.push("");
        setMainForm(sectionVar);
        console.log(mainForm.preRequisite);
    }

    const addLearning = () => {
        let sectionVar = JSON.parse(JSON.stringify(mainForm));
        sectionVar.courseLearning.push("");
        setMainForm(sectionVar);
        console.log(mainForm.courseLearning);
    }

    const removePoint = (param, index) => {
        if(param === 'courseLearning'){
            let rerenderVar = JSON.parse(JSON.stringify(mainForm)); // New Variable to get a new array, not the reference array, for react to rerender
            if(rerenderVar.courseLearning.length > 1){
                rerenderVar.courseLearning.splice(index, 1);
            }
            setMainForm(rerenderVar);
        }
        else if(param === 'preRequisite'){
            let rerenderVar = JSON.parse(JSON.stringify(mainForm)); // New Variable to get a new array, not the reference array, for react to rerender
            rerenderVar.preRequisite.splice(index, 1);
            setMainForm(rerenderVar);
        }
    }

    const setVideoId = (sectionIndex, index, videoId) => {
        let lectureList = mainForm;
        lectureList.course[sectionIndex].lectures[index].videoId = videoId;
        let renderVal = JSON.parse(JSON.stringify(lectureList));
        setMainForm(renderVal); 
        console.log(mainForm, "UPLOAD_SUCCESS")
    }

    const returnFormData = (sectionIndex, index) => {
        const formData = mainForm.course[sectionIndex].lectures[index];
        return formData;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        console.log("SUBMIT");

        // Validate Form Input
        let allowSubmit = validateFormInput();

        console.log(allowSubmit, "ALLOW_SUBMIT");

        if(allowSubmit === true){
            try {
                let saveCourseData = await axios.post(environment.SAVE_COURSE, mainForm);   
                if(saveCourseData){ // To be handled based on response
                    handleClickSnackbar("success");
                }
            } catch (error) {
                console.log(error);
                handleClickSnackbar("error");
            }
        }
        else{
            console.log("Form Values Not Valid! Please Revisit")
            // Open Snackbar with Validation Error
            handleClickSnackbar("invalid");
        }
    }

    let validateFormInput = () => {

        let errorObject = error;
        let valid = true;
        let count = 0;

        // Required Validations
        if(!mainForm.courseId){
            errorObject.courseId = "Course Id Mandatory! Please Enter Course Id";
            valid = false
        }else{
            errorObject.courseId = "";
            count++;
            console.log("courseIdValid")
        }
        if(!mainForm.courseTitle){
            errorObject.courseTitle = "Course Title Mandatory! Please Enter Course Title"
            valid = false
        }else{
            errorObject.courseTitle = "";
            count++;
            console.log("courseTitleValid")
        }
        if(!mainForm.courseOverView){
            errorObject.courseOverView = "Course Overview Mandatory! Please Enter Course Overview"
            valid = false
        }else{
            errorObject.courseOverView = "";
            count++;
            console.log("courseOverValid")
        }
        if(!mainForm.courseLearning || mainForm.courseLearning.length === 0 || (mainForm.courseLearning.length === 1 && mainForm.courseLearning[0] === "")){
            errorObject.courseLearning = "Course Learning Mandatory! Please Enter Course Learning"
            valid = false
        }else{
            errorObject.courseLearning = "";
            count++;
            console.log("courseLearningValid")
        }
        if(!mainForm.coursePrice){
            errorObject.coursePrice = "Course Price Mandatory! Please Enter Course Price"
            valid = false
        }else{
            errorObject.coursePrice = "";
            count++;
            console.log("coursePriceValid")
        }
        if(!isParamValid(errorObject)){
            valid = false
        }else{
            count++;
            console.log("Param")
        }
        if(mainForm.course.length === 0){
            errorObject.courseLength = "Atleast One Section Required !!"
            valid = false
        }else{
            errorObject.courseLength = "";
            count++;
            console.log("CourselengthValid")
        }
        console.log(count)
        if(count === 7){
            valid = true;
        }
        console.log(valid, "VALID")
        if(valid){
            clearErrorObject(errorObject);
        }
        setError(errorObject);
        console.log(errorObject, "ERR")
        return valid;
    }

    function isParamValid(errorObject) {
        let validity = true;
        let count = 0;

        // sectionTitle
        mainForm.course.forEach((sectionVar, index) => {
            if(!sectionVar.sectionTitle){
                validity = false;
                errorObject.course[index].sectionTitle = "Section Title Mandatory! Please Enter Section Title"
            }else{
                errorObject.course[index].sectionTitle = "";
                count++;
            }
        })

        // sectionLength            
        mainForm.course.forEach((sectionVar) => {
            if(sectionVar.lectures.length === 0){
                validity = false;
            }else{
                count++;
            }
        })

        // Lecture title
        mainForm.course.forEach((courseVar, courseIndex) => {
            courseVar.lectures.forEach((lectureVar, index) => {
                if(!lectureVar.title){
                    validity = false;
                    errorObject.course[courseIndex].lectures[index].title = "Section Title Mandatory! Please Enter Section Title"
                }else{
                    errorObject.course[courseIndex].lectures[index].title = "";
                    count++;
                }
            })
        })

        // Lecture videoId
        mainForm.course.forEach((courseVar, courseIndex) => {
            courseVar.lectures.forEach((lectureVar, index) => {
                if(!lectureVar.videoId){
                    validity = false;
                    errorObject.course[courseIndex].lectures[index].videoId = "Video Not Uploaded Successfully!! Please Upload Video Again"
                }else{
                    errorObject.course[courseIndex].lectures[index].videoId = "";
                    count++;
                }
            })
        })

        if(count === 4){
            validity = true;
        }

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
                    "lectures": [{"title": "", "description": "", "videoId":""}]
                } 
            ]
        };
    }

    const renderButton = (index, name) => {
        if(index === mainForm.courseLearning.length-1 && name === 'addLearning'){
            return (
                <button onClick={() => {addLearning()}}>Add Point</button>
            )
        }
        if(index === mainForm.preRequisite.length-1 && name === 'addPreReq'){
            return (
                <button onClick={() => {addPreRequisite()}}>Add Point</button>
            )
        }
    }

    const handleClickSnackbar = (param) => {
        if(param === 'invalid'){
            setInvalid(true);
        }else if(param === 'error'){
            setErrorSnack(true);
        }else if(param === 'success'){
            setSuccess(true);
        }
      };

    const handleClose = (event) => {

        setInvalid(false);
        setInvalid(false);
        setInvalid(false);
        
        return;
    }

    return(
        <form className="container" onSubmit={handleSubmit}>

            <div className="courseBanner">
                <div>Upload Course Banner</div>
                <div>
                    <input type="file" onChange={(event) => {onFormInput(-6, -6, event)}}/>
                </div>
            </div>
            <div>---------------------------------------------------------------------------------------------------</div>

            <div className="subHeader">
                <div className="subHeaderAlign">
                    <div>
                        <input value={mainForm.courseTitle} onChange={(event) => {onFormInput(-1, -1, event)}} name="courseTitle" placeholder="Course Title"></input>
                    </div>
                    <div>
                        <div className="errorMessage">{error.courseTitle}</div>
                    </div>
                </div>
                <div className="subHeaderAlign">
                    <div>
                        <input value={mainForm.courseOverView} onChange={(event)=> {onFormInput(-2, -2, event)}} name="courseOverView" placeholder="Course OverView"></input>
                    </div>
                    <div>
                        <div className="errorMessage">{error.courseOverView}</div>
                    </div>
                </div>
                <div className="subHeaderAlign">
                    <div>
                        <input value={mainForm.courseId} onChange={(event)=> {onFormInput(-7, -7, event)}} name="courseId" placeholder="Course ID"></input>
                    </div>
                    <div>
                        <div className="errorMessage">{error.courseId}</div>
                    </div>
                </div>
            </div>

            <div>---------------------------------------------------------------------------------------------------</div>
            <div className="subHeader2">
                <div className="subHeader2Align">
                    <div>
                        {
                            mainForm.courseLearning.map((point, index) => {
                                return(
                                    <div key={index}>
                                        <input value={point} onChange={(event) => {onFormInput(-3, index, event)}} name="courseLearning" placeholder="Course Learnings"></input>
                                        <button onClick={() => {removePoint('courseLearning', index)}}>Remove Form Field</button>
                                        {renderButton(index, 'addLearning')}
                                    </div>
                                )
                            })
                        }   
                    </div>
                    <div className="errorMessage">{error.courseLearning}</div>
                </div>
                <div>
                    <div>
                        {
                            mainForm.preRequisite.map((point, index) => {
                                return(
                                    <div key={index}>
                                        <input value={point} onChange={(event) => {onFormInput(-4, index, event)}} name="coursePreRequisite" placeholder="PreRequisites"></input>
                                        <button onClick={() => {removePoint('preRequisite', index)}}>Remove Form Field</button>
                                        {renderButton(index, 'addPreReq')}
                                    </div>                            
                                )
                            })
                        }
                    </div>
                    <div className="errorMessage">{error.preRequisite}</div>
                </div>
            </div>
            <div>***********************************************************</div>
            <div className="section">
                {
                    mainForm.course.map((section, sectionIndex) => {
                        return(
                            <div key={sectionIndex}>
                                <div>-----------------------------------------------------------------------------------------------------------------------------------------------------------</div>
                                <div className="sectionTitle">
                                    <input value={section.sectionTitle} onChange={(event) => {onFormInput(sectionIndex, -1, event)}} name="sectionTitle" placeholder="Add Section Title"></input>
                                    <div className="errorMessage">{error.course[sectionIndex].sectionTitle}</div>
                                </div>
                                <div>
                                    <div>
                                        {
                                            section.lectures.map((element, index) => {
                                                return(
                                                    <div className="lectures" key={index}>
                                                        <input value={element.title} name="title" onChange={(event) => {onFormInput(sectionIndex, index, event)}} placeholder="Add Title"></input>
                                                        <div className="errorMessage">{error.course[sectionIndex].lectures[index].title}</div>
                                                        <input value={element.description} name="description" onChange={(event) => {onFormInput(sectionIndex, index, event)}} placeholder="Add Lecture Description"></input>
                                                        <div className="errorMessage">{error.course[sectionIndex].lectures[index].description}</div>
                                                        <CustomUploadButton currentIndexForm={returnFormData} setVideoId={setVideoId} index={index} sectionIndex={sectionIndex}/>
                                                        <button onClick={() => {removeLecture(sectionIndex, index)}}>Remove Form Field</button>                                     
                                                    </div>
                                                )
                                                })
                                        }
                                    </div>
                                    <button onClick={() => {addLecture(sectionIndex)}}>Add Lecture</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="addSec">
                    <button onClick={() => {addSection()}}>Add Section</button>
            </div>
            <div>===================================================================================================================</div>
            <div className="priceSection">
                <div className="priceSec">
                    <input name="coursePrice" onChange={(event) => {onFormInput(-5, -5, event)}} placeholder="Course Price"></input>
                    <div className="errorMessage">{error.coursePrice}</div>
                </div>
            </div>
            <div>***********************************************************</div>
            <div className="submit">
                <button type="submit" placeholder="Submit">Submit</button>
            </div>
            <div>
                {}
            </div>
            <div>
                <Snackbar open={invalid} autoHideDuration={2000} onClose={handleClose}>
                    <Alert severity="error" sx={{ width: '100%' }} onClose={handleClose}>
                    Please Input Mandatory Form Values
                    </Alert>
                </Snackbar>
                <Snackbar open={errorSnack} autoHideDuration={2000} onClose={handleClose}>
                    <Alert severity="error" sx={{ width: '100%' }} onClose={handleClose}>
                    Internal Server Error! We will be right back
                    </Alert>
                </Snackbar>
                <Snackbar open={success} autoHideDuration={2000} onClose={handleClose}>
                    <Alert severity="success" sx={{ width: '100%' }} onClose={handleClose}>
                    Course Uploaded Successfully
                    </Alert>
                </Snackbar>
            </div>
        </form>
    );
}

export default AddCourse;