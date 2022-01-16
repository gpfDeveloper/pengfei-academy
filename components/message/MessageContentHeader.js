import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { AppBar, Toolbar, IconButton, Avatar, Link } from '@mui/material';
import { sliceText } from 'utils';

export default function MessageContentHeader({ userId, userName }) {
  const router = useRouter();
  return (
    <AppBar sx={{ position: 'absolute', zIndex: 1000 }}>
      <Toolbar sx={{ gap: 1 }}>
        <IconButton onClick={() => router.push(`/user/${userId}`)}>
          <Avatar alt={userName} src="/" />
        </IconButton>
        <NextLink passHref href={`/user/${userId}`}>
          <Link
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
        </NextLink>
      </Toolbar>
    </AppBar>
  );
}
