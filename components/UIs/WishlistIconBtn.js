import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { addToWishlistAsync, removeFromWishlistAsync } from 'store/user-async';
import { IconButton } from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';

function WishlistIconBtn() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { isLogin, token, wishlist } = user;
  const router = useRouter();
  const { courseId } = router.query;
  const isInWishlist = wishlist.indexOf(courseId) !== -1;
  const addToWishlistHandler = () => {
    dispatch(addToWishlistAsync({ token, courseId }));
  };
  const removeFromWishlistHandler = () => {
    dispatch(removeFromWishlistAsync({ token, courseId }));
  };
  return (
    <>
      {!isInWishlist && (
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
      )}
      {isInWishlist && (
        <IconButton
          onClick={removeFromWishlistHandler}
          sx={{
            display: isLogin ? 'block' : 'none',
            border: '1px solid',
            borderRadius: '4px',
            borderColor: 'primary.main',
          }}
        >
          <FavoriteIcon fontSize="large" color="primary" />
        </IconButton>
      )}
    </>
  );
}

export default dynamic(() => Promise.resolve(WishlistIconBtn), { ssr: false });
