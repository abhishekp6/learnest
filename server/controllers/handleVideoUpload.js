const ApiVideoClient =  require('@api.video/nodejs-client')
const Crypt = require('hybrid-crypto-js').Crypt;
const axios = require('axios');

// GET Upload Tokens 
// @method GET
// @route /api/v1/get/token/upload

exports.getUploadToken = async (req, res, next) => {
  const client = new ApiVideoClient({
    apiKey: process.env.VIDEO_API_KEY
  })
    const publicKey = req.body.key; // Used for encryption of token
    try {
        if (req.method === 'POST') {
          let uploadTokensList = await client.uploadTokens.list();
          if(uploadTokensList.data.length == 0){
            await client.uploadTokens.createToken();
            uploadTokensList = await client.uploadTokens.list()
          }
          let token  = uploadTokensList.data[0].token;
          
          // Encrypt Token
          var crypt = new Crypt();
          let encryptedToken = crypt.encrypt(publicKey, token);

          res.status(200).send({ "token": encryptedToken })
        }
        else{
          res.status(405).send('METHOD NOT ALLOWED');
        }
      } catch (error) {
        console.log("INTERNAL_SERVER_ERROR", error);
        res.status(401).send({"error": error});
      }
}

// GET Upload Tokens
// @method GET
// @route /api/v1/get/token/upload

exports.getVideoUrl = async (req, res, next) => {

  const client = new ApiVideoClient({
    apiKey: process.env.VIDEO_API_KEY // It retrieves your API key from .env.development
  })
  try {
      const videoUrl = await client.videos.get(req.body.videoId);
      res.status(200).send({"Status": "Success", "videoUrl": videoUrl.assets.mp4})
    } catch (error) {
      res.status(401).send(error)
    }
    
}

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