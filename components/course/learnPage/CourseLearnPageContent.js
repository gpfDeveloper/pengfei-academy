import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ArticleIcon from '@mui/icons-material/Article';

const Lecture = ({ lecture, currentLecture, setCurrentLecture }) => {
  const { contentType, title } = lecture;
  let startIcon;
  if (contentType === 'video') {
    startIcon = <PlayCircleIcon fontSize="small" />;
  } else {
    startIcon = <ArticleIcon fontSize="small" />;
  }
  return (
    <ListItem>
      <ListItemButton
        selected={lecture.id === currentLecture?.id}
        onClick={() => setCurrentLecture(lecture)}
      >
        <Box sx={{ padding: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          {startIcon}
          <Typography>{title}</Typography>
        </Box>
      </ListItemButton>
    </ListItem>
  );
};

const CourseSection = ({
  section,
  defaultExpanded,
  idx,
  currentLecture,
  setCurrentLecture,
}) => {
  const { title, lectures } = section;
  return (
    <Accordion defaultExpanded={defaultExpanded}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">
          Section {idx + 1}: {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          {lectures.map((lecture) => (
            <Lecture
              key={lecture.id}
              lecture={lecture}
              currentLecture={currentLecture}
              setCurrentLecture={setCurrentLecture}
            />
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

export default function CourseLearnPageContent({
  sections,
  currentLecture,
  setCurrentLecture,
}) {
  return (
    <List
      sx={{
        position: 'relative',
        overflow: 'auto',
        maxHeight: '90vh',
        flex: '0 0 400px',
      }}
    >
      {sections.map((section, idx) => {
        return (
          <CourseSection
            currentLecture={currentLecture}
            setCurrentLecture={setCurrentLecture}
            key={section.id}
            section={section}
            idx={idx}
            defaultExpanded={idx === 0}
          />
        );
      })}
    </List>
  );
}
