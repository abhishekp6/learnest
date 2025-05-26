<p align="center">
  <img alt="React" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" height="25px"/>
  <img alt="MongoDB" src="https://img.shields.io/badge/-MongoDB-13aa52?style=for-the-badge&logo=mongodb&logoColor=white"  height="25px"/>
  <img alt="Node.js" src="https://img.shields.io/badge/-Nodejs-43853d?style=for-the-badge&logo=Node.js&logoColor=white"  height="25px"/>
  <img alt="Express.js" src="https://img.shields.io/badge/Express.js-404d59?style=for-the-badge&logo=express&logoColor=61DAFB" height="25px"/>
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" height="25px"/>
  <img alt="Git" src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" height="25px"/>
  <img alt="ESLint" src="https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white" height="25px"/>
</p>

<h1 align="center">📚 Learnest</h1>
<p align="center">
  A full-stack video course platform for individual creators.
</p>

---

## 🚀 About

**Learnest** is a modern web application built for individual course creators to easily upload, manage, and deliver video-based courses to their audience. It includes secure authentication, payment gateway integration, and seamless video streaming.

---

## ✨ Features

- 🎥 **Create Course** – Upload multi-section, multi-lecture tutorials.
- ✏️ **Update Course** – Edit existing courses using their unique ID.
- ❌ **Delete Course** – Remove a course via its course ID.
- 🔐 **Google OAuth Login** – Easy authentication using Gmail.
- 💳 **Razorpay Integration** – Purchase and enroll in courses securely.
- 📺 **Watch Courses** – Users can view purchased/uploaded courses.

---

## 🛠️ Tech Stack

| Layer       | Technologies                          |
|-------------|---------------------------------------|
| Frontend    | React, Tailwind CSS, Custom CSS       |
| Backend     | Node.js, Express.js                   |
| Database    | MongoDB                               |
| Video       | [api.video](https://api.video/)       |
| Payments    | Razorpay                              |
| Auth        | Google OAuth                          |
| Code Style  | ESLint                                |

---

## 🧩 Architecture

![Learnest Architecture](https://github.com/abhishekp6/learnest/assets/53012981/03990a76-5300-4ea6-ac6e-36b4a657c53f)

---

## 🗂️ Database Design

- **Courses Collection**
  - Indexed by `courseId`
  - Contains all metadata and structured content
- **Payments Collection**
  - Stores payment metadata indexed by `transactionId`

> ✅ Mongoose schema validations are in place to ensure data integrity.

---

## 🖼️ Screenshots

| Preview |
|--------|
| <img width="1440" alt="Screenshot 1" src="https://github.com/abhishekp6/learnest/assets/53012981/02d95760-f60d-4077-823d-9fabb2265e4c"> |
| <img width="1440" alt="Screenshot 2" src="https://github.com/abhishekp6/learnest/assets/53012981/5facb9ea-efb7-4acb-97d1-2ad49737b1f5"> |
| <img width="1440" alt="Screenshot 3" src="https://github.com/abhishekp6/learnest/assets/53012981/4298a7a2-1eef-4662-99b9-a14d7cf79aba"> |
| <img width="1440" alt="Screenshot 4" src="https://github.com/abhishekp6/learnest/assets/53012981/c04eb121-296b-4ea9-975f-07d8af19de82"> |
| <img width="1440" alt="Screenshot 5" src="https://github.com/abhishekp6/learnest/assets/53012981/8d48c213-0972-490d-a8b9-462e44a6789a"> |
| <img width="1440" alt="Screenshot 6" src="https://github.com/abhishekp6/learnest/assets/53012981/4bc8fdac-9169-4dc2-9f30-d2e12a3597bd"> |
| <img width="1440" alt="Screenshot 7" src="https://github.com/abhishekp6/learnest/assets/53012981/e8b6c4b3-ca66-4d9b-8b2c-fa43730b764c"> |

---

## ⚙️ Getting Started

### Prerequisites

- Node.js v20.x
- npm

### 🧑‍💻 Installation

```bash
# Clone the repository
git clone https://github.com/abhishekp6/learnest.git
cd learnest

# Switch to dev branch
git checkout dev

# Frontend Setup
cd client/
npm install

# Backend Setup
cd ../server/
npm install

# Server config
NODE_ENV=development
PORT=
MONGO_URI=
GET_CUSTOM_VIDEO_UPLOAD_TOKEN_URL=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
VIDEO_API_KEY=

# Client config
REACT_APP_RAZORPAY_KEY_ID=
REACT_APP_OAUTH_CLIENT_ID=

# Run Server
cd server
npm run dev

# Run client
cd client
npm start

```

## 🤝 Contributing

We welcome contributions to improve **Learnest**! Follow the steps below to get started:

### Guidelines

1. **Fork** the repository and **clone** your fork.
2. Create a new **branch** for your feature or bugfix.
3. Make sure your code follows **ESLint** conventions.
4. Raise a **pull request** to the `dev` branch.
5. Check the [Issues](../../issues) tab to find something to work on!

## 🌟 Support

If you found this project helpful:

- Leave a ⭐️ on the repo
- Share it with others who might benefit from it

For feedback, suggestions, or collaboration ideas, feel free to:

- Open an issue
- Or contact the maintainer directly

