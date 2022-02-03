import { useRouter } from 'next/router';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';

export default function CourseItem({ item }) {
  const { id, thumbnail, title, price, subtitle } = item;
  const router = useRouter();
  const clickHandler = () => {
    router.push(`/course/${id}`);
  };
  return (
    <Card sx={{ maxWidth: 800 }}>
      <CardActionArea onClick={clickHandler}>
        <Box sx={{ display: 'flex' }}>
          <CardMedia
            sx={{ flex: '0 0', height: 146, width: 260 }}
            component="img"
            image={thumbnail ? thumbnail : '/image-placeholder.svg'}
            alt={item.title}
          />
          <CardContent>
            <Typography variant="h5">{title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          </CardContent>
          <CardContent>
            <Typography variant="h5"> ${price}</Typography>
          </CardContent>
        </Box>
      </CardActionArea>
    </Card>
  );
}
