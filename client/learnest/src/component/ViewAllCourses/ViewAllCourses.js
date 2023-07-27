import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import environment from "../../config/Config";
import Coursecard from "../../Utilities/Coursecard/Coursecard";

const ViewAllCourses = () => {

    const [ courseData, setCourseData ] = useState([]);

    const getAllCourseData = async () => {
        let url = environment.GET_ALL_COURSE;
        let courseDataRes = await axios.get(url);
        console.log(courseDataRes.data.data, "COURSEDATA")
        setCourseData(courseDataRes.data.data);
        console.log(courseData, "COURSEDATA")
    }

    useEffect(() => {
        getAllCourseData();
    }, []);

    return(
        <div>
            <h1>View All Courses</h1>
            <div>
                {
                    courseData.map((course) => {
                        return(
                            <div key={course._id}>
                                <Coursecard data={course} />
                            </div>
                        );
                    })
                }
            </div>
        </div>
    )
}

export default ViewAllCourses;