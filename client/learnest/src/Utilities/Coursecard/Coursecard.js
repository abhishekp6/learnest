import React from "react";
import './Coursecard.css';

const Coursecard = (props) => {

    return (
        <div className="card">
            <div className="leftCard">
                
            </div>
            <div className="rightCard">
                <h3>{props.data.courseTitle}</h3>
                <p>{props.data.courseOverView}</p>
                <p>Price : {props.data.coursePrice} $</p>
            </div>
        </div>
    );
}

export default Coursecard;