import { AppBar, Container, Toolbar, Typography } from '@mui/material';
import React from 'react';

export default function Footer() {
  return (
    <AppBar position="static" color="primary" component="footer">
      <Container maxWidth="md">
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Typography variant="body1" color="inherit">
            Designed and developed by Pengfei Gao
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
