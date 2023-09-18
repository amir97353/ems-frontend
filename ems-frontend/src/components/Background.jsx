// src/Background.js
import React from 'react';
import './Background.css'; // Make sure to create this CSS file

const Background = () => {
    return (
        <body className='background'>
            <div className="glowing">
                <span style={{ '--i': 1 }}></span>
                <span style={{ '--i': 2 }}></span>
                <span style={{ '--i': 3 }}></span>
            </div>
            <div className="glowing">
                <span style={{ '--i': 1 }}></span>
                <span style={{ '--i': 2 }}></span>
                <span style={{ '--i': 3 }}></span>
            </div>
            <div className="glowing">
                <span style={{ '--i': 1 }}></span>
                <span style={{ '--i': 2 }}></span>
                <span style={{ '--i': 3 }}></span>
            </div>
            <div className="glowing">
                <span style={{ '--i': 1 }}></span>
                <span style={{ '--i': 2 }}></span>
                <span style={{ '--i': 3 }}></span>
            </div>
        </body>
    );
};

export default Background;
