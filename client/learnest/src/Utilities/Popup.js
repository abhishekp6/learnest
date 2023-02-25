import React, { useEffect, useState } from "react";
import './Popup.css';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import environment from "../config/Config";

const Popup = (props) => {

    const [videoUrl, setVideoUrl] = useState("");

    useEffect(() => {
        getVideo();
    }, [props]);

    //Get fresh token
    const getVideo = async () => {
        let tokenData = await axios.get(environment.GET_CUSTOM_UPLOAD_TOKEN);
        let token = tokenData?.data?.customUploadToken;

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        
        const videoData = await axios.get(`${environment.API_VIDEO_BASE}/${props.videoId}`, config);
        const videoUrl = videoData?.data?.assets?.mp4;
        setVideoUrl(videoUrl);
    }

    return (props.trigger) ? (
        <div className="mainPopup">
            <div>
            <div className="closeButton">
                <CloseIcon fontSize="large" onClick={ () => { props.closePopup() } } />
            </div>
            <video className="videoClass" controls >
                <source src={videoUrl} type="video/mp4"/>
            </video>
            </div>
        </div>
    ) : "";
}

export default Popup;