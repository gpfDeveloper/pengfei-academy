import { useState } from 'react';
import {
  IconButton,
  SwipeableDrawer,
  Box,
  Typography,
  Divider,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import CourseFilter from './CourseFilter';

export default function CourseFilterDrawer({
  courseCount,
  publishedCategories,
  publishedSubcategories,
  publishedLanguages,
  onChangeCategory = () => {},
  onChangeSucategory = () => {},
  onChangeLanguage = () => {},
  onChangePrice = () => {},
  language,
  category,
  subcategory,
  price,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const drawerCloseHandler = () => setIsOpen(false);
  const drawerOpenHandler = () => setIsOpen(true);
  return (
    <>
      <IconButton
        sx={{
          display: 'flex',
          gap: 1,
          borderRadius: 0,
        }}
        onClick={drawerOpenHandler}
      >
        <FilterListIcon />
        <Typography>Filter</Typography>
      </IconButton>
      <SwipeableDrawer
        anchor="right"
        open={isOpen}
        onOpen={drawerOpenHandler}
        onClose={drawerCloseHandler}
        sx={{
          pt: 12,
        }}
      >
        <Box
          sx={{
            width: 240,
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Typography>{courseCount} results</Typography>
          <Divider />
          <CourseFilter
            publishedCategories={publishedCategories}
            publishedSubcategories={publishedSubcategories}
            publishedLanguages={publishedLanguages}
            language={language}
            category={category}
            subcategory={subcategory}
            price={price}
            onChangeCategory={onChangeCategory}
            onChangeSucategory={onChangeSucategory}
            onChangeLanguage={onChangeLanguage}
            onChangePrice={onChangePrice}
          />
        </Box>
      </SwipeableDrawer>
    </>
  );
}
