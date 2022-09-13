import { UploadButton } from "@api.video/react-upload-button"
import axios from 'axios';
import { useEffect, useState } from "react";
import { Crypt, RSA } from 'hybrid-crypto-js';
import environment from "../../config/Config";

const VideoUploadButton = (prop) => {

    const [token, setToken]=useState("");

    const getToken = async () => {
        try {
            // Initialize RSA-class
            var rsa = new RSA();
            var crypt = new Crypt();
                        
            // Generate RSA key pair, default key size is 4096 bit
            rsa.generateKeyPair( async function(keyPair) {
                // Callback function receives new key pair as a first argument
                var publicKey = keyPair.publicKey;
                var privateKey = keyPair.privateKey;

                const uploadToken = await axios.post(environment.GET_TOKEN_URL, {"key": publicKey});
                let encryptedToken = uploadToken?.data?.token ? uploadToken.data.token : ""; 
                // Decrypt Token
                var decryptedToken = crypt.decrypt(privateKey, encryptedToken);
                setToken(decryptedToken.message);
                console.log("TOKEN_RECEIVED")
            });
        } catch (error) {
            console.log(error)
        }
    }

    const getVideoUrl = async (videoId) => {
        try {
            let response = await axios.post(`${environment.GET_VIDEO_URL}`, {"videoId": videoId});
            console.log(response.data.videoUrl, "VIDEO_URL");
            return response.data.videoUrl;
        } catch (error) {
            console.log("ERROR_WHILE_GETTING_VIDEO_URL", error);
        }
    }

    const onUploadSuccess = async (video) => {
        // Save Video URL in DB
        let videoUrl = await getVideoUrl(video.videoId);
        // Set VideoURL in parent component course form
        prop.setVideoUrl(prop.index, videoUrl);
    }

    useEffect(() => {
        getToken();
    }, []);
    
  return (
    <UploadButton uploadToken={token}
        onUploadProgress={(progress) => console.log(progress.uploadedBytes)}
        onUploadSuccess={ (video) => {onUploadSuccess(video)} }
        onUploadError={(errorMessage) => console.log(errorMessage)}>
    Upload Video
    </UploadButton>
    );
}

export default VideoUploadButton;