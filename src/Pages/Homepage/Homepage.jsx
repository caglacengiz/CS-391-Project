import React from 'react';
import Link from 'next/link';
import './Homepage.css'

function Homepage() {
    return (
        <div className="Homepage">
            <h1>Hi! I am Berkecan.</h1>
            <h2>I am a research assistant at Ozyegin University.</h2>
            <p>
                Throughout high school I joined numerous workshops, robotic competitions, seminars etc.
                <br/>
                With that background I was awarded with honor scholarship from Ozyegin University when I was in 11th grade.
                <br/>
                While studying at university, I joined OzuRover team and worked on robotic arm while simultaneously mentoring my high school First Robotics Competition team.
                <br/>
                In all of these projects, I worked at interdisciplinary positions such as software development, circuit design etc.
                <br/>
                I am currently working at Interactive Intelligent Systems Lab.

            </p>
        </div>
    );
}

export default Homepage;