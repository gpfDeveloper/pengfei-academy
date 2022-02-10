import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import AdminOrdersCurrent from './AdminOrdersCurrent';

const cols = [
  { field: 'id', headerName: 'ID', width: 300, hide: true },
  {
    field: 'userName',
    headerName: 'User name',
    width: 100,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 150,
  },
  {
    field: 'createTime',
    headerName: 'Create time',
    type: 'date',
    width: 200,
  },
  {
    field: 'totalAmount',
    headerName: 'Total amount',
    type: 'number',
    width: 80,
  },
  {
    field: 'courseTitle',
    headerName: 'Course title',
    width: 200,
  },
];

const transform = (rawItems) => {
  const ret = [];
  for (const rowItem of rawItems) {
    const row = { ...rowItem };
    row.createTime = moment(rowItem.createTime).format('LLL');
    row.userName = rowItem.userName;
    row.email = rowItem.userEmail;
    row.courseTitle = rowItem.items[0].courseTitle;
    row.totalAmount = rowItem.totalAmount;
    row.id = rowItem.id;
    ret.push(row);
  }
  return ret;
};

export default function AdminOrders() {
  const token = useSelector((state) => state.user.token);
  const [orders, setOrders] = useState([]);
  const [currentSelection, setCurrentSelection] = useState(null);
  useEffect(() => {
    const fetchOrders = async () => {
      const data = await axios.get('/api/order', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(transform(data.data.orders));
    };
    fetchOrders();
  }, [token]);

  const selectionHandler = (selections) => {
    if (selections.length === 1) {
      const selection = orders.filter((item) => item.id === selections[0])[0];
      setCurrentSelection(selection);
    } else {
      setCurrentSelection(null);
    }
  };

  return (
    <>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={orders}
          columns={cols}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          onSelectionModelChange={selectionHandler}
        />
      </Box>
      {currentSelection && <AdminOrdersCurrent {...currentSelection} />}
    </>
  );
}
