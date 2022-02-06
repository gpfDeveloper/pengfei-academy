import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import { Box, Typography, Button } from '@mui/material';
import PageLayout from 'components/layouts/PageLayout';
import CartItems from 'components/cart/CartItems';
import CartCheckout from 'components/cart/CartCheckout';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

function CartPage() {
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down('md'));
  const cart = useSelector((state) => state.cart);
  const router = useRouter();
  const browseCourseHandler = () => {
    router.push('/course');
  };
  return (
    <PageLayout>
      <Box sx={{ margin: '8rem auto', maxWidth: 1200 }}>
        <Typography variant="h3">Shopping Cart</Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: isBelowMd ? 'column-reverse' : 'row',
            justifyContent: 'space-between',
            mt: 4,
            gap: 2,
          }}
        >
          {cart.items.length === 0 && (
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Your cart is empty. Keek shopping to find a course!
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={browseCourseHandler}
              >
                Browse course now
              </Button>
            </Box>
          )}

          {cart.items.length > 0 && (
            <>
              <CartItems />
              <CartCheckout />
            </>
          )}
        </Box>
      </Box>
    </PageLayout>
  );
}

export default dynamic(() => Promise.resolve(CartPage), { ssr: false });
