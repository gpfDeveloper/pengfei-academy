import NextLink from 'next/link';
import { Avatar, Box, Typography, Link } from '@mui/material';
import ReactMarkdown from 'react-markdown';

export default function CourseLandingPageInstructor({ instructor }) {
  const { name, headline, bio, id, avatarUrl } = instructor;

  return (
    <Box
      id="course-landing-page-instructor"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography variant="h4">Instructor</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar
          src={avatarUrl || '/'}
          alt={name}
          sx={{
            backgroundColor: 'primary.main',
            height: 100,
            width: 100,
          }}
        />
        <Box>
          <NextLink href={`/user/${id}`} passHref>
            <Link>
              <Typography variant="h6">{name}</Typography>
            </Link>
          </NextLink>
          <Typography color="text.secondary">{headline}</Typography>
        </Box>
      </Box>
      <Box>
        <ReactMarkdown>{bio}</ReactMarkdown>
      </Box>
    </Box>
  );
}
