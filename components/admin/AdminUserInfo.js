import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { setSnackbar } from 'store/snackbar';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import AdminUserInfoCurrent from './AdminUserInfoCurrent';

const RoleUser = 'User';
const RoleInstructor = 'Instructor';
const RoleAdmin = 'Admin';

const cols = [
  { field: 'id', headerName: 'ID', width: 90, hide: true },
  {
    field: 'name',
    headerName: 'Name',
    width: 100,
  },
  {
    field: 'registeredAt',
    headerName: 'Register At',
    type: 'date',
    width: 200,
  },
  {
    field: 'role',
    headerName: 'Role',
    type: 'singleSelect',
    width: 90,
    valueOptions: [RoleUser, RoleInstructor, RoleAdmin],
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 150,
  },
];

const transform = (rawUserData) => {
  const ret = [];
  for (const userData of rawUserData) {
    const row = {};
    row.registeredAt = moment(userData.createdAt).format('LLL');
    row.name = userData.name;
    row.email = userData.email;
    row.conversationId = userData.conversationWithAdmin;
    const isAdmin = userData.isAdmin;
    const isInstructor = userData.isInstructor;
    row.role = isAdmin ? RoleAdmin : isInstructor ? RoleInstructor : RoleUser;
    row.id = userData.id;
    ret.push(row);
  }
  return ret;
};

export default function AdminUserInfo() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const [users, setUsers] = useState([]);
  const [currentSelection, setCurrentSelection] = useState(null);
  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const data = await axios.get('/api/admin/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(transform(data.data));
      } catch (err) {
        dispatch(
          setSnackbar({ severity: 'error', message: err.response.data.message })
        );
      }
    };
    getAllUsers();
  }, [token, dispatch]);
  const selectionHandler = (selections) => {
    if (selections.length === 1) {
      const selection = users.filter((item) => item.id === selections[0])[0];
      setCurrentSelection(selection);
    } else {
      setCurrentSelection(null);
    }
  };

  return (
    <>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={users}
          columns={cols}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          onSelectionModelChange={selectionHandler}
        />
      </Box>
      {currentSelection && <AdminUserInfoCurrent {...currentSelection} />}
    </>
  );
}
