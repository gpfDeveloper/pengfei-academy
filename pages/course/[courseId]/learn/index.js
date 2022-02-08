import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Spinner from 'components/UIs/Spinner';
import axios from 'axios';
import CourseLearnPage from 'components/course/learnPage/CourseLearnPage';
import PageLayoutLearning from 'components/layouts/PageLayoutLearning';

function CourseLearnScreen() {
  const router = useRouter();
  const user = useSelector((state) => state.user);
  const { isLogin, token } = user;
  const [loading, setLoading] = useState(false);
  const courseId = router.query.courseId;
  const [course, setCourse] = useState(null);
  useEffect(() => {
    if (!isLogin) {
      router.replace('/login');
    }
  }, [isLogin, router]);
  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      try {
        const courseData = await axios.get(`/api/course/${courseId}/learn`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const _course = courseData.data.course;
        setCourse(_course);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    if (courseId) {
      fetchCourse();
    }
  }, [courseId, token]);
  return (
    <PageLayoutLearning course={course}>
      {loading && <Spinner />}
      {!loading && isLogin && <CourseLearnPage course={course} />}
    </PageLayoutLearning>
  );
}

export default dynamic(() => Promise.resolve(CourseLearnScreen), {
  ssr: false,
});
