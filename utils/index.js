import { COURSE_CATEGORY } from './constants';

export const sliceText = (text, size) => {
  if (!text) {
    return '';
  }
  const length = text.length;
  if (length <= size || size <= 4) {
    return text;
  } else {
    return text.slice(0, size - 4) + '...';
  }
};

export const getAllCourseCategories = () => {
  return Object.keys(COURSE_CATEGORY);
};

export const getAllCourseSubcategories = () => {
  const ret = [];
  for (const key in COURSE_CATEGORY) {
    const category = COURSE_CATEGORY[key];
    for (const sub in category.subcategory) {
      ret.push(sub);
    }
  }
  return ret;
};

export const isValidCategory = (category, subcategory) => {
  if (!(category in COURSE_CATEGORY)) return false;
  return subcategory in COURSE_CATEGORY[category].subcategory;
};

// export const isValidSubcategory = (subcategory) => {
//   for (const key in COURSE_CATEGORY) {
//     const category = COURSE_CATEGORY[key];
//     if (subcategory in category.subcategory) return true;
//   }
//   return false;
// };
