import React from 'react';
import Img from './assets/ready-to-launch.png'

const About = () => {
    return (
        <div className="launch">
            <h1>About</h1>
            <h4>Still waiting for launch</h4>
            <img src={Img} alt="ready-to-launch" width="400px" height="400px"/></div>
    );
}

export default About