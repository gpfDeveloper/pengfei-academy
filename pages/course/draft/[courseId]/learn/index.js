import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import PageLayout from 'components/layouts/PageLayout';
import Spinner from 'components/UIs/Spinner';
import axios from 'axios';
import CourseLearnPage from 'components/course/learnPage/CourseLearnPage';

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
        const authorId = _course.author;
        const instructorData = await axios.get(
          `/api/profile/public/${authorId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        _course.author = instructorData.data;
        _course.author.id = authorId;
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
    <PageLayout>
      {loading && <Spinner />}
      {!loading && isLogin && isInstructor && (
        <CourseLearnPage course={course} />
      )}
    </PageLayout>
  );
}

export default dynamic(() => Promise.resolve(CourseLearnScreenDraft), {
  ssr: false,
});
