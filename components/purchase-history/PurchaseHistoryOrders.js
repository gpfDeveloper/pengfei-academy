import { useState } from 'react';
import NextLink from 'next/link';
import moment from 'moment';
import {
  Box,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Link,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const CourseItemMulti = ({ item }) => {
  return (
    <TableRow>
      <TableCell>
        <NextLink href={`/course/${item.courseId}`} passHref>
          <Link>{item.courseTitle}</Link>
        </NextLink>
      </TableCell>
      <TableCell>{item.price}</TableCell>
    </TableRow>
  );
};

const OrderRowMulti = ({ order }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            <Typography variant="body2" color="text.secondary">
              {order.items.length} courses purchased{' '}
            </Typography>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{moment(order.createTime).format('LL')}</TableCell>
        <TableCell>{order.totalAmount}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Order details:
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Course Title</TableCell>
                    <TableCell>Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.items.map((item) => (
                    <CourseItemMulti key={item.courseId} item={item} />
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const OrderRowSingle = ({ order }) => {
  return (
    <TableRow>
      <TableCell>
        <NextLink href={`/course/${order.items[0].courseId}`} passHref>
          <Link>{order.items[0].courseTitle}</Link>
        </NextLink>
      </TableCell>
      <TableCell>{moment(order.createTime).format('LL')}</TableCell>
      <TableCell>{order.totalAmount}</TableCell>
    </TableRow>
  );
};

export default function PurchaseHistoryOrders({ orders }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Date</TableCell>
            <TableCell>Total price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => {
            if (order.items.length === 1) {
              return <OrderRowSingle order={order} />;
            } else {
              return <OrderRowMulti key={order.createTime} order={order} />;
            }
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
