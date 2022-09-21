import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import environment from "../../config/Config";

const CustomUploadButton = (props) => { 

    const [customUploadToken, setCustomUploadToken] = useState("");
    const [file, setFile] = useState(null);

    useEffect(() => {
        getCustomUploadToken();
    }, []);
    
    const getCustomUploadToken = async () => {
        try {
            const customUploadTokenResponse = await axios.get(environment.GET_CUSTOM_UPLOAD_TOKEN);
            let customToken = customUploadTokenResponse?.data?.customUploadToken ? customUploadTokenResponse.data.customUploadToken : "";
            setCustomUploadToken(customToken);
        } catch (error) {
            console.log(error);
        }
    }

    const handleOnChange = (event) => {
        event.preventDefault();
        console.log(event.target.files[0], "Onchange")
        setFile(event.target.files[0]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Get Current Index Video Data
        const videoData = props.currentIndexForm(props.index);

        //Create Video
        const options = {
            headers: {
                "Authorization": `Bearer ${customUploadToken}`
            }
        }
        const createVideoResponse = await axios.post(environment.API_VIDEO_BASE, {"title": `${videoData.title}`, "public": false }, {...options} );
        let resVideoId = createVideoResponse?.data?.videoId ? createVideoResponse.data.videoId : "";
        
        //Upload Video
        const uploadOptions = {
            headers: {
                "Authorization": `Bearer ${customUploadToken}`,
                "Content-Type": "multipart/form-data"
            }
        }
        const formData = new FormData();
        formData.append("file", file);
        const uploadVideoResponse = await axios.post(`${environment.API_VIDEO_BASE}/${resVideoId}/source`, formData, {...options});
        if(uploadVideoResponse && uploadVideoResponse.status === 201){
            props.setVideoId(props.index, resVideoId);
        }
    }

    return(
        <>
            <input type="file" onChange={handleOnChange}/>
            <button onClick={handleSubmit}>Upload</button>
        </>
    );
}

export default CustomUploadButton;