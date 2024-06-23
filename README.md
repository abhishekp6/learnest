<p>
<img alt="React" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" height="25px"/>
<img alt="MongoDB" src="https://img.shields.io/badge/-MongoDB-13aa52?style=flat-square&logo=mongodb&logoColor=white"  height="25px"/>
<img alt="Nodejs" src="https://img.shields.io/badge/-Nodejs-43853d?style=flat-square&logo=Node.js&logoColor=white"  height="25px"/>
<img alt="Express" src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" height="25px"/>
<img alt="Tailwidcss" src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" height="25px"/>
<img alt="git" src="https://img.shields.io/badge/-Git-F05032?style=flat-square&logo=git&logoColor=white" height="25px"/>
</p>

# Learnest

## About

Learnest is a web application designed for individual course creators. It enables you to create, manage, and display video tutorials to your viewers.

## Features

- **Create Course**: Develop a complete tutorial with multiple subsections, each containing several lectures. Upload videos for each lecture.
- **Update Course**: Modify existing courses using their unique course ID.
- **Delete Course**: Remove a course using its course ID.
- **Login**: Users can log in using their Gmail accounts.
- **Payment**: Purchase courses via the "Enroll" button on each course page, supporting various online payment methods.
- **View Course**: Access uploaded courses on the course page.

## Tech Stack

- **Frontend**: React, Custom CSS, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Video Storage**: api.video
- **Payment Gateway**: Razorpay
- **Authentication**: Google OAuth

## Architecture
![Learnest drawio](https://github.com/abhishekp6/learnest/assets/53012981/03990a76-5300-4ea6-ac6e-36b4a657c53f)

## Database Design
The database contains two main collections:
- Collection 1: Stores Course related details with 'courseId' as index.
- Collection 2: Stores Payment metadata with transactionId.

Validations have been added on schema level for each field.

## Application Screenshots
<img width="1440" alt="Screenshot 2024-06-23 at 6 37 58 PM" src="https://github.com/abhishekp6/learnest/assets/53012981/02d95760-f60d-4077-823d-9fabb2265e4c">
<img width="1440" alt="Screenshot 2024-06-23 at 6 38 13 PM" src="https://github.com/abhishekp6/learnest/assets/53012981/5facb9ea-efb7-4acb-97d1-2ad49737b1f5">
<img width="1440" alt="Screenshot 2024-06-23 at 6 40 13 PM" src="https://github.com/abhishekp6/learnest/assets/53012981/4298a7a2-1eef-4662-99b9-a14d7cf79aba">
<img width="1440" alt="Screenshot 2024-06-23 at 6 40 47 PM" src="https://github.com/abhishekp6/learnest/assets/53012981/c04eb121-296b-4ea9-975f-07d8af19de82">
<img width="1440" alt="Screenshot 2024-06-23 at 6 41 19 PM" src="https://github.com/abhishekp6/learnest/assets/53012981/8d48c213-0972-490d-a8b9-462e44a6789a">
<img width="1440" alt="Screenshot 2024-06-23 at 6 39 57 PM" src="https://github.com/abhishekp6/learnest/assets/53012981/4bc8fdac-9169-4dc2-9f30-d2e12a3597bd">
<img width="1440" alt="Screenshot 2024-06-23 at 6 38 34 PM" src="https://github.com/abhishekp6/learnest/assets/53012981/e8b6c4b3-ca66-4d9b-8b2c-fa43730b764c">

## Project Setup

- Prerequisites: Node 20.X
- Step 1: Clone the repository on your local machine.
- Step 2: Checkout to 'dev' branch.
- Step 3: cd client/
- Step 4: npm i
- Step 5: cd ../server/
- Step 6: npm i
- Step 7: add config/config.env file
- Step 8: Populate config.env with the following variables:
          NODE_ENV=development
          PORT=
          MONGO_URI=
          GET_CUSTOM_VIDEO_UPLOAD_TOKEN_URL=
          RAZORPAY_KEY_ID=
          RAZORPAY_KEY_SECRET=
          VIDEO_API_KEY=
- Step 9: cd ../client/
- Step 10: Create .env file
- Step 11: Populate .env file with the following variables:
            REACT_APP_RAZORPAY_KEY_ID=
            REACT_APP_OAUTH_CLIENT_ID=
- Step 12: run 'npm run start' in client folder and 'npm run dev' in server folder.

  Wallah! That's all, you are all set to contribute.

## Contributions & Support

The project has a scope for improvement at multiple levels and devs are welcome to contribute. Following are the areas where you can contribute:
- Setting up authorization flow in the project. (Authentication is already in place).
- Minor UI level issues on the course page while opening video popups.

- For Contributions, please raise a PR to the 'dev' branch.
