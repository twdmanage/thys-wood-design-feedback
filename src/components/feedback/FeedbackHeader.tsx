
import React from 'react';

const FeedbackHeader = () => {
  return (
    <div className="text-center">
      <img
        src="https://res.cloudinary.com/dlsjdyti8/image/upload/v1745065446/2023-10-16_TWD_Logo_Brown_j64mn0.png"
        alt="Thys Wood Design Logo"
        className="mx-auto h-24 mb-4"
      />
      <h1 className="text-3xl font-semibold mb-2">Share Your Feedback</h1>
      <p className="text-muted-foreground">
        Your valuable input helps us to improve our products.
      </p>
    </div>
  );
};

export default FeedbackHeader;
