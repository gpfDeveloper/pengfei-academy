import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { addToWishlistAsync } from 'store/user-async';
import { IconButton } from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

function WishlistIconBtn() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { isLogin, token } = user;
  const router = useRouter();
  // console.log(router);
  const addToWishlistHandler = () => {
    const { courseId } = router.query;
    dispatch(addToWishlistAsync({ token, courseId }));
  };
  return (
    <IconButton
      onClick={addToWishlistHandler}
      sx={{
        display: isLogin ? 'block' : 'none',
        border: '1px solid',
        borderRadius: '4px',
        borderColor: 'primary.main',
      }}
    >
      <FavoriteBorderOutlinedIcon fontSize="large" color="primary" />
    </IconButton>
  );
}

export default dynamic(() => Promise.resolve(WishlistIconBtn), { ssr: false });
