import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setStatusSendRequest } from 'store/teaching';
import { useRouter } from 'next/router';

export default function TeachingSignup() {
  const dispatch = useDispatch();
  const router = useRouter();
  const isLogin = useSelector((state) => state.user?.isLogin);
  useEffect(() => {
    if (isLogin) {
      dispatch(setStatusSendRequest());
    } else {
      router.push('/register?redirect=teaching');
    }
  }, [isLogin, dispatch, router]);
  return <></>;
}
