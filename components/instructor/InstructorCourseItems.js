import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Box, Typography } from '@mui/material';
import Spinner from 'components/UIs/Spinner';
import InstructorCourseItem from './InstructorCourseItem';
import axios from 'axios';

export default function InstructorCourseItems() {
  const user = useSelector((state) => state.user);
  const { token } = user;
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const data = await axios.get('/api/instructor/course', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(data.data.courses);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [token]);

  return (
    <Box>
      <Typography variant="h4" mb={4}>
        My courses
      </Typography>
      {loading && <Spinner />}
      {!loading && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {courses.map((course) => (
            <InstructorCourseItem key={course.id} item={course} />
          ))}
        </Box>
      )}
    </Box>
  );
}
