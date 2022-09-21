const ApiVideoClient =  require('@api.video/nodejs-client')
const Crypt = require('hybrid-crypto-js').Crypt;
const axios = require('axios');

exports.getCustomUploadToken = async (req, res, next) => {
  try {
    const tokenApiResponse = await axios.post(process.env.GET_CUSTOM_VIDEO_UPLOAD_TOKEN_URL, {"apiKey": process.env.VIDEO_API_KEY});
    const customUploadToken = tokenApiResponse?.data?.access_token ? tokenApiResponse.data.access_token : ""; 
    res.status(200).send({"statusMessage": "Token Fetched Successfully", "customUploadToken": customUploadToken});
  } catch (error) {
    console.log(error);
    res.status(500).send({"statusMessage": "Internal Server Error", "errorMessage": error});
  }
}