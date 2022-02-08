import { useSelector, useDispatch } from 'react-redux';
import { setDark, setLight } from 'store/theme';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  Tooltip,
  IconButton,
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { sliceText } from 'utils';

const reviewStatusMap = {
  Reviewing: 'Change in review',
  Approved: '',
  'Needs Fixes': 'Needs Fixes',
};

export default function HeaderEditCourse() {
  const router = useRouter();
  const dispatch = useDispatch();
  const course = useSelector((state) => state.course);
  const isDark = useSelector((state) => state.theme.isDark);
  const { title, isPublished, reviewStatus } = course;
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
  const clickBackHandler = () => {
    router.push('/instructor');
  };

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
          <Button startIcon={<ArrowBackIosIcon />} onClick={clickBackHandler}>
            Back to courses
          </Button>
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
            {isPublished ? 'PUBLISHED' : 'DRAFT'}
          </Typography>
          <Typography
            sx={{
              textTransform: 'uppercase',
              fontSize: '.8rem',
              padding: 0.8,
              color: 'text.secondary',
            }}
          >
            {reviewStatusMap[reviewStatus]}
          </Typography>
        </Box>
        <Box>
          {!isDark && (
            <Tooltip title="Dark mode">
              <IconButton color="inherit" onClick={() => dispatch(setDark())}>
                <DarkModeIcon />
              </IconButton>
            </Tooltip>
          )}
          {isDark && (
            <Tooltip title="Light mode">
              <IconButton color="inherit" onClick={() => dispatch(setLight())}>
                <LightModeIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
