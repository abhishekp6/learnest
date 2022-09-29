
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
    }

    const addLecture = (lectureIndex) => {
        let sectionVar = section;
        sectionVar.course[lectureIndex].sectionData = [...sectionVar.course[lectureIndex].sectionData, {"title": "", "description": "", "videoId":""} ];
        let newSectionVar = JSON.parse(JSON.stringify(sectionVar)); // New Variable to get a new object, not the reference object, for react to rerender
        setSection(newSectionVar)
        console.log(section, "Lecture")
    }

    const addSection = () => {
        let sectionVar = JSON.parse(JSON.stringify(section));
        sectionVar.course = [...section.course, { "sectionTitle": "", "sectionData": [{"title": "", "description": "", "videoId":""}] }];
        setSection(sectionVar);
        console.log(section, "Section")
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

    const removeLecture = (lectureIndex, index) => {
        let rerenderVar = JSON.parse(JSON.stringify(section)); // New Variable to get a new array, not the reference array, for react to rerender
        rerenderVar.course[lectureIndex].sectionData.splice(index, 1);
        if(rerenderVar.course[lectureIndex].sectionData.length === 0){
            rerenderVar.course.splice(lectureIndex, 1);
        }
        setSection(rerenderVar);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("SUBMIT", section)
        try {
            let saveCourseData = await axios.post(environment.SAVE_COURSE, section);
        } catch (error) {
            console.log("error");
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

    return(
        <form onSubmit={handleSubmit}>

            <div>Upload Course Banner</div>
            <input type="file" onChange={(event) => {onFormInput(-6, -6, event)}}/>
            <div>---------------------------------------------------------------------------------------------------</div>

            <input value={section.courseTitle} onChange={(event) => {onFormInput(-1, -1, event)}} name="courseTitle" placeholder="Course Title"></input>
            <input value={section.courseOverView} onChange={(event)=> {onFormInput(-2, -2, event)}} name="courseOverView" placeholder="Course OverView"></input>
            <input value={section.courseId} onChange={(event)=> {onFormInput(-7, -7, event)}} name="courseId" placeholder="Course ID"></input>

            <div>---------------------------------------------------------------------------------------------------</div>
            <div>
                {
                    section.courseLearning.map((point, index) => {
                        return(
                            <div key={index}>
                                <input value={point} onChange={(event) => {onFormInput(-3, index, event)}} name="courseLearning" placeholder="Course Learnings"></input>
                            </div>
                        )
                    })
                }   
                <button onClick={() => {addLearning()}}>Add Point</button>
            </div>
            <div>
                {
                    section.preRequisite.map((point, index) => {
                        return(
                            <div key={index}>
                                <input value={point} onChange={(event) => {onFormInput(-4, index, event)}} name="coursePreRequisite" placeholder="PreRequisites"></input>
                            </div>                            
                        )
                    })
                }
                <button onClick={() => {addPreRequisite()}}>Add Point</button>
            </div>
            <div>***********************************************************</div>
            {
                section.course.map((lecture, lectureIndex) => {
                    return(
                        <div key={lectureIndex}>
                            <div>-----------------------------------------------------------------------------------------------------------------------------------------------------------</div>
                            <input value={lecture.sectionTitle} onChange={(event) => {onFormInput(lectureIndex, -1, event)}} name="sectionTitle" placeholder="Add Section Title"></input>
                            {
                                lecture.sectionData.map((element, index) => {
                                    return(
                                        <div key={index}>
                                            <input value={element.title} name="title" onChange={(event) => {onFormInput(lectureIndex, index, event)}} placeholder="Add Title"></input>
                                            <input value={element.description} name="description" onChange={(event) => {onFormInput(lectureIndex, index, event)}} placeholder="Add Lecture Description"></input>
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
            <button type="submit" placeholder="Submit">Submit</button>
            <button onClick={() => {addSection()}}>Add Section</button>
            <div>***********************************************************</div>
        </form>
    );
}

export default AddCourse;