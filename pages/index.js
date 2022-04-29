import { Box } from '@mui/material';
import FeaturedCourses from 'components/home/FeaturedCourses';
import Hero from 'components/home/Hero';
import PageLayout from 'components/layouts/PageLayout';
import { getPublishedCourseItemsServer } from 'controllers/publishedCourse';

export default function Home({ featuredCourses }) {
  return (
    <PageLayout>
      <Box
        sx={{ mt: 12, mb: 4, display: 'flex', flexDirection: 'column', gap: 8 }}
      >
        <Hero />
        <FeaturedCourses items={featuredCourses} />
      </Box>
    </PageLayout>
  );
}

export async function getStaticProps() {
  const courses = await getPublishedCourseItemsServer({ _pageSize: 2 });
  return {
    props: {
      featuredCourses: courses.courseItems,
    },
    revalidate: 60 * 60 * 24,
  };
}
