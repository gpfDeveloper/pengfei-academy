import { AppBar, Avatar, Box, IconButton, Link, Toolbar } from '@mui/material';
import Spinner from 'components/UIs/Spinner';
import MessageContentItems from './MessageContentItems';

export default function MessageContent({ userName, isLoadingMsgs, msgs }) {
  return (
    <Box sx={{ position: 'relative', flex: 1 }}>
      <AppBar sx={{ position: 'absolute' }}>
        <Toolbar sx={{ gap: 1 }}>
          <IconButton>
            <Avatar alt={userName} src="/" />
          </IconButton>
          <Link
            href="/"
            sx={{
              fontWeight: 'bolder',
              fontSize: 'large',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            {userName}
          </Link>
        </Toolbar>
      </AppBar>
      <Box sx={{ mt: 10 }}>
        {isLoadingMsgs && <Spinner />}
        {!isLoadingMsgs && <MessageContentItems items={msgs} />}
      </Box>
    </Box>
  );
}
