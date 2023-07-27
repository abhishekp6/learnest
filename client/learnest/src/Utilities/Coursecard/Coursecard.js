import React, { useEffect } from "react";
import './Coursecard.css';

const Coursecard = (props) => {

    useEffect(() => {
        console.log(props);
    }, []);

    return (
        <div className="card">
            <div className="left">
                
            </div>
            <div className="right">
                <h3>{props.data.courseTitle}</h3>
                <p>{props.data.courseOverView}</p>
                <p>Price : {props.data.coursePrice} $</p>
            </div>
        </div>
    );
}

export default Coursecard;