import moment from 'moment';
import dynamic from 'next/dynamic';
import { Typography } from '@mui/material';

const TimeFromNow = ({ timestamp }) => {
  const currentTime = moment(Date.now());
  const createTime = moment(timestamp);
  const diffInMins = currentTime.diff(createTime, 'minute');
  const diffInHours = currentTime.diff(createTime, 'hour');
  const diffInDays = currentTime.diff(createTime, 'day');
  const diffInMonths = currentTime.diff(createTime, 'month');
  const props = {
    variant: 'body2',
    color: 'text.secondary',
  };

  if (diffInMins < 1) {
    return <Typography {...props}>Just now</Typography>;
  } else if (diffInMins < 60) {
    return <Typography {...props}>{diffInMins} minutes ago.</Typography>;
  } else if (diffInHours < 24) {
    return <Typography {...props}>{diffInHours} hours ago.</Typography>;
  } else if (diffInDays < 30) {
    return <Typography {...props}>{diffInDays} days ago.</Typography>;
  } else {
    return <Typography {...props}>{diffInMonths} months ago</Typography>;
  }
};

export default dynamic(() => Promise.resolve(TimeFromNow), { ssr: false });
