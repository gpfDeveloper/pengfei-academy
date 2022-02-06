import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import CartItem from './CartItem';

export default function CartItems() {
  const cart = useSelector((state) => state.cart);
  const { items } = cart;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {items.map((item) => (
        <CartItem key={item.courseId} item={item} />
      ))}
    </Box>
  );
}
