import Link from 'next/link';
import { Typography } from '@mui/material';

const BRAND_NAME = 'Pengfei Academy';
export default function Brand({ isLink = true }) {
  return (
    <Typography variant="h6" noWrap component="div">
      {isLink && <Link href="/">{BRAND_NAME}</Link>}
      {!isLink && BRAND_NAME}
    </Typography>
  );
}
