import MyPhoto from 'assets/images/my_photo1_300_600.png';
import Image from 'next/image';
import { Box, Typography, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useRouter } from 'next/router';

const Hero = () => {
  const router = useRouter();
  const startLearningHandler = () => {
    router.push('/course');
  };
  const teachHandler = () => {
    router.push('/teaching');
  };
  const theme = useTheme();
  const isBelowSm = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
      <Box
        sx={{ maxWidth: 600, display: 'flex', flexDirection: 'column', gap: 4 }}
      >
        <Typography component="h1" variant="h4">
          Pengfei Academy is an E-learning Marketplace
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            size="large"
            onClick={startLearningHandler}
          >
            Start Learning
          </Button>
          <Button variant="outlined" size="large" onClick={teachHandler}>
            Teach on Pengfei Academy
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: isBelowSm ? 'none' : 'initial' }}>
        <Image src={MyPhoto} height={480} width={240} alt="Pengfei Gao photo" />
      </Box>
    </Box>
  );
};

export default Hero;
