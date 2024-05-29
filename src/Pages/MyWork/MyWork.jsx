import React from 'react';
import './MyWork.css';

function MyWork () {
    return (
        <div>
            <section className="work-item">
                <div className="work-description">
                    <h2 className="project-title">CHIST-ERA EXPECTATION Project</h2>
                    <p className="project-brief">A European Union project on Explainable AI funded by TUBITAK</p>
                </div>
                <div className="work-image">
                    <img src="/project1.jpeg" alt="Project Image" />
                </div>
            </section>

            <section className="work-item reverse-layout">
                <div className="work-image">
                    <img src="/project2.jpeg" alt="Project Image" />
                </div>
                <div className="work-description">
                    <h2 className="project-title">Multimodal Negotiation Project</h2>
                    <p className="project-brief">Research trip to Luxembourg within the scope of the European Union project</p>
                </div>
            </section>
        </div>
    );
}

export default MyWork;