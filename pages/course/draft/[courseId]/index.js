import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import PageLayout from 'components/layouts/PageLayout';
import CourseLandingPage from 'components/course/landingPage/CourseLandingPage';
import Spinner from 'components/UIs/Spinner';
import axios from 'axios';

function CourseLandingScreenDraft() {
  const router = useRouter();
  const user = useSelector((state) => state.user);
  const { isLogin, isInstructor, token } = user;
  const [loading, setLoading] = useState(false);
  const courseId = router.query.courseId;
  const [course, setCourse] = useState(null);
  useEffect(() => {
    if (!isLogin) {
      router.replace('/login');
    } else if (!isInstructor) {
      router.replace('/');
    }
  }, [isLogin, router, isInstructor]);
  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      try {
        const data = await axios.get(`/api/instructor/course/${courseId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourse(data.data.course);
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
    <PageLayout>
      {loading && <Spinner />}
      {!loading && isLogin && isInstructor && (
        <CourseLandingPage course={course} />
      )}
    </PageLayout>
  );
}

export default dynamic(() => Promise.resolve(CourseLandingScreenDraft), {
  ssr: false,
});
