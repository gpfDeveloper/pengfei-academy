import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { setSnackbar } from 'store/snackbar';
import { enrollmentBatch } from 'store/user';
import { clearCart } from 'store/cart';
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  CircularProgress,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import axios from 'axios';

const PAYPAL_PURCHASE_DESCRIPTION = 'Purchase courses from Pengfei Academy.';
const CURRENCY_CODE = 'USD';

export default function PaypalCheckout() {
  const theme = useTheme();
  const router = useRouter();
  const isBelowMd = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { subtotal } = cart;
  const user = useSelector((state) => state.user);
  const { token } = user;
  console.log(cart);

  useEffect(() => {
    const loadPaypalScript = async () => {
      const data = await axios.get('/api/user/getPaypalClientId', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const clientId = data.data.paypalClientId;
      paypalDispatch({
        type: 'resetOptions',
        value: {
          'client-id': clientId,
          currency: CURRENCY_CODE,
        },
      });
      paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
    };
    loadPaypalScript();
  }, [paypalDispatch, token]);

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: subtotal,
            currency_code: CURRENCY_CODE,
            breakdown: {
              item_total: {
                currency_code: CURRENCY_CODE,
                value: subtotal,
              },
            },
          },
          description: PAYPAL_PURCHASE_DESCRIPTION,
          items: cart.items.map((item) => ({
            name: item.title,
            unit_amount: {
              value: item.price,
              currency_code: CURRENCY_CODE,
            },
            quantity: 1,
          })),
        },
      ],
    });
  };
  const onApprove = (data, actions) => {
    return actions.order.capture().then(async function (details) {
      dispatch(
        enrollmentBatch({ courseIds: cart.items.map((item) => item.courseId) })
      );
      dispatch(clearCart());
      dispatch(
        setSnackbar({ severity: 'success', message: 'Payment success.' })
      );
      const order = {};
      order.paypalOrderId = details.id;
      order.createTime = details.create_time;
      order.paypalLink = details.links[0]?.href;
      order.paypalStatus = details.status;
      order.paypalPayer = details.payer;
      order.totalAmount = +details.purchase_units[0].amount.value;
      order.items = cart.items.map((item) => ({
        courseId: item.courseId,
        courseTitle: item.title,
        price: item.price,
      }));
      order.userEmail = user.email;
      order.userName = user.name;
      try {
        await axios.post(
          '/api/order',
          { order },
          { headers: { authorization: `Bearer ${token}` } }
        );
        router.replace('/my-course/learning');
      } catch (err) {
        dispatch(
          setSnackbar({
            severity: 'error',
            message: 'Enrollment failed, please contact Pengfei.',
          })
        );
      }
    });
  };
  const onError = (err) => {
    dispatch(
      setSnackbar({
        severity: 'error',
        message: 'Payment failed, please try again later.',
      })
    );
  };
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const card = (
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
      <CardContent>
        <Typography variant="h5" component="div">
          Subtoal: ${subtotal}
        </Typography>
      </CardContent>
      <CardActions>
        {isPending && <CircularProgress />}
        <PayPalButtons
          createOrder={createOrder}
          onApprove={onApprove}
          onError={onError}
        ></PayPalButtons>
      </CardActions>
    </Card>
  );
  return card;
}
