import { Button } from '@mui/material';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from 'store/user';

function AddToCartBtn() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { cart } = user;
  const router = useRouter();
  const { courseId } = router.query;
  const isInCart = cart.indexOf(courseId) !== -1;
  const addToCartHandler = () => {
    dispatch(addToCart(courseId));
  };
  const goToCartHandler = () => {};
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
