import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { setSnackbar } from 'store/snackbar';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { COURSE_REVIEW_STATUS } from 'utils/constants';
import AdminCourseReviewRequestCurrent from './AdminCourseReviewRequestCurrent';

const cols = [
  { field: 'id', headerName: 'ID', width: 90, hide: true },
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
    field: 'courseTitle',
    headerName: 'Course Title',
    width: 300,
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
    valueOptions: [
      COURSE_REVIEW_STATUS.reviewing,
      COURSE_REVIEW_STATUS.approved,
      COURSE_REVIEW_STATUS.needsFixes,
    ],
  },
  {
    field: 'adminComment',
    headerName: 'Comment',
    description: 'Comment from admin',
    sortable: false,
    width: 160,
  },
];

const transform = (rawItems) => {
  const ret = [];
  for (const rowItem of rawItems) {
    const row = {};
    row.sendTime = moment(rowItem.updatedAt).format('LLL');
    row.userName = rowItem.userName;
    row.email = rowItem.userEmail;
    row.status = rowItem.status;
    row.adminComment = rowItem.adminComment;
    row.id = rowItem.id;
    row.courseId = rowItem.course?.id;
    row.courseTitle = rowItem.courseTitle;
    row.conversationId = rowItem.user.conversationWithAdmin;
    ret.push(row);
  }
  return ret;
};

export default function AdminCourseReviewRequest() {
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const [courseReviewReqs, setCourseReviewReqs] = useState([]);
  const [currentSelection, setCurrentSelection] = useState(null);
  const adminCommentRef = useRef();
  useEffect(() => {
    const fetchCourseReviewReqs = async () => {
      const data = await axios.get('/api/admin/courseReviewRequest', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourseReviewReqs(transform(data.data));
    };
    fetchCourseReviewReqs();
  }, [token]);
  const selectionHandler = (selections) => {
    if (selections.length === 1) {
      const selection = courseReviewReqs.filter(
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
        `/api/admin/courseReviewRequest/${currentSelection.id}/comment`,
        { comment },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const newCourseReviewReq = courseReviewReqs.map((tq) => {
        if (tq.id === currentSelection.id) {
          return { ...tq, adminComment: comment };
        } else {
          return { ...tq };
        }
      });
      setCourseReviewReqs(newCourseReviewReq);
      dispatch(
        setSnackbar({ severity: 'success', message: 'Update comment success.' })
      );
    } catch (err) {
      setSnackbar({ severity: 'error', message: 'Update comment failed.' });
    }
  };
  const needFixesHandler = async () => {
    try {
      await axios.get(
        `/api/admin/courseReviewRequest/${currentSelection.id}/needFixes`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      let newCourseReviewReq;
      const newCourseReviewReqs = courseReviewReqs.map((item) => {
        if (item.id === currentSelection.id) {
          newCourseReviewReq = {
            ...item,
            status: COURSE_REVIEW_STATUS.needsFixes,
          };
          return newCourseReviewReq;
        } else {
          return { ...item };
        }
      });
      setCurrentSelection(newCourseReviewReq);
      setCourseReviewReqs(newCourseReviewReqs);
      dispatch(
        setSnackbar({ severity: 'success', message: 'Set need fixes success.' })
      );
    } catch (err) {
      dispatch(
        setSnackbar({ severity: 'error', message: 'Set need fixes failed.' })
      );
    }
  };
  const approveAndPublishHandler = async () => {
    try {
      console.log('aa');
      await axios.get(
        `/api/admin/courseReviewRequest/${currentSelection.id}/approveAndPublish`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      let newCourseReviewReq;
      const newCourseReviewReqs = courseReviewReqs.map((item) => {
        if (item.id === currentSelection.id) {
          newCourseReviewReq = {
            ...item,
            status: COURSE_REVIEW_STATUS.approved,
          };
          return newCourseReviewReq;
        } else {
          return { ...item };
        }
      });
      setCurrentSelection(newCourseReviewReq);
      setCourseReviewReqs(newCourseReviewReqs);
      dispatch(
        setSnackbar({ severity: 'success', message: 'Publish success.' })
      );
    } catch (err) {
      dispatch(setSnackbar({ severity: 'error', message: 'Publish failed.' }));
    }
  };

  return (
    <>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={courseReviewReqs}
          columns={cols}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          onSelectionModelChange={selectionHandler}
        />
      </Box>
      {currentSelection && (
        <AdminCourseReviewRequestCurrent
          {...currentSelection}
          adminCommentRef={adminCommentRef}
          onSendComment={sendCommentHandler}
          onNeedFixes={needFixesHandler}
          onApproveAndPublish={approveAndPublishHandler}
        />
      )}
    </>
  );
}
