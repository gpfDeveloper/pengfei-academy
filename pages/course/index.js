import { useRouter } from 'next/router';
import { Box, Pagination, Typography } from '@mui/material';
import CourseItems from 'components/course/items/CourseItems';
import PageLayout from 'components/layouts/PageLayout';
import { getPublishedCourseItemsServer } from 'controllers/publishedCourse';
import CourseFilter from 'components/course/filter/CourseFilter';

export default function Courses({
  courseItems,
  pageCount,
  page,
  courseCount,
  publishedCategories,
  publishedSubcategories,
  publishedLanguages,
  language,
  category,
  subcategory,
  price,
}) {
  const router = useRouter();
  console.log('aaa');

  const filterSearch = ({ page, category, subcategory, language, price }) => {
    const pathname = '/course';
    const { query } = router;
    if (page) query.page = page;
    if (category) query.category = category;
    if (subcategory !== undefined) query.subcategory = subcategory;
    if (language) query.language = language;
    if (price) query.price = price;
    router.push({ pathname, query });
  };

  const changePageHandler = (e, page) => {
    filterSearch({ page });
  };

  const changeCategoryHandler = (category) => {
    filterSearch({ category, subcategory: '' });
  };

  const changeSubcategoryHandler = (subcategory) => {
    filterSearch({ subcategory });
  };

  const changeLanguageHandler = (language) => {
    filterSearch({ language });
  };

  const changePriceHandler = (price) => {
    filterSearch({ price });
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
          <CourseFilter
            publishedCategories={publishedCategories}
            publishedSubcategories={publishedSubcategories}
            publishedLanguages={publishedLanguages}
            language={language}
            category={category}
            subcategory={subcategory}
            price={price}
            onChangeCategory={changeCategoryHandler}
            onChangeSucategory={changeSubcategoryHandler}
            onChangeLanguage={changeLanguageHandler}
            onChangePrice={changePriceHandler}
          />
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
  const category = query.category || '';
  const subcategory = query.subcategory || '';
  const language = query.language || '';
  const price = query.price || '';

  const {
    courseItems,
    pageCount,
    courseCount,
    publishedCategories,
    publishedSubcategories,
    publishedLanguages,
  } = await getPublishedCourseItemsServer({
    _page: page,
    _category: category,
    _subcategory: subcategory,
    _language: language,
    _price: price,
  });

  return {
    props: {
      pageCount,
      courseCount,
      courseItems,
      page,
      publishedCategories,
      publishedSubcategories,
      publishedLanguages,
      language,
      category,
      subcategory,
      price,
    },
  };
}
