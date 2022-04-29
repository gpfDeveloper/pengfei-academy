import PageLayout from 'components/layouts/PageLayout';
import CourseLandingPage from 'components/course/landingPage/CourseLandingPage';

export default function CourseLandingScreen({ course }) {
  return (
    <PageLayout title={course.title} description={course.subtitle}>
      <CourseLandingPage course={course} />
    </PageLayout>
  );
}

import {
  getPublishedCourseServer,
  getAllPublishedCourseIdsServer,
} from 'controllers/publishedCourse';
import { getPublicProfileServer } from 'controllers/profile';

export async function getStaticPaths() {
  // const slugs = await getAllBlogSlugs();
  // return {
  //   paths: slugs.map((slug) => ({ params: { slug } })),
  //   fallback: true,
  // };
  const ids = await getAllPublishedCourseIdsServer();
  return {
    paths: ids.map((courseId) => ({ params: { courseId } })),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { courseId } = params;

  const course = await getPublishedCourseServer(courseId);
  const authorId = course.author;
  const author = await getPublicProfileServer(authorId);
  course.author = author;
  course.author.id = authorId;
  return {
    props: {
      course,
    },
    revalidate: 60 * 60 * 24,
  };
}

// export async function getServerSideProps({ params }) {
//   const { courseId } = params;

//   const course = await getPublishedCourseServer(courseId);
//   const authorId = course.author;
//   const author = await getPublicProfileServer(authorId);
//   course.author = author;
//   course.author.id = authorId;
//   return {
//     props: {
//       course,
//     },
//   };
// }
