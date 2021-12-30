import { AppBar, Box, Toolbar, Slide } from '@mui/material';

import useScrollTrigger from '@mui/material/useScrollTrigger';
import HeaderSearch from 'components/layouts/header/HeaderSearch';
import Brand from 'components/UIs/Brand';
import Drawer from 'components/UIs/Drawer';
import HeaderActions from './HeaderActions';
import HeaderActionsMobile from './HeaderActionsMobile';

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <HideOnScroll>
        <AppBar>
          <Toolbar>
            <Drawer />
            <Brand />
            <HeaderSearch />
            <Box sx={{ flexGrow: 1 }} />
            <HeaderActions />
            <HeaderActionsMobile />
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </Box>
  );
}
