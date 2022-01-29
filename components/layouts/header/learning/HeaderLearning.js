import NextLink from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { setDark, setLight } from 'store/theme';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Tooltip,
  IconButton,
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { sliceText } from 'utils';
import Brand from 'components/UIs/Brand';

export default function HeaderLearning({ course, isPreview = false }) {
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.theme.isDark);
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down('md'));
  const isBelowSm = useMediaQuery(theme.breakpoints.down('sm'));
  if (!course) {
    return <></>;
  }
  const title = course.title;
  let titleSlice = title.length;
  let landingPageLink;
  if (isPreview) {
    landingPageLink = `/course/draft/${course.id}`;
  } else {
    landingPageLink = `/course/${course.id}`;
  }
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
          {!isBelowSm && <Brand />}
          {isBelowSm && (
            <NextLink href="/">
              <IconButton>
                <ArrowBackIosIcon />
              </IconButton>
            </NextLink>
          )}
          <NextLink href={landingPageLink}>
            <Typography
              fontWeight="bold"
              sx={{
                borderLeft: '1px solid',
                pl: 2,
                cursor: 'pointer',
                borderLeftColor: 'text.disabled',
              }}
            >
              {sliceText(title, titleSlice)}
            </Typography>
          </NextLink>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
