import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminPanel from "./AdminPanel/AdminPanel";
import AddCourse from "./AddCourse/AddCourse";

const LandingPage = () => {
    return (
        <div>
            <Routes>
                <Route path="/add/Course" element={<AddCourse />} />
                <Route path="/admin" element={<AdminPanel />} />
            </Routes>
        </div>
    );
}

export default LandingPage;