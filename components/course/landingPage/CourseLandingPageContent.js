import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ArticleIcon from '@mui/icons-material/Article';

const Lecture = ({ lecture }) => {
  const { contentType, title } = lecture;
  let startIcon;
  if (contentType === 'video') {
    startIcon = <PlayCircleIcon fontSize="small" />;
  } else {
    startIcon = <ArticleIcon fontSize="small" />;
  }
  return (
    <>
      <Divider />
      <Box sx={{ padding: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        {startIcon}
        <Typography>{title}</Typography>
      </Box>
    </>
  );
};

const CourseSection = ({ section }) => {
  const { title, lectures } = section;
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {lectures.map((lecture) => (
          <Lecture key={lecture.id} lecture={lecture} />
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

export default function CourseLandingPageContent({ sections }) {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" mb={2}>
        Course content
      </Typography>
      {sections.map((section) => (
        <CourseSection key={section.id} section={section} />
      ))}
    </Box>
  );
}
