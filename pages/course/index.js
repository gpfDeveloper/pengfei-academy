import { Box } from '@mui/material';
import CourseItems from 'components/course/items/CourseItems';
import PageLayout from 'components/layouts/PageLayout';
import { getPublishedCourseItemsServer } from 'controllers/publishedCourse';

export default function Courses({
  courseItems,

  language,
  category,
  subcategory,
  price,
}) {
  if (!language) language = 'all';
  if (!category) category = 'all';
  if (!subcategory) subcategory = 'all';
  if (!price) price = 'all';

  // const changePageHandler = (e, page) => {
  //   filterSearch({ page });
  // };

  // const changeCategoryHandler = (category) => {
  //   filterSearch({ category, subcategory: 'all' });
  // };

  // const changeSubcategoryHandler = (subcategory) => {
  //   filterSearch({ subcategory });
  // };

  // const changeLanguageHandler = (language) => {
  //   filterSearch({ language });
  // };

  // const changePriceHandler = (price) => {
  //   filterSearch({ price });
  // };

  return (
    <PageLayout>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', mt: 12, gap: 2, mb: 4 }}
      >
        {/* <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              border: '1px solid',
              borderColor: 'text.secondary',
              visibility: isBelowMd ? 'visiable' : 'hidden',
            }}
          >
            <CourseFilterDrawer
              courseCount={courseCount}
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
          </Box>
          <Typography sx={{ fontWeight: 'bold' }}>
            {' '}
            {courseCount} results
          </Typography>
        </Box> */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
          {/* <Box sx={{ display: isBelowMd ? 'none' : 'block' }}>
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
          </Box> */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              flexGrow: 1,
            }}
          >
            <CourseItems items={courseItems} />
            {/* <Pagination
              count={pageCount}
              variant="outlined"
              page={page}
              color="primary"
              onChange={changePageHandler}
            /> */}
          </Box>
        </Box>
      </Box>
    </PageLayout>
  );
}

export async function getStaticProps() {
  const page = 1;
  let category = '';
  let subcategory = '';
  let language = '';
  let price = '';
  if (category === 'all') category = '';
  if (subcategory === 'all') subcategory = '';
  if (language === 'all') language = '';
  if (price === 'all') price = '';

  const _searchQuery = '';

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
    _searchQuery,
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
    revalidate: 60 * 60 * 24,
  };
}
