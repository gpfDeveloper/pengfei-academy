import React from 'react';

export default function CourseLandingPage({ course }) {
  if (!course) {
    return <></>;
  }
  console.log(course);
  return <div>CourseLandingPage</div>;
}
