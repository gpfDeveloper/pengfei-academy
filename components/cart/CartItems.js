import { useSelector, useDispatch } from 'react-redux';

export default function CartItems() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  console.log(cart);
  return <div>cartItems</div>;
}
