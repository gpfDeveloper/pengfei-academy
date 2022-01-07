import {
  Card,
  Typography,
  Box,
  Button,
  TextField,
  Tooltip,
  Badge,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import EventIcon from '@mui/icons-material/Event';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import MessageIcon from '@mui/icons-material/Message';
import ArticleIcon from '@mui/icons-material/Article';

const statusColorMap = {
  draft: 'info',
  approved: 'success',
  reject: 'error',
};

export default function AdminTechRequestCurrent({
  id,
  userName,
  email,
  status,
  hasMeeting,
  skypeName,
  message,
  adminComment,
  sendTime,
  onApprove,
  onReject,
  onUpdateHasMeeting,
  onSendComment,
  adminCommentRef,
}) {
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: 4,
        gap: 4,
        mt: 4,
        '& p': {
          borderBottom: '1px solid grey',
          pb: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        },
      }}
    >
      <Badge badgeContent={status} color={statusColorMap[status]}></Badge>
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
      <Typography>
        {' '}
        <Tooltip title="Skype Name">
          <PhoneIcon />
        </Tooltip>{' '}
        {skypeName}
      </Typography>
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
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <Typography>
          {' '}
          <Tooltip title="Has Meeting">
            <EventIcon />
          </Tooltip>{' '}
          {hasMeeting ? (
            <CheckIcon color="success" />
          ) : (
            <CloseIcon color="error" />
          )}
        </Typography>
        {!hasMeeting && (
          <Button onClick={onUpdateHasMeeting}>Set has meeting</Button>
        )}
      </Box>
      <Typography sx={{ maxWidth: '40rem', overflowWrap: 'break-word' }}>
        <Tooltip title="Message from user">
          <MessageIcon />
        </Tooltip>{' '}
        {message}
      </Typography>
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
        {status !== 'reject' && (
          <Button color="error" onClick={onReject}>
            Reject
          </Button>
        )}
      </Box>
    </Card>
  );
}
