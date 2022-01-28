import { Box } from '@mui/material';
import CourseLandingPageContent from './CourseLandingPageContent';
import CourseLandingPageHeader from './CourseLandingPageHeader';

export default function CourseLandingPage({ course }) {
  if (!course) {
    return <></>;
  }
  console.log(course);
  const { author, title, subtitle, language, updatedAt, price, sections } =
    course;
  return (
    <Box sx={{ mt: 12 }}>
      <CourseLandingPageHeader
        title={title}
        subtitle={subtitle}
        author={author}
        language={language}
        updatedAt={updatedAt}
        price={price}
      />
      <CourseLandingPageContent sections={sections} />
    </Box>
  );
}
