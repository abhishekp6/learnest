
import React from "react";
import { useState } from "react";
import CustomUploadButton from "../Upload/CustomUploadButton";

const AddCourse = () => {

    const [section, setSection] = useState(
        [ 
            { 
                "sectionTitle": "",
                "sectionData": [{"title": "", "description": "", "videoId":""}]
            } 
        ]
    );

    const onFormInput = (lectureIndex, index, event) => {
        console.log(lectureIndex, index, event.target.value, event.target.name)
        
        // Set Section Title Flow
        if(index === -1){
            let sectionVar = section;
            sectionVar[lectureIndex].sectionTitle = event.target.value;
            let rerenderVar = sectionVar.slice();
            setSection(rerenderVar);
        }
        // Set section Data flow
        else{
            let newFormValues = section;
            newFormValues[lectureIndex].sectionData[index][event.target.name] = event.target.value;
            let rerenderVar = newFormValues.slice();
            setSection(rerenderVar);
        }
    }

    const addLecture = (lectureIndex) => {
        let sectionVar = section;
        sectionVar[lectureIndex].sectionData = [...sectionVar[lectureIndex].sectionData, {"title": "", "description": "", "videoId":""} ];
        let newSectionVar = sectionVar.slice(); // New Variable to get a new array, not the reference array, for react to rerender
        setSection(newSectionVar)
        console.log(section, "Lecture")
    }

    const addSection = () => {
        setSection([...section, { "sectionTitle": "", "sectionData": [{"title": "", "description": "", "videoId":""}] }]);
        console.log(section, "Section")
    }

    const removeLecture = (lectureIndex, index) => {
        let rerenderVar = section.slice(); // New Variable to get a new array, not the reference array, for react to rerender
        rerenderVar[lectureIndex].sectionData.splice(index, 1);
        if(rerenderVar[lectureIndex].sectionData.length === 0){
            rerenderVar.splice(lectureIndex, 1);
        }
        setSection(rerenderVar);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    const setVideoId = (lectureIndex, index, videoId) => {
        let lectureList = section;
        lectureList[lectureIndex].sectionData[index].videoId = videoId;
        let renderVal = lectureList.slice();
        setSection(renderVal); 
    }

    const returnFormData = (lectureIndex, index) => {
        const formData = section[lectureIndex].sectionData[index];
        return formData;
    }

    return(
        <form onSubmit={handleSubmit}>
            {
                section.map((lecture, lectureIndex) => {
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
        </form>
    );
}

export default AddCourse;