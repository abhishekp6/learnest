
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
        setChapter([...chapter, {"title": "", "description": ""}])
    }

    const removeChapter = (index) => {
        let chapterList = [...chapter];
        chapterList.splice(index, 1);
        setChapter(chapterList);
    }

    return(
        <div>
            {
                chapter.map((element, index) => {
                    return(
                        <div key={index}>
                            <form>
                                <input value={element.title} name="title" onChange={(event) => {onFormInput(index, event)}} placeholder="Add Title"></input>
                                <input value={element.description} name="description" onChange={(event) => {onFormInput(index, event)}} placeholder="Add Chapter Description"></input>
                            </form>
                            <VideoUploadButton />
                            <button onClick={() => {removeChapter(index)}}>Remove Form Field</button>
                        </div>
                    )
                })
            }
            <button onClick={() => {addChapter()}}>Add Chapter</button>
        </div>
    );
}

export default AddCourse;