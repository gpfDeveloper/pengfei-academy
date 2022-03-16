import { AppBar, Container, Toolbar, Typography, Link } from '@mui/material';
import React from 'react';

export default function Footer() {
  return (
    <AppBar position="static" color="primary" component="footer" sx={{ mt: 4 }}>
      <Container maxWidth="md">
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Typography variant="body1" color="inherit">
            Designed and developed by{' '}
            <Link target="_blank" href="https://www.pengfeidevelopment.com">
              Pengfei Gao
            </Link>
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
