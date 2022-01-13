import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getHeaderInfoAsync } from 'store/user-async';

import { AppBar, Toolbar, Slide } from '@mui/material';

import useScrollTrigger from '@mui/material/useScrollTrigger';
import HeaderSearch from 'components/layouts/header/HeaderSearch';
import Brand from 'components/UIs/Brand';
import Drawer from 'components/layouts/drawer/Drawer';
import HeaderActions from './HeaderActions';
import HeaderSearchMobile from './HeaderSearchMobile';
import HeaderActionsMobile from './HeaderActionsMobile';
import HeaderNavs from './HeaderNavs';

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger} sx={{ zIndex: 1100 }}>
      {children}
    </Slide>
  );
}

export default function Header() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user?.token);
  useEffect(() => {
    if (token) {
      dispatch(getHeaderInfoAsync(token));
    }
  }, [dispatch, token]);
  return (
    <HideOnScroll>
      <AppBar>
        <Toolbar>
          <Drawer />
          <Brand />
          <HeaderSearch />
          <HeaderNavs />
          <HeaderActions />
          <HeaderSearchMobile />
          <HeaderActionsMobile />
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
}
