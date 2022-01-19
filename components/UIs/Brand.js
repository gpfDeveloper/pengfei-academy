import Link from 'next/link';
import { Typography } from '@mui/material';

const BRAND_NAME = 'Pengfei Academy';
export default function Brand({ link }) {
  const href = link || '/';
  return (
    <Typography variant="h6" noWrap component="div">
      <Link href={href}>{BRAND_NAME}</Link>
    </Typography>
  );
}
