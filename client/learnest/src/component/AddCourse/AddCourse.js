
import React from "react";
import { useState } from "react";
import CustomUploadButton from "../Upload/CustomUploadButton";

const AddCourse = () => {

    const [section, setSection] = useState([ [{"title": "", "description": "", "videoId":""}] ]);

    const onFormInput = (lectureIndex, index, event) => {
        console.log(lectureIndex, index, event.target.value, event.target.name)
        let newFormValues = section;
        newFormValues[lectureIndex][index][event.target.name] = event.target.value;
        let renderVar = newFormValues.slice();
        setSection(renderVar);
    }

    const addLecture = (lectureIndex) => {
        let sectionVar = section;
        sectionVar[lectureIndex] = [...sectionVar[lectureIndex], {"title": "", "description": "", "videoId":""} ];
        let newSectionVar = sectionVar.slice(); // New Variable to get a new array, not the reference array, for react to rerender
        setSection(newSectionVar)
        console.log(section, "Lecture")
    }

    const addSection = () => {
        setSection([...section, [{"title": "", "description": "", "videoId":""}]]);
        console.log(section, "Section")
    }

    const removeLecture = (lectureIndex, index) => {
        let rerenderVar = section.slice(); // New Variable to get a new array, not the reference array, for react to rerender
        rerenderVar[lectureIndex].splice(index, 1);
        if(rerenderVar[lectureIndex].length === 0){
            rerenderVar.splice(lectureIndex, 1);
        }
        setSection(rerenderVar);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    const setVideoId = (lectureIndex, index, videoId) => {
        let lectureList = section;
        lectureList[lectureIndex][index].videoId = videoId;
        let renderVal = lectureList.slice();
        setSection(renderVal); 
    }

    const returnFormData = (lectureIndex, index) => {
        const formData = section[lectureIndex][index];
        return formData;
    }

    return(
        <form onSubmit={handleSubmit}>
            {
                section.map((lecture, lectureIndex) => {
                    return(
                        <div key={lectureIndex}>
                            <div>-----------------------------------------------------------------------------------------------------------------------------------------------------------</div>
                            {
                                lecture.map((element, index) => {
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
        </form>
    );
}

export default AddCourse;