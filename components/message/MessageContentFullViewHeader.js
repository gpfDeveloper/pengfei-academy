import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { AppBar, Toolbar, IconButton, Avatar, Link, Box } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { sliceText } from 'utils';

export default function MessageContentFullViewHeader({
  userName,
  userAvatar,
  userId,
}) {
  const router = useRouter();
  return (
    <AppBar sx={{ position: 'absolute', zIndex: 1000 }}>
      <Toolbar
        sx={{
          gap: 2,
          '& a': {
            fontWeight: 'bolder',
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
            },
          },
        }}
      >
        <NextLink passHref href="/message">
          <Link sx={{ display: 'inline-flex', alignItems: 'center' }}>
            <ArrowBackIosIcon /> <Box component="span">Back</Box>
          </Link>
        </NextLink>
        <Box>
          <IconButton onClick={() => router.push(`/user/${userId}`)}>
            <Avatar alt={userName} src={userAvatar || '/'} />
          </IconButton>
          <NextLink passHref href={`/user/${userId}`}>
            <Link
              sx={{
                fontSize: 'large',
                wordBreak: 'break-word',
              }}
            >
              {sliceText(userName, 48)}
            </Link>
          </NextLink>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
