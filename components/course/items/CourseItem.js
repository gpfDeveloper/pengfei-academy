import { useRouter } from 'next/router';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function CourseItem({ item }) {
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down('md'));
  const { id, image, title, price, subtitle, author } = item;
  const url = image?.cfLocation;

  const router = useRouter();
  const clickHandler = () => {
    router.push(`/course/${id}`);
  };
  return (
    <Card sx={{ maxWidth: 960 }}>
      <CardActionArea onClick={clickHandler}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: isBelowMd ? 'column' : 'row',
          }}
        >
          <CardMedia
            sx={{ flex: '0 0', height: 211, width: 375 }}
            component="img"
            image={url ? url : '/image-placeholder.svg'}
            alt={item.title}
          />
          <CardContent
            sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
          >
            <Typography variant="h5">{title}</Typography>
            <Typography>{subtitle}</Typography>
            <Typography variant="body2" color="text.secondary">
              {author.name}
            </Typography>
          </CardContent>
          <CardContent sx={{ marginLeft: 'auto' }}>
            <Typography variant="h5">
              {' '}
              {price === 0 ? 'Free' : `$${price}`}
            </Typography>
          </CardContent>
        </Box>
      </CardActionArea>
    </Card>
  );
}
