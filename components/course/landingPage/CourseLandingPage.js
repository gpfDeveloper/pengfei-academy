import { Box } from '@mui/material';
import CourseLandingPageContent from './CourseLandingPageContent';
import CourseLandingPageHeader from './CourseLandingPageHeader';
import CourseLandingPageLearnObjs from './CourseLandingPageLearnObjs';

export default function CourseLandingPage({ course }) {
  if (!course) {
    return <></>;
  }
  console.log(course);
  const {
    author,
    title,
    subtitle,
    language,
    updatedAt,
    price,
    sections,
    learningObjectives,
  } = course;
  return (
    <Box sx={{ mt: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
      <CourseLandingPageHeader
        title={title}
        subtitle={subtitle}
        author={author}
        language={language}
        updatedAt={updatedAt}
        price={price}
      />
      <CourseLandingPageLearnObjs objectives={learningObjectives} />
      <CourseLandingPageContent sections={sections} />
    </Box>
  );
}
