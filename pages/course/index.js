import CourseItems from 'components/course/items/CourseItems';
import PageLayout from 'components/layouts/PageLayout';
import { getPublishedCourseItemsServer } from 'controllers/publishedCourse';

export default function Courses({ courseItems }) {
  return (
    <PageLayout>
      <CourseItems items={courseItems} />
    </PageLayout>
  );
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
