import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSnackbar } from 'store/snackbar';
import { Box, TextField, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export default function MessageContentInput({ onSend }) {
  const dispatch = useDispatch();
  const [msg, setMsg] = useState('');
  const [isSending, setIsSending] = useState(false);
  const sendMsgHander = async () => {
    setIsSending(true);
    try {
      await onSend(msg);
      setMsg('');
    } catch (err) {
      dispatch(
        setSnackbar({
          severity: 'error',
          message: 'Message send failed, please try again later.',
        })
      );
    }
    setIsSending(false);
  };
  return (
    <Box
      sx={{
        position: 'absolute',
        left: 16,
        bottom: 0,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <TextField
        label="New message"
        placeholder="New message, at most 1000 charactors."
        multiline
        rows={4}
        fullWidth
        value={msg}
        onChange={(e) => setMsg(e.currentTarget.value)}
      />
      <Button
        variant="contained"
        size="large"
        endIcon={<SendIcon />}
        disabled={isSending || msg.length === 0 || msg.length > 1000}
        sx={{ alignSelf: 'flex-end' }}
        onClick={sendMsgHander}
      >
        Send
      </Button>
    </Box>
  );
}
