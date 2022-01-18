import NextLink from 'next/link';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  AppBar,
  Toolbar,
  IconButton,
  Link,
  Box,
  Typography,
  Button,
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SettingsIcon from '@mui/icons-material/Settings';
import { CREATE_COURSE_STATUS_REVERSE } from 'utils/constants';
import { sliceText } from 'utils';

export default function EditCourseDetailHeader({ title, status }) {
  const theme = useTheme();
  let titleSlice = title.length;
  const isBelowlg = useMediaQuery(theme.breakpoints.down('lg'));
  const isBelowMd = useMediaQuery(theme.breakpoints.down('md'));
  const isBelowSm = useMediaQuery(theme.breakpoints.down('sm'));
  if (isBelowlg) {
    titleSlice = 48;
  }
  if (isBelowMd) {
    titleSlice = 24;
  }
  if (isBelowSm) {
    titleSlice = 12;
  }
  return (
    <AppBar sx={{ position: 'static', zIndex: 1000, mb: '2rem' }}>
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
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained">Save</Button>
          <Button variant="outlined">Preview</Button>
          <IconButton>
            <SettingsIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
