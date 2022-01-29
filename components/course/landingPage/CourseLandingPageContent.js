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

const CourseSection = ({ section, defaultExpanded }) => {
  const { title, lectures } = section;
  return (
    <Accordion defaultExpanded={defaultExpanded}>
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

const ContentSummary = ({ sections }) => {
  const sectionLength = sections.length;
  let lectureLength = 0;
  for (const section of sections) {
    lectureLength += section.lectures.length;
  }
  return (
    <Box>
      <Typography variant="body2">{`${sectionLength} sections • ${lectureLength} lectures`}</Typography>
    </Box>
  );
};

export default function CourseLandingPageContent({ sections }) {
  return (
    <Box>
      <Typography variant="h4" mb={2}>
        Course content
      </Typography>
      <ContentSummary sections={sections} />
      {sections.map((section, idx) => {
        return (
          <CourseSection
            key={section.id}
            section={section}
            defaultExpanded={idx === 0}
          />
        );
      })}
    </Box>
  );
}
