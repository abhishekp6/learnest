import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import environment from "../../config/Config";

const CustomUploadButton = () => {

    const [customUploadToken, setCustomUploadToken] = useState("");
    
    const getCustomUploadToken = async () => {
        try {
            const customUploadTokenResponse = await axios.get(environment.GET_CUSTOM_UPLOAD_TOKEN);
            let customToken = customUploadTokenResponse?.data?.customUploadToken ? customUploadTokenResponse.data.customUploadToken : "";
            setCustomUploadToken(customToken);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getCustomUploadToken();
    }, []);

    return(
        <div>
            <button>Upload Here</button>
        </div>
    );
}

export default CustomUploadButton;