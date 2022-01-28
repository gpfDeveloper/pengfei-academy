import React from 'react';

export default function CourseLearnPage({ course }) {
  if (!course) {
    return <></>;
  }
  console.log(course);
  return <div>Course learn page</div>;
}
