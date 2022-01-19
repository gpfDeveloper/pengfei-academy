import { useSelector } from 'react-redux';
import NextLink from 'next/link';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { AppBar, Toolbar, Link, Box, Typography, Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { CREATE_COURSE_STATUS_REVERSE } from 'utils/constants';
import { sliceText } from 'utils';

export default function HeaderEditCourse() {
  const course = useSelector((state) => state.course);
  const { title, status } = course;
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down('md'));
  const isBelowSm = useMediaQuery(theme.breakpoints.down('sm'));
  let titleSlice = title.length;
  if (isBelowMd) {
    titleSlice = 36;
  }
  if (isBelowSm) {
    titleSlice = 12;
  }
  return (
    <AppBar>
      <Toolbar
        sx={{
          gap: 2,
          justifyContent: 'space-between',
          '& a': {
            fontWeight: 'bolder',
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
            },
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            alignItems: 'center',
          }}
        >
          <NextLink passHref href="/instructor">
            <Link sx={{ display: 'inline-flex', alignItems: 'center' }}>
              <ArrowBackIosIcon /> <Box component="span">Back to courses</Box>
            </Link>
          </NextLink>
          <Typography fontWeight="bold">
            {sliceText(title, titleSlice)}
          </Typography>
          <Typography
            sx={{
              textTransform: 'uppercase',
              fontSize: '.8rem',
              padding: 0.8,
              color: 'text.secondary',
            }}
          >
            {CREATE_COURSE_STATUS_REVERSE[status]}
          </Typography>
        </Box>
        <Button variant="outlined">Preview</Button>
      </Toolbar>
    </AppBar>
  );
}
