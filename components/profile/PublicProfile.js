import { Avatar, Box, Button, Divider, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import LinkIcon from '@mui/icons-material/Link';
import ReactMarkdown from 'react-markdown';

export default function PublicProfile({ userInfo }) {
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down('md'));
  if (!userInfo) {
    return <></>;
  }
  const { name, headline, bio, website, isInstructor, avatar } = userInfo;

  const clickWebsiteHandler = () => {
    window.open(website, '_blank');
  };
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: isBelowMd ? 'column-reverse' : 'row',
          gap: isBelowMd ? '2rem' : '8rem',
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          {isInstructor && (
            <Typography
              variant="body2"
              color="text.secondary"
              fontWeight="bold"
              mb={1}
            >
              INSTRUCTOR
            </Typography>
          )}
          <Typography variant="h3" component="h1">
            {name}
          </Typography>
          {Boolean(headline) && (
            <Typography variant="h6">{headline}</Typography>
          )}
          {Boolean(bio) && (
            <Box mt={2}>
              <Divider />
              <Box mt={2}>
                <ReactMarkdown>{bio}</ReactMarkdown>
              </Box>
            </Box>
          )}
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            width: 240,
            alignItems: 'center',
            flexShrink: 0,
          }}
        >
          <Avatar
            src={avatar || '/'}
            alt={name}
            sx={{
              backgroundColor: 'primary.main',
              height: 200,
              width: 200,
            }}
          />
          {Boolean(website) && !isBelowMd && (
            <Button
              startIcon={<LinkIcon />}
              variant="outlined"
              fullWidth
              size="large"
              onClick={clickWebsiteHandler}
            >
              Website
            </Button>
          )}
        </Box>
      </Box>
      {Boolean(website) && isBelowMd && (
        <Button
          startIcon={<LinkIcon />}
          variant="outlined"
          fullWidth
          size="large"
          onClick={clickWebsiteHandler}
        >
          Website
        </Button>
      )}
    </>
  );
}
