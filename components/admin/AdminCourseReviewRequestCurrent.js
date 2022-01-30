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
  reviewing: 'info',
  approved: 'success',
  rejected: 'error',
};

export default function AdminCourseReviewRequestCurrent({
  id,
  userName,
  email,
  status,
  adminComment,
  sendTime,
  onApprove,
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
      <Box sx={{ display: 'flex', gap: 4 }}>
        {status !== 'approved' && (
          <Button color="success" onClick={onApprove}>
            Approve
          </Button>
        )}
        {status !== 'needFixes' && (
          <Button color="error" onClick={onNeedFixes}>
            Need fixes
          </Button>
        )}
      </Box>
    </Card>
  );
}
