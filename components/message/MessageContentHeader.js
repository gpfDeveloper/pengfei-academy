import { AppBar, Toolbar, IconButton, Avatar, Link } from '@mui/material';
import { sliceText } from 'utils';

export default function MessageContentHeader({ userName }) {
  return (
    <AppBar sx={{ position: 'absolute', zIndex: 1000 }}>
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
            wordBreak: 'break-word',
          }}
        >
          {sliceText(userName, 48)}
        </Link>
      </Toolbar>
    </AppBar>
  );
}
