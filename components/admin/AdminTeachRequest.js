import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { setSnackbar } from 'store/snackbar';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import AdminTechRequestCurrent from './AdminTechRequestCurrent';
import { TEACH_REQUEST_STATUS } from 'utils/constants';
const {
  draft: DRAFT,
  approved: APPROVED,
  rejected: REJECTED,
} = TEACH_REQUEST_STATUS;

const cols = [
  { field: 'id', headerName: 'ID', width: 90, hide: true },
  {
    field: 'userName',
    headerName: 'User name',
    width: 100,
  },
  {
    field: 'sendTime',
    headerName: 'Send time',
    type: 'date',
    width: 200,
  },
  {
    field: 'status',
    headerName: 'Status',
    type: 'singleSelect',
    width: 90,
    valueOptions: [DRAFT, APPROVED, REJECTED],
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 150,
  },
  {
    field: 'hasMeeting',
    headerName: 'Meet',
    type: 'boolean',
    width: 60,
  },
  {
    field: 'message',
    headerName: 'Message',
    description: 'Message from user',
    sortable: false,
    width: 160,
  },
  {
    field: 'adminComment',
    headerName: 'Comment',
    description: 'Comment from admin',
    sortable: false,
    width: 160,
  },
];

const transform = (rawTeachReqs) => {
  const ret = [];
  for (const teachReq of rawTeachReqs) {
    const row = {};
    row.sendTime = moment(teachReq.updatedAt).format('LLL');
    row.userName = teachReq.userName;
    row.email = teachReq.userEmail;
    row.hasMeeting = teachReq.hasMeeting;
    row.message = teachReq.message;
    row.status = teachReq.status;
    row.adminComment = teachReq.adminComment;
    row.id = teachReq.id;
    row.conversationId = teachReq.user.conversationWithAdmin;
    ret.push(row);
  }
  return ret;
};

export default function AdminTeachRequest() {
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const [teachRequests, setTeachRequests] = useState([]);
  const [currentSelection, setCurrentSelection] = useState(null);
  const adminCommentRef = useRef();
  useEffect(() => {
    const fetchTeachReqs = async () => {
      const data = await axios.get('/api/admin/teachRequest', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTeachRequests(transform(data.data));
    };
    fetchTeachReqs();
  }, [token]);
  const selectionHandler = (selections) => {
    if (selections.length === 1) {
      const selection = teachRequests.filter(
        (item) => item.id === selections[0]
      )[0];
      setCurrentSelection(selection);
    } else {
      setCurrentSelection(null);
    }
  };
  const sendCommentHandler = async (e) => {
    e.preventDefault();
    const comment = adminCommentRef.current.value;
    try {
      await axios.put(
        `/api/admin/teachRequest/${currentSelection.id}/comment`,
        { comment },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const newTeachReqs = teachRequests.map((tq) => {
        if (tq.id === currentSelection.id) {
          return { ...tq, adminComment: comment };
        } else {
          return { ...tq };
        }
      });
      setTeachRequests(newTeachReqs);
      dispatch(
        setSnackbar({ severity: 'success', message: 'Update comment success.' })
      );
    } catch (err) {
      setSnackbar({ severity: 'error', message: 'Update comment failed.' });
    }
  };
  const rejectHandler = async () => {
    try {
      await axios.get(`/api/admin/teachRequest/${currentSelection.id}/reject`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      let newTeachReq;
      const newTeachReqs = teachRequests.map((tq) => {
        if (tq.id === currentSelection.id) {
          newTeachReq = { ...tq, status: REJECTED };
          return newTeachReq;
        } else {
          return { ...tq };
        }
      });
      setCurrentSelection(newTeachReq);
      setTeachRequests(newTeachReqs);
      dispatch(
        setSnackbar({ severity: 'success', message: 'Reject success.' })
      );
    } catch (err) {
      dispatch(setSnackbar({ severity: 'error', message: 'Reject failed.' }));
    }
  };
  const approveHandler = async () => {
    try {
      await axios.get(
        `/api/admin/teachRequest/${currentSelection.id}/approve`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      let newTeachReq;
      const newTeachReqs = teachRequests.map((tq) => {
        if (tq.id === currentSelection.id) {
          newTeachReq = { ...tq, status: APPROVED };
          return newTeachReq;
        } else {
          return { ...tq };
        }
      });
      setCurrentSelection(newTeachReq);
      setTeachRequests(newTeachReqs);
      dispatch(
        setSnackbar({ severity: 'success', message: 'Approve success.' })
      );
    } catch (err) {
      dispatch(setSnackbar({ severity: 'error', message: 'Approve failed.' }));
    }
  };
  const hasMeetingHandler = async () => {
    try {
      await axios.get(
        `/api/admin/teachRequest/${currentSelection.id}/setHasMeeting`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      let newTeachReq;
      const newTeachReqs = teachRequests.map((tq) => {
        if (tq.id === currentSelection.id) {
          newTeachReq = { ...tq, hasMeeting: true };
          return newTeachReq;
        } else {
          return { ...tq };
        }
      });
      setCurrentSelection(newTeachReq);
      setTeachRequests(newTeachReqs);
      dispatch(
        setSnackbar({
          severity: 'success',
          message: 'Change has meeting success.',
        })
      );
    } catch (err) {
      dispatch(
        setSnackbar({
          severity: 'error',
          message: 'Change has meeting failed.',
        })
      );
    }
  };
  return (
    <>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={teachRequests}
          columns={cols}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          onSelectionModelChange={selectionHandler}
        />
      </Box>
      {currentSelection && (
        <AdminTechRequestCurrent
          {...currentSelection}
          adminCommentRef={adminCommentRef}
          onSendComment={sendCommentHandler}
          onReject={rejectHandler}
          onApprove={approveHandler}
          onUpdateHasMeeting={hasMeetingHandler}
        />
      )}
    </>
  );
}
