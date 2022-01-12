import {
  Divider,
  Stack,
  Box,
  ListItemText,
  Tooltip,
  IconButton,
} from '@mui/material';
import TimeFromNow from 'components/UIs/TimeFromNow';
import DeleteIcon from '@mui/icons-material/Delete';

export default function NotificationItem({ noti, onDelete }) {
  return (
    <Box>
      <Stack sx={{ mb: 2 }}>
        <ListItemText>{noti.message}</ListItemText>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <TimeFromNow timestamp={noti.createdAt} />
          <Tooltip title="Delete">
            <IconButton onClick={onDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Stack>
      <Divider />
    </Box>
  );
}
