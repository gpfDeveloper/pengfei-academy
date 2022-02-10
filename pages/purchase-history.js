import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { Box, Divider, Stack, Typography } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PageLayout from 'components/layouts/PageLayout';
import axios from 'axios';
import Spinner from 'components/UIs/Spinner';
import PurchaseHistoryOrders from 'components/purchase-history/PurchaseHistoryOrders';

function PurchaseHistoryPage() {
  const router = useRouter();
  const user = useSelector((state) => state.user);
  const { isLogin, token } = user;
  const [orders, setOrders] = useState([]);
  console.log(orders);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchOrderItems = async () => {
      const data = await axios.get('/api/user/purchaseHistory', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(data.data.orders || []);
    };
    if (!isLogin) {
      router.replace('/login');
    } else {
      setLoading(true);
      fetchOrderItems();
      setLoading(false);
    }
  }, [isLogin, router, token]);

  return (
    <PageLayout>
      {isLogin && (
        <Box sx={{ mt: 12 }}>
          {loading && <Spinner />}
          {!loading && (
            <Stack sx={{ gap: 4, alignItems: 'center' }}>
              <Typography variant="h3">Purchase history</Typography>
              <Divider sx={{ alignSelf: 'stretch' }} />
              <>
                {orders.length === 0 && (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      color: 'text.secondary',
                    }}
                  >
                    <ShoppingCartOutlinedIcon />
                    <Typography>
                      {"You don't have any course purchases."}
                    </Typography>
                  </Box>
                )}
                {orders.length !== 0 && (
                  <PurchaseHistoryOrders orders={orders} />
                )}
              </>
            </Stack>
          )}
        </Box>
      )}
    </PageLayout>
  );
}

export default dynamic(() => Promise.resolve(PurchaseHistoryPage), {
  ssr: false,
});
