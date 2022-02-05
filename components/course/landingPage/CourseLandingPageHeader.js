import { Box, Typography, Link, Button, Paper } from '@mui/material';
import NextLink from 'next/link';
import moment from 'moment';
import ReactPlayer from 'react-player/lazy';
import InfoIcon from '@mui/icons-material/Info';
import LanguageIcon from '@mui/icons-material/Language';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import WishlistIconBtn from 'components/UIs/WishlistIconBtn';
import AddToCartBtn from 'components/UIs/AddToCartBtn';

export default function CourseLandingPageHeader({
  title,
  subtitle,
  author,
  updatedAt,
  language,
  price,
}) {
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isBelowMd ? 'column-reverse' : 'row',
        alignItems: 'center',
        gap: isBelowMd ? 0 : 4,
      }}
    >
      <Box
        sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1 }}
      >
        <Typography variant="h3" component="h1">
          {title}
        </Typography>
        <Typography variant="h6">{subtitle}</Typography>
        <Box>
          <Typography>
            Created by{' '}
            <NextLink href={'#course-landing-page-instructor'} passHref>
              <Link>{author.name}</Link>
            </NextLink>
          </Typography>
          <Box sx={{ display: 'flex', mt: 1, gap: 2 }}>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <InfoIcon fontSize="small" />
              <Typography>
                Last updated {moment(updatedAt).format('LL')}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <LanguageIcon fontSize="small" />
              <Typography>{language}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          alignItems: 'center',
          pb: 2,
        }}
      >
        <ReactPlayer
          url="/video/demo.mp4"
          controls={true}
          width={384}
          height={216}
        />
        <Typography variant="h6">${price}</Typography>
        <Box sx={{ display: 'flex', gap: 2, alignSelf: 'stretch' }}>
          <AddToCartBtn />
          <WishlistIconBtn />
        </Box>
      </Paper>
    </Box>
  );
}
