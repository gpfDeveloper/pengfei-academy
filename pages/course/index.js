import { useRouter } from 'next/router';
import { Box, Pagination, Typography } from '@mui/material';
import CourseItems from 'components/course/items/CourseItems';
import PageLayout from 'components/layouts/PageLayout';
import { getPublishedCourseItemsServer } from 'controllers/publishedCourse';

export default function Courses({ courseItems, pageCount, page, courseCount }) {
  const router = useRouter();
  const changePageHandler = (e, page) => {
    filterSeach({ page });
  };

  const filterSeach = ({ page }) => {
    const pathname = '/course';
    const { query } = router;
    if (page) query.page = page;
    router.push({ pathname, query });
  };
  return (
    <PageLayout>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', mt: 12, gap: 2, mb: 4 }}
      >
        <Typography sx={{ fontWeight: 'bold', alignSelf: 'flex-end' }}>
          {' '}
          {courseCount} results
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>Filter</Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <CourseItems items={courseItems} />
            <Pagination
              count={pageCount}
              page={page}
              color="primary"
              onChange={changePageHandler}
            />
          </Box>
        </Box>
      </Box>
    </PageLayout>
  );
}

export async function getServerSideProps({ query }) {
  const page = +query.page || 1;

  const { courseItems, pageCount, courseCount } =
    await getPublishedCourseItemsServer({ _page: page });

  return {
    props: {
      pageCount,
      courseCount,
      courseItems,
      page,
    },
  };
}
