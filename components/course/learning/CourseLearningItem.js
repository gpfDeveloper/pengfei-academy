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

export default function CourseLearningItem({ item }) {
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down('md'));
  const { id, course, title, author } = item;
  const thumbnail = course.image?.cfLocation;
  const router = useRouter();
  const clickHandler = () => {
    router.push(`/course/${id}/learn`);
  };
  return (
    <Card sx={{ maxWidth: 960 }}>
      <CardActionArea onClick={clickHandler}>
        <Box
          sx={{ display: 'flex', flexDirection: isBelowMd ? 'column' : 'row' }}
        >
          <CardMedia
            sx={{ flex: '0 0', height: 146, width: 260 }}
            component="img"
            image={thumbnail ? thumbnail : '/image-placeholder.svg'}
            alt={item.title}
          />
          <CardContent
            sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
          >
            <Typography variant="h5">{title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {author.name}
            </Typography>
          </CardContent>
        </Box>
      </CardActionArea>
    </Card>
  );
}
