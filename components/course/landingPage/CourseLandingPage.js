import { Box } from '@mui/material';
import CourseLandingPageContent from './CourseLandingPageContent';
import CourseLandingPageDesc from './CourseLandingPageDesc';
import CourseLandingPageForWho from './CourseLandingPageForWho';
import CourseLandingPageHeader from './CourseLandingPageHeader';
import CourseLandingPageInstructor from './CourseLandingPageInstructor';
import CourseLandingPageLearnObjs from './CourseLandingPageLearnObjs';
import CourseLandingPagePreReqs from './CourseLandingPagePreReqs';

export default function CourseLandingPage({ course }) {
  if (!course) {
    return <></>;
  }
  const {
    author,
    title,
    subtitle,
    language,
    authorUpdatedAt,
    price,
    sections,
    learningObjectives,
    prerequisites,
    description,
    courseForWho,
    image,
    promoVideo,
  } = course;
  const thumbnail = image?.s3Location;

  return (
    <Box sx={{ mt: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
      <CourseLandingPageHeader
        title={title}
        subtitle={subtitle}
        author={author}
        language={language}
        updatedAt={authorUpdatedAt}
        price={price}
        thumbnail={thumbnail}
        promoVideoS3Key={promoVideo?.s3Key}
      />
      <CourseLandingPageLearnObjs objectives={learningObjectives} />
      <CourseLandingPageContent sections={sections} />
      <CourseLandingPagePreReqs preReqs={prerequisites} />
      <CourseLandingPageDesc description={description} />
      <CourseLandingPageForWho forWho={courseForWho} />
      <CourseLandingPageInstructor instructor={author} />
    </Box>
  );
}
