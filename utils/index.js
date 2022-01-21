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

const PRICE_MIN = 4.99;
const PRICE_MAX = 999.99;
const PRICE_INTERVEL = 5;
export const getAvaliableCoursePrices = () => {
  const ret = [0];
  let current = PRICE_MIN;
  while (current <= PRICE_MAX) {
    ret.push(current.toFixed(2));
    current += PRICE_INTERVEL;
  }
  return ret;
};
