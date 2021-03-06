import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { submitForReviewAsync } from 'store/course-async';
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography,
} from '@mui/material';
import MuiCheckIcon from '@mui/icons-material/Check';
import MuiCloseIcon from '@mui/icons-material/Close';
import Tips from 'components/UIs/Tips';
import { COURSE_REVIEW_STATUS } from 'utils/constants';

const CheckIcon = () => <MuiCheckIcon color="success" />;
const CloseIcon = () => <MuiCloseIcon color="error" />;

export default function PublishingSubmitForReview() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const course = useSelector((state) => state.course);
  const user = useSelector((state) => state.user);
  const { token } = user;
  const {
    learningObjectives,
    prerequisites,
    courseForWho,
    sections,
    title,
    subtitle,
    category,
    subcategory,
    description,
    price,
    reviewStatus,
    id: courseId,
  } = course;
  let lecutureCount = 0;
  const isNeedFixes = reviewStatus === COURSE_REVIEW_STATUS.needsFixes;
  for (const section of sections) {
    lecutureCount += section.lectures.length;
  }
  const verifyResults = {
    intendedLearners: [
      {
        content:
          'You must enter at least 4 learning objectives or outcomes that learners can expect to achieve after completing your course.',
        hasError: learningObjectives.length < 4,
      },
      {
        content:
          'List the required skills, experience, tools or equipment learners should have prior to taking your course. If there are no requirements, use this space as an opportunity to lower the barrier for beginners.',
        hasError: prerequisites.length < 1,
      },
      {
        content:
          'Write a clear description of the intended learners for your course who will find your course content valuable.',
        hasError: courseForWho.length < 1,
      },
    ],
    curriculum: [
      {
        content: 'At least 5 separate lectures',
        hasError: lecutureCount < 5,
      },
    ],
    courseLandingPage: [
      {
        content: 'Course title is required',
        hasError: title.length < 1,
      },
      {
        content: 'Course subtitle is required',
        hasError: subtitle.length < 1,
      },
      {
        content: 'Course category is required',
        hasError: category.length < 1,
      },
      {
        content: 'Course subcategory is required',
        hasError: subcategory.length < 1,
      },
      {
        content: 'Course description is required',
        hasError: description.length < 1,
      },
    ],
    pricing: [
      {
        content: 'Price must be set',
        hasError: price === '',
      },
    ],
  };

  let hasError = false;
  for (const key in verifyResults) {
    const results = verifyResults[key];
    for (const result of results) {
      if (result.hasError) {
        hasError = true;
        break;
      }
    }
    if (hasError) break;
  }

  const submitForReviewHandler = async () => {
    setLoading(true);
    await dispatch(submitForReviewAsync({ token, courseId }));
    setLoading(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {isNeedFixes && (
        <Box>
          <Typography color="error">
            Your course is need fixes, please fix the issues before resubmit for
            review, you can contact Pengfei if you have any questions.
          </Typography>
        </Box>
      )}
      <Typography variant="h6">
        All the requirements you need to complete, before submit for review:
      </Typography>
      <Box>
        <List subheader={<ListSubheader> Intended learners</ListSubheader>}>
          {verifyResults.intendedLearners.map((item) => (
            <ListItem key={item.content}>
              <ListItemIcon>
                {item.hasError ? <CloseIcon /> : <CheckIcon />}
              </ListItemIcon>
              <ListItemText primary={item.content} />
            </ListItem>
          ))}
        </List>
        <List subheader={<ListSubheader>Curriculum</ListSubheader>}>
          {verifyResults.curriculum.map((item) => (
            <ListItem key={item.content}>
              <ListItemIcon>
                {item.hasError ? <CloseIcon /> : <CheckIcon />}
              </ListItemIcon>
              <ListItemText primary={item.content} />
            </ListItem>
          ))}
        </List>
        <List subheader={<ListSubheader>Course landing page</ListSubheader>}>
          {verifyResults.courseLandingPage.map((item) => (
            <ListItem key={item.content}>
              <ListItemIcon>
                {item.hasError ? <CloseIcon /> : <CheckIcon />}
              </ListItemIcon>
              <ListItemText primary={item.content} />
            </ListItem>
          ))}
        </List>
        <List subheader={<ListSubheader>Pricing</ListSubheader>}>
          {verifyResults.pricing.map((item) => (
            <ListItem key={item.content}>
              <ListItemIcon>
                {item.hasError ? <CloseIcon /> : <CheckIcon />}
              </ListItemIcon>
              <ListItemText primary={item.content} />
            </ListItem>
          ))}
        </List>
      </Box>
      <Button
        size="large"
        variant="contained"
        disabled={hasError || loading}
        onClick={submitForReviewHandler}
      >
        Submit for review
      </Button>
      <Tips
        title="For Your Information"
        content={
          <Typography>
            Your course will be published on the marketplace automatically after
            review.
          </Typography>
        }
      />
    </Box>
  );
}
