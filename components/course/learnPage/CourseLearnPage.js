import { useState } from 'react';
import { Box } from '@mui/material';
import CourseLearnPageContentBar from './CourseLearnPageContentBar';
import CourseLearnPageLecture from './CourseLearnPageLecture';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function CourseLearnPage({ course }) {
  const [currentLecture, setCurrentLecture] = useState(
    course?.sections[0]?.lectures[0]
  );
  const theme = useTheme();
  const isBelowLg = useMediaQuery(theme.breakpoints.down('lg'));
  if (!course) {
    return <></>;
  }
  const { sections } = course;
  return (
    <Box sx={{ display: 'flex', flexDirection: isBelowLg ? 'column' : 'row' }}>
      <CourseLearnPageLecture lecture={currentLecture} />
      <CourseLearnPageContentBar
        sections={sections}
        currentLecture={currentLecture}
        setCurrentLecture={setCurrentLecture}
      />
    </Box>
  );
}
