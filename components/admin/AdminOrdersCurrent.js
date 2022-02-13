import NextLink from 'next/link';
import { List, Link, ListItem, Typography } from '@mui/material';

export default function AdminOrdersCurrent(props) {
  return (
    <List>
      <ListItem>Open devtool for more detail</ListItem>
      {props.items.map((item) => (
        <ListItem
          key={item.courseId}
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <NextLink href={`/course/${item.courseId}`} passHref>
            <Link>
              <Typography>{item.courseTitle}</Typography>
            </Link>
          </NextLink>
          <Typography>{item.price}</Typography>
        </ListItem>
      ))}
    </List>
  );
}
