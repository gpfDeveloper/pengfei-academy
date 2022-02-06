import dynamic from 'next/dynamic';
import { Box, Typography } from '@mui/material';
import PageLayout from 'components/layouts/PageLayout';
import CartItems from 'components/cart/CartItems';

function CartPage() {
  return (
    <PageLayout>
      <Box sx={{ margin: '8rem auto', maxWidth: 960 }}>
        <Typography variant="h3">Shopping Cart</Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: 4,
          }}
        >
          <CartItems />
        </Box>
      </Box>
    </PageLayout>
  );
}

export default dynamic(() => Promise.resolve(CartPage), { ssr: false });
