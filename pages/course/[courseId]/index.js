import PageLayout from 'components/layouts/PageLayout';
import CourseLandingPage from 'components/course/landingPage/CourseLandingPage';

export default function CourseLandingScreen({ course }) {
  return (
    <PageLayout title={course.title} description={course.subtitle}>
      <CourseLandingPage course={course} />
    </PageLayout>
  );
}

import { getCourseServer } from 'controllers/publishedCourse';
import { getPublicProfileServer } from 'controllers/profile';

export async function getServerSideProps({ params }) {
  const { courseId } = params;

  const course = await getCourseServer(courseId);
  const authorId = course.author;
  const author = await getPublicProfileServer(authorId);
  course.author = author;
  course.author.id = authorId;
  return {
    props: {
      course,
    },
  };
}
