import { useRouter } from 'next/router';
import { Box, Pagination, Typography } from '@mui/material';
import CourseItems from 'components/course/items/CourseItems';
import PageLayout from 'components/layouts/PageLayout';
import { getPublishedCourseItemsServer } from 'controllers/publishedCourse';
import CourseFilter from 'components/course/filter/CourseFilter';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CourseFilterDrawer from 'components/course/filter/CourseFilterDrawer';

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
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();
  if (!language) language = 'all';
  if (!category) category = 'all';
  if (!subcategory) subcategory = 'all';
  if (!price) price = 'all';

  const filterSearch = ({ page, category, subcategory, language, price }) => {
    const pathname = '/course';
    const { query } = router;
    if (page) query.page = page;
    if (category) query.category = category;
    if (subcategory) query.subcategory = subcategory;
    if (language) query.language = language;
    if (price) query.price = price;
    router.push({ pathname, query });
  };

  const changePageHandler = (e, page) => {
    filterSearch({ page });
  };

  const changeCategoryHandler = (category) => {
    filterSearch({ category, subcategory: 'all' });
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
        <Box
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
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
          <Box sx={{ display: isBelowMd ? 'none' : 'block' }}>
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
          </Box>
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
  let category = query.category || '';
  let subcategory = query.subcategory || '';
  let language = query.language || '';
  let price = query.price || '';
  if (category === 'all') category = '';
  if (subcategory === 'all') subcategory = '';
  if (language === 'all') language = '';
  if (price === 'all') price = '';

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
