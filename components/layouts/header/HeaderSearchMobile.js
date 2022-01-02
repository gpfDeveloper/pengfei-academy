import { useState } from 'react';
import { IconButton, SwipeableDrawer } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import HeaderSearchMobileInput from './HeaderSearchMobileInput';

export default function HeaderSearchMobile() {
  const [isOpen, setIsOpen] = useState(false);
  const drawerCloseHandler = () => setIsOpen(false);
  const drawerOpenHandler = () => setIsOpen(true);
  return (
    <>
      <IconButton
        size="large"
        color="inherit"
        aria-label="open search"
        onClick={drawerOpenHandler}
        sx={{
          display: {
            xs: 'flex',
            sm: 'none',
            alignItems: 'center',
            justifyContent: 'center',
          },
        }}
      >
        <SearchIcon />
      </IconButton>
      <SwipeableDrawer
        anchor="top"
        open={isOpen}
        onOpen={drawerOpenHandler}
        onClose={drawerCloseHandler}
        // PaperProps={{ sx: { height: '40px' } }}
      >
        <HeaderSearchMobileInput />
      </SwipeableDrawer>
    </>
  );
}
