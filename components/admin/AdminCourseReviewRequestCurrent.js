import Link from 'next/link';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  Card,
  Typography,
  Box,
  Button,
  TextField,
  Tooltip,
  Badge,
  Divider,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import ArticleIcon from '@mui/icons-material/Article';

const statusColorMap = {
  Reviewing: 'info',
  Approved: 'success',
  NeedFixes: 'error',
};

export default function AdminCourseReviewRequestCurrent({
  id,
  courseId,
  courseTitle,
  userName,
  email,
  status,
  conversationId,
  adminComment,
  sendTime,
  onApproveAndPublish,
  onNeedFixes,
  onSendComment,
  adminCommentRef,
}) {
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down('md'));
  const rowStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: isBelowMd ? 'column' : 'row',
    gap: 4,
  };
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: 4,
        gap: 4,
        mt: 4,
        '& p': {
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        },
        wordBreak: 'break-word',
      }}
    >
      <Badge badgeContent={status} color={statusColorMap[status]}></Badge>
      <Box sx={rowStyle}>
        <Typography>
          {' '}
          <Tooltip title="Id">
            <ArticleIcon />
          </Tooltip>{' '}
          {id}
        </Typography>
        <Typography>
          <Tooltip title="Sent Time">
            <SendIcon />
          </Tooltip>{' '}
          {sendTime}
        </Typography>
      </Box>
      <Divider />
      <Box sx={rowStyle}>
        <Typography>
          {' '}
          <Tooltip title="CourseId">
            <ArticleIcon />
          </Tooltip>{' '}
          {courseId}
        </Typography>
        <Typography>
          <Tooltip title="Course Title">
            <ArticleIcon />
          </Tooltip>{' '}
          {courseTitle}
        </Typography>
      </Box>
      <Divider />
      <Box sx={rowStyle}>
        <Typography>
          {' '}
          <Tooltip title="User Name">
            <PersonIcon />
          </Tooltip>{' '}
          {userName}
        </Typography>
        <Typography>
          {' '}
          <Tooltip title="Email">
            <EmailIcon />
          </Tooltip>{' '}
          {email}
        </Typography>
      </Box>
      <Divider />
      <Box sx={rowStyle}>
        <Link
          href={{ pathname: '/course/draft/[courseId]', query: { courseId } }}
          passHref
        >
          <a target="_blank">
            <Button size="large" variant="contained">
              Course landing page
            </Button>
          </a>
        </Link>
        <Link
          href={{
            pathname: '/course/draft/[courseId]/learn',
            query: { courseId },
          }}
          passHref
        >
          <a target="_blank">
            <Button size="large" variant="contained">
              Course learn page
            </Button>
          </a>
        </Link>
      </Box>
      <Divider />
      <Box
        component="form"
        onSubmit={onSendComment}
        sx={{ display: 'flex', alignItems: 'center', gap: 4 }}
      >
        <TextField
          id="adminComment"
          label="Admin comment"
          fullWidth
          multiline
          rows={4}
          defaultValue={adminComment}
          inputRef={adminCommentRef}
        />
        <Button type="submit" color="info">
          Update Comment
        </Button>
      </Box>
      <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
        {status !== 'approved' && (
          <Button color="success" onClick={onApproveAndPublish}>
            Approve and publish
          </Button>
        )}
        {status !== 'needFixes' && (
          <Button color="error" onClick={onNeedFixes}>
            Need fixes
          </Button>
        )}
        <Link
          href={{
            pathname: '/message/[conversationId]',
            query: { conversationId },
          }}
          passHref
        >
          <a target="_blank">
            <Button size="large" variant="outlined">
              Message user
            </Button>
          </a>
        </Link>
      </Box>
    </Card>
  );
}
