import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Spinner from 'components/UIs/Spinner';
import axios from 'axios';
import CourseLearnPage from 'components/course/learnPage/CourseLearnPage';
import PageLayoutLearning from 'components/layouts/PageLayoutLearning';

function CourseLearnScreenDraft() {
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
        const courseData = await axios.get(
          `/api/instructor/course/${courseId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
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
    <PageLayoutLearning course={course} isPreview={true}>
      {loading && <Spinner />}
      {!loading && isLogin && isInstructor && (
        <CourseLearnPage course={course} />
      )}
    </PageLayoutLearning>
  );
}

export default dynamic(() => Promise.resolve(CourseLearnScreenDraft), {
  ssr: false,
});
