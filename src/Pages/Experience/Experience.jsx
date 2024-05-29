import React from 'react';
import "./Experience.css"

function Experience() {
    return (
        <div className="timeline-container">
            <img className="image" src="/arrow.png" alt="arrow" />
            <div className="timeline">
                <div className="event" data-year="2018">
                    <div className="event-dot"></div>
                    <div className="event-content right-content">
                        <p>Cymurghs / Member</p>
                    </div>
                </div>
                <div className="event" data-year="2019">
                    <div className="event-dot"></div>
                    <div className="event-content left-content">
                        <p>Cymurghs / Mentor - Educator</p>
                    </div>
                </div>
                <div className="event" data-year="2021">
                    <div className="event-dot"></div>
                    <div className="event-content right-content">
                        <p>Albef Spor Teknolojileri A.Ş. / Research And Development Associate</p>
                    </div>
                </div>
                <div className="event" data-year="now">
                    <div className="event-dot"></div>
                    <div className="event-content left-content">
                        <p>Interactive Intelligent Systems Lab / Research Assistant</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Experience;