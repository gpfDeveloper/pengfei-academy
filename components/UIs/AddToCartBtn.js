import { Button } from '@mui/material';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { enrollmentAsync } from 'store/user-async';
import { addToCart } from 'store/cart';

function AddToCartBtn({ author, price, title }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const { isLogin, token, learningList } = user;

  const router = useRouter();
  const { courseId } = router.query;
  const isInCart =
    cart.items.findIndex((item) => item.courseId === courseId) !== -1;
  const isInLearningList =
    learningList.findIndex((item) => item === courseId) !== -1;

  const addToCartHandler = () => {
    dispatch(addToCart({ courseId, author, price, title }));
  };
  const goToCartHandler = () => {
    router.push('/cart');
  };
  const enrollNowHandler = async () => {
    if (!isLogin) {
      router.push(`/login?redirect=/course/${courseId}`);
    } else {
      const isOk = await dispatch(enrollmentAsync({ token, courseId }));
      if (isOk) {
        router.push('/my-course/learning');
      }
    }
  };
  const goToCourseHandler = () => {};

  let button;
  const btnProps = { variant: 'contained', size: 'large', fullWidth: true };

  if (isInLearningList) {
    button = (
      <Button {...btnProps} onClick={goToCourseHandler}>
        Go to course
      </Button>
    );
  } else if (price === 0) {
    button = (
      <Button {...btnProps} onClick={enrollNowHandler}>
        Enroll now
      </Button>
    );
  } else if (!isInCart) {
    button = (
      <Button {...btnProps} onClick={addToCartHandler}>
        Add to cart
      </Button>
    );
  } else if (isInCart) {
    button = (
      <Button {...btnProps} onClick={goToCartHandler}>
        Go to cart
      </Button>
    );
  }

  return button;
}

export default dynamic(() => Promise.resolve(AddToCartBtn), { ssr: false });
