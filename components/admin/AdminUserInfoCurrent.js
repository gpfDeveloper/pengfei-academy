import NextLink from 'next/link';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  Card,
  Typography,
  Box,
  Tooltip,
  Badge,
  Divider,
  Link,
} from '@mui/material';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';

const roleColorMap = {
  User: 'info',
  Admin: 'success',
  Instructor: 'primary',
};

export default function AdminUserInfoCurrent({
  id,
  name,
  email,
  role,
  registeredAt,
}) {
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down('md'));
  const rowStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: isBelowMd ? 'column' : 'row',
    gap: 4,
  };
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: 4,
        gap: 4,
        mt: 4,
        '& p': {
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        },
      }}
    >
      <Badge badgeContent={role} color={roleColorMap[role]}></Badge>
      <Box sx={rowStyle}>
        <NextLink href={`/user/${id}`} passHref>
          <Link>{id}</Link>
        </NextLink>
        <Typography>
          <Tooltip title="Registered At">
            <AppRegistrationIcon />
          </Tooltip>{' '}
          {registeredAt}
        </Typography>
      </Box>
      <Divider />
      <Box sx={rowStyle}>
        <Typography>
          {' '}
          <Tooltip title="Name">
            <PersonIcon />
          </Tooltip>{' '}
          {name}
        </Typography>
        <Typography>
          {' '}
          <Tooltip title="Email">
            <EmailIcon />
          </Tooltip>{' '}
          {email}
        </Typography>
      </Box>
      <Divider />
    </Card>
  );
}
