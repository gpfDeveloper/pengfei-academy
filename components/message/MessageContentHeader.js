import { AppBar, Toolbar, IconButton, Avatar, Link } from '@mui/material';

export default function MessageContentHeader({ userName }) {
  return (
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
            wordBreak: 'break-word',
          }}
        >
          {userName}
        </Link>
      </Toolbar>
    </AppBar>
  );
}
