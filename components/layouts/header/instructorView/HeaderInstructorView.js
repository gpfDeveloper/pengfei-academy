import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getHeaderInfoAsync } from 'store/user-async';

import { AppBar, Toolbar, Slide } from '@mui/material';

import useScrollTrigger from '@mui/material/useScrollTrigger';
import Brand from 'components/UIs/Brand';
import Drawer from 'components/layouts/drawer/Drawer';
import HeaderActionsInstructorView from './HeaderActionsInstructorView';
import HeaderActionsMobile from '../HeaderActionsMobile';
import HeaderNavsInstructorView from './HeaderNavsInstructorView';

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger} sx={{ zIndex: 1100 }}>
      {children}
    </Slide>
  );
}

export default function HeaderInstructorView() {
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
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Drawer />
          <Brand isLink={false} />
          <HeaderNavsInstructorView />
          <HeaderActionsInstructorView />
          <HeaderActionsMobile />
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
}
