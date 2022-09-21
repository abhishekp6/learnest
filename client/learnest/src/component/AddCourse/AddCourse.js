
import React from "react";
import { useState } from "react";
import CustomUploadButton from "../Upload/CustomUploadButton";

const AddCourse = () => {

    const [chapter, setChapter] = useState([])

    const onFormInput = (index, event) => {
        let newFormValues = [...chapter];
        newFormValues[index][event.target.name] = event.target.value;
        setChapter(newFormValues);
    }

    const addChapter = () => {
        setChapter([...chapter, {"title": "", "description": "", "videoId":""}])
    }

    const removeChapter = (index) => {
        let chapterList = [...chapter];
        chapterList.splice(index, 1);
        setChapter(chapterList);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Submit Pressed", chapter)
    }

    const setVideoId = (index, videoId) => {
        let chapterList = [...chapter];
        chapterList[index].videoId = videoId; 
    }

    const returnFormData = (index) => {
        const formData = [...chapter];
        return formData[index];
    }

    return(
        <form onSubmit={handleSubmit}>
            {
                chapter.map((element, index) => {
                    return(
                        <div key={index}>
                            <input value={element.title} name="title" onChange={(event) => {onFormInput(index, event)}} placeholder="Add Title"></input>
                            <input value={element.description} name="description" onChange={(event) => {onFormInput(index, event)}} placeholder="Add Chapter Description"></input>
                            <CustomUploadButton currentIndexForm={returnFormData} setVideoId={setVideoId} index={index}/>
                            <button onClick={() => {removeChapter(index)}}>Remove Form Field</button>
                        </div>
                    )
                })
            }
            <button onClick={() => {addChapter()}}>Add Chapter</button>
            <button type="submit" placeholder="Submit">Submit</button>
        </form>
    );
}

export default AddCourse;