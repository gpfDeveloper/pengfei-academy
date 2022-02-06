import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { Stack, Typography, Divider, Box, Button } from '@mui/material';

import { PayPalScriptProvider } from '@paypal/react-paypal-js';

import { useSelector } from 'react-redux';

import Spinner from 'components/UIs/Spinner';
import PageLayout from 'components/layouts/PageLayout';
import PaypalCheckout from 'components/cart/PaypalCheckout';
import CartItems from 'components/cart/CartItems';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

function CartCheckoutPage() {
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();
  const isLogin = useSelector((state) => state.user.isLogin);
  const cart = useSelector((state) => state.cart);
  const { items } = cart;
  const browseCourseHandler = () => {
    router.push('/course');
  };
  useEffect(() => {
    if (!isLogin) {
      router.replace('/login');
    }
  }, [isLogin, router]);
  return (
    <PayPalScriptProvider deferLoading={true}>
      <PageLayout>
        {!isLogin && <Spinner />}
        {isLogin && (
          <Stack
            sx={{
              gap: 4,
              margin: '8rem auto',
            }}
          >
            <Typography component="h1" variant="h4">
              Checkout
            </Typography>
            <Divider />
            <Box
              sx={{
                display: 'flex',
                flexDirection: isBelowMd ? 'column-reverse' : 'row',
                justifyContent: 'space-between',
                mt: 4,
                gap: 2,
              }}
            >
              {items.length === 0 && (
                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
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
              {items.length > 0 && (
                <>
                  <CartItems />
                  <PaypalCheckout />
                </>
              )}
            </Box>
          </Stack>
        )}
      </PageLayout>
    </PayPalScriptProvider>
  );
}

export default dynamic(() => Promise.resolve(CartCheckoutPage), { ssr: false });
