import { useRouter } from 'next/router';
import { Typography, Button, Card } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSelector } from 'react-redux';

export default function CartCheckout() {
  const router = useRouter();
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down('md'));
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const { isLogin } = user;
  const checkoutHandler = () => {
    if (!isLogin) {
      router.push('/login?redirect=/cart');
    } else {
      router.push('/cart/checkout');
    }
  };
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        padding: 4,
        minWidth: 300,
        alignSelf: isBelowMd ? 'stretch' : 'flex-start',
      }}
    >
      <Typography variant="h6" color="text.secondary">
        Subtotal:
      </Typography>
      <Typography variant="h3">${cart.subtotal}</Typography>
      <Button variant="contained" size="large" onClick={checkoutHandler}>
        Checkout
      </Button>
    </Card>
  );
}
