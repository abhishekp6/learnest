
import React from "react";
import { useState } from "react";
import CustomUploadButton from "../Upload/CustomUploadButton";

const AddCourse = () => {

    const [section, setSection] = useState(
        {
            "courseTitle": "",
            "courseOverView": "",
            "courseLearning": [],
            "preRequisite": [],
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
        
        // Set Section Title Flow
        if(index === -1){
            let sectionVar = section;
            sectionVar.course[lectureIndex].sectionTitle = event.target.value;
            let rerenderVar = JSON.parse(JSON.stringify(sectionVar));
            setSection(rerenderVar);
        }
        // Set section Data flow
        else{
            let newFormValues = section;
            newFormValues.course[lectureIndex].sectionData[index][event.target.name] = event.target.value;
            let rerenderVar = JSON.parse(JSON.stringify(newFormValues));
            setSection(rerenderVar);
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

    const removeLecture = (lectureIndex, index) => {
        let rerenderVar = JSON.parse(JSON.stringify(section)); // New Variable to get a new array, not the reference array, for react to rerender
        rerenderVar.course[lectureIndex].sectionData.splice(index, 1);
        if(rerenderVar.course[lectureIndex].sectionData.length === 0){
            rerenderVar.course.splice(lectureIndex, 1);
        }
        setSection(rerenderVar);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
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
            <input placeholder="Course Title"></input>
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
            <button type="submit" placeholder="Submit">Submit</button>
            <button onClick={() => {addSection()}}>Add Section</button>
            <div>***********************************************************</div>
        </form>
    );
}

export default AddCourse;