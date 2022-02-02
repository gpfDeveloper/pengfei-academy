import PageLayout from 'components/layouts/PageLayout';
import { getPublishedCourseItemsServer } from 'controllers/publishedCourse';

export default function Courses({ courseItems }) {
  console.log(courseItems);
  return <PageLayout>courses</PageLayout>;
}

export async function getServerSideProps({ _page }) {
  const page = _page || 1;

  const courseItems = await getPublishedCourseItemsServer({ page });

  return {
    props: {
      courseItems,
    },
  };
}
