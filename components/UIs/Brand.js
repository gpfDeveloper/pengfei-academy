import Link from 'next/link';
import { Typography } from '@mui/material';

export default function Brand() {
  return (
    <Typography variant="h6" noWrap component="div">
      <Link href="/">Pengfei Academy</Link>
    </Typography>
  );
}
