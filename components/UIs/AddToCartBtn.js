import { Button } from '@mui/material';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from 'store/cart';

function AddToCartBtn({ author, price, title }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const router = useRouter();
  const { courseId } = router.query;
  const isInCart =
    cart.items.findIndex((item) => item.courseId === courseId) !== -1;
  const addToCartHandler = () => {
    dispatch(addToCart({ courseId, author, price, title }));
  };
  const goToCartHandler = () => {
    router.push('/cart');
  };
  return (
    <>
      {!isInCart && (
        <Button
          onClick={addToCartHandler}
          variant="contained"
          size="large"
          fullWidth
        >
          Add to cart
        </Button>
      )}
      {isInCart && (
        <Button
          onClick={goToCartHandler}
          variant="contained"
          size="large"
          fullWidth
        >
          Go to cart
        </Button>
      )}
    </>
  );
}

export default dynamic(() => Promise.resolve(AddToCartBtn), { ssr: false });
