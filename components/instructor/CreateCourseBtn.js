import { useRouter } from 'next/router';
import { Button, Card, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function CreateCourseBtn() {
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();
  const createCourseHandler = () => {
    router.push('/instructor/course/create');
  };
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: isBelowMd ? 'column' : 'row',
        padding: 4,
        gap: 4,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Typography>Jump Into Course Creation</Typography>
      <Button variant="contained" size="large" onClick={createCourseHandler}>
        Create Your Course
      </Button>
    </Card>
  );
}
