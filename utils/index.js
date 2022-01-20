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
  for (const category in COURSE_CATEGORY) {
    for (const sub in category) {
      ret.push(sub);
    }
  }
  return ret;
};

export const isValidCategory = (category) => {
  return category in COURSE_CATEGORY;
};

export const isValidSubcategory = (subcategory) => {
  for (const category in COURSE_CATEGORY) {
    if (subcategory in category) {
      return true;
    }
  }
  return false;
};
