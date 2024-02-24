import React from "react";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";

const Homepage = () => {

    let navigate = useNavigate();
  return (
    <div className="App">
      <header>
        <nav>
          <div className="container">
            <h1>Learnest</h1>
            <ul>
              <li>
                <a href="">About</a>
              </li>
              <li>
                <a href="">Contact</a>
              </li>
              <li>
                <a href="" onClick={() => {navigate('/admin')}}>Admin panel</a>
              </li>
              <li>
                <a href="" onClick={() => {navigate('/login')}}>Login</a>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <section className="hero">
        <div className="container">
          <h2>Learn Anything, Anytime, Anywhere</h2>
          <p>
            Take your skills to the next level with our wide range of courses.
          </p>
          <a href="" onClick={() => {navigate('/view/all')}} className="btn btn-primary">
            Browse Courses
          </a>
        </div>
      </section>

      <section className="featured-courses">
        <div className="container">
          <h3>Featured Courses</h3>
          <div className="course">
            <img src="course1.jpg" alt="Course 1" />
            <h4>Course Title 1</h4>
            <p>Description of course 1</p>
            <a href="#" className="btn btn-secondary">
              Enroll Now
            </a>
          </div>
          <div className="course">
            <img src="course2.jpg" alt="Course 2" />
            <h4>Course Title 2</h4>
            <p>Description of course 2</p>
            <a href="#" className="btn btn-secondary">
              Enroll Now
            </a>
          </div>
          <div className="course">
            <img src="course3.jpg" alt="Course 3" />
            <h4>Course Title 3</h4>
            <p>Description of course 3</p>
            <a href="#" className="btn btn-secondary">
              Enroll Now
            </a>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <p>&copy; 2024 Course Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
