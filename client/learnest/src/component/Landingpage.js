import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminPanel from "./AdminPanel/AdminPanel";
import AddCourse from "./AddCourse/AddCourse";
import Payments from "./PaymentIntegration/Payment";
import CoursePage from "./CoursePage/CoursePage";
import ViewAllCourses from "./ViewAllCourses/ViewAllCourses";

const LandingPage = () => {
    return (
        <div>
            <Routes>
                <Route path="/add/course" element={<AddCourse />} />
                <Route path="/update/course/:courseId" element={<AddCourse />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/payment" element={<Payments />} />
                <Route path="/course/:courseId" element={<CoursePage />} />
                <Route path="view/all" element={<ViewAllCourses />} />
            </Routes>
        </div>
    );
}

export default LandingPage;