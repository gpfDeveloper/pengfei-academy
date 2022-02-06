import { useDispatch } from 'react-redux';
import { removeFromCart } from 'store/cart';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function CartItem({ item }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down('md'));
  const { courseId, thumbnail, title, price, author } = item;
  const router = useRouter();
  const clickCourseHandler = () => {
    router.push(`/course/${courseId}`);
  };
  const removeFromCartHandler = () => {
    dispatch(removeFromCart(courseId));
  };
  return (
    <Card sx={{ maxWidth: 960 }}>
      <Box
        sx={{ display: 'flex', flexDirection: isBelowMd ? 'column' : 'row' }}
      >
        <CardActionArea onClick={clickCourseHandler} sx={{ width: 'auto' }}>
          <CardMedia
            sx={{ flex: '0 0', height: 90, width: 160 }}
            component="img"
            image={thumbnail ? thumbnail : '/image-placeholder.svg'}
            alt={item.title}
          />
        </CardActionArea>
        <CardContent
          sx={{ display: 'flex', flexDirection: 'column', gap: 1, flexGrow: 1 }}
        >
          <CardActionArea onClick={clickCourseHandler}>
            <Typography>{title}</Typography>
          </CardActionArea>
          <Typography variant="body2" color="text.secondary">
            By {author}
          </Typography>
        </CardContent>

        <CardContent>
          <Typography variant="h5">
            {' '}
            {price === 0 ? 'Free' : `$${price}`}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={removeFromCartHandler}>Remove</Button>
        </CardActions>
      </Box>
    </Card>
  );
}
