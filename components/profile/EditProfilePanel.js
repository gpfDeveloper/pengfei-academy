import { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import MuiTab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import EditAccountSecurity from './EditAccountSecurity';
import EditProfileInfo from './EditProfileInfo';
import EditProfilePic from './EditProfilePic';

const Tab = styled(MuiTab)({
  textTransform: 'none',
});

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function EditProfilePanel() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Profile information" />
          <Tab label="Profile picture" />
          <Tab label="Account security" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <EditProfileInfo />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <EditProfilePic />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <EditAccountSecurity />
      </TabPanel>
    </>
  );
}
