
import React from "react";
import { useState } from "react";
import VideoUploadButton from "../Upload/Upload_Button";

const AddCourse = () => {

    const [chapter, setChapter] = useState([])

    const onFormInput = (index, event) => {
        let newFormValues = [...chapter];
        newFormValues[index][event.target.name] = event.target.value;
        setChapter(newFormValues);
    }

    const addChapter = () => {
        setChapter([...chapter, {"title": "", "description": "", "videoUrl":""}])
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

    const setVideoUrl = (index, url) => {
        let chapterList = [...chapter];
        chapterList[index].videoUrl = url; 
    }

    return(
        <form onSubmit={handleSubmit}>
            {
                chapter.map((element, index) => {
                    return(
                        <div key={index}>
                            <input value={element.title} name="title" onChange={(event) => {onFormInput(index, event)}} placeholder="Add Title"></input>
                            <input value={element.description} name="description" onChange={(event) => {onFormInput(index, event)}} placeholder="Add Chapter Description"></input>
                            <VideoUploadButton setVideoUrl={setVideoUrl} index={index}/>
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