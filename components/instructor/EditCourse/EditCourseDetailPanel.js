import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Tabs, Tab as MuiTab, Typography, Card } from '@mui/material';
import { styled } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import IntendedLearner from './Panels/IntentLearner/IntendedLearner';
import Curriculum from './Panels/Curriculum/Curriculum';
import LandingPage from './Panels/LandingPage/LandingPage';
import CourseMsg from './Panels/CourseMsg/CourseMsg';
import Pricing from './Panels/Pricing/Pricing';
import Publishing from './Panels/Publishing/Publishing';
import Settings from './Panels/Settings/Settings';

const Tab = styled(MuiTab)({
  textTransform: 'none',
});

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <div hidden={value !== index}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function EditCourseDetailPanel() {
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down('md'));
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        display: 'flex',
        flexDirection: isBelowMd ? 'column' : 'row',
      }}
    >
      <Tabs
        orientation={isBelowMd ? 'horizontal' : 'vertical'}
        variant="scrollable"
        value={value}
        onChange={handleChange}
        sx={{
          borderRight: 1,
          borderColor: 'divider',
          flex: isBelowMd ? undefined : '0 0 180px',
        }}
      >
        <Tab label="Intended learners" />
        <Tab label="Curriculum" />
        <Tab label="Course landing page" />
        <Tab label="Course messages" />
        <Tab label="Pricing" />
        <Tab label="Publishing" />
        <Tab label="Settings" />
      </Tabs>
      <Card sx={{ flexGrow: 1, margin: '0 2rem' }}>
        <TabPanel value={value} index={0}>
          <IntendedLearner />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Curriculum />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <LandingPage />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <CourseMsg />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <Pricing />
        </TabPanel>
        <TabPanel value={value} index={5}>
          <Publishing />
        </TabPanel>
        <TabPanel value={value} index={6}>
          <Settings />
        </TabPanel>
      </Card>
    </Box>
  );
}
