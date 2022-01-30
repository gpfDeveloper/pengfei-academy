import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import MuiTab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import AdminUserInfo from './AdminUserInfo';
import AdminTeachRequest from './AdminTeachRequest';

const Tab = styled(MuiTab)({
  textTransform: 'none',
});

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ p: 4 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function AdminPanel() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Users" />
          <Tab label="Teaching Requests" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <AdminUserInfo />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AdminTeachRequest />
      </TabPanel>
    </>
  );
}
