'use client'

import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner: React.FC = () => {
    return (
        <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading projects...</p>
        </div>
    );
};

export default LoadingSpinner;