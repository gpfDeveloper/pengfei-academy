import { Box } from '@mui/material';
import Spinner from 'components/UIs/Spinner';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMyCourseAsync } from 'store/course-async';
import EditCourseDetailPanel from './EditCourseDetailPanel';

export default function EditCourseDetailPage({ courseId }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { token } = user;
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      await dispatch(getMyCourseAsync({ courseId, token }));
      setLoading(false);
    };
    fetchCourse();
  }, [token, courseId, dispatch]);
  return (
    <Box sx={{ position: 'relative' }}>
      {loading && <Spinner />}
      {!loading && <EditCourseDetailPanel />}
    </Box>
  );
}
