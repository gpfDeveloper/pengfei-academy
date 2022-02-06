import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSnackbar } from 'store/snackbar';
import { clearCart } from 'store/cart';
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  CircularProgress,
} from '@mui/material';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import axios from 'axios';

export default function PaypalCheckout() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { subtotal } = cart;
  const user = useSelector((state) => state.user);
  const { token } = user;

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
          currency: 'USD',
        },
      });
      paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
    };
    loadPaypalScript();
  }, [paypalDispatch, token]);

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: subtotal },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  };
  const onApprove = (data, actions) => {
    return actions.order.capture().then(async function (details) {
      dispatch(clearCart());
      dispatch(
        setSnackbar({ severity: 'success', message: 'Payment success.' })
      );
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
    <>
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
    </>
  );
  return (
    <Card
      sx={{
        maxWidth: 300,
        padding: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {card}
    </Card>
  );
}
