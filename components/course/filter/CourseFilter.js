import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
} from '@mui/material';
import React from 'react';

export default function CourseFilter({
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
  return (
    <Stack sx={{ gap: 2 }}>
      <FormControl sx={{ width: 160 }}>
        <InputLabel id="Language">Language</InputLabel>
        <Select
          label="Language"
          value={language}
          onChange={(e) => onChangeLanguage(e.target.value)}
          labelId="Language"
        >
          <MenuItem value="all">All</MenuItem>
          {publishedLanguages.map((k) => (
            <MenuItem value={k} key={k}>
              {k}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 160 }}>
        <InputLabel id="Category">Category</InputLabel>
        <Select
          value={category}
          onChange={(e) => onChangeCategory(e.target.value)}
          label="Category"
          labelId="Category"
        >
          <MenuItem value="all">All</MenuItem>
          {publishedCategories.map((k) => (
            <MenuItem value={k} key={k}>
              {k}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 160 }}>
        <InputLabel id="Subcategory">Subcategory</InputLabel>
        <Select
          value={subcategory}
          onChange={(e) => onChangeSucategory(e.target.value)}
          label="Subcategory"
          labelId="Subcategory"
        >
          <MenuItem value="all">All</MenuItem>
          {publishedSubcategories.map((k) => (
            <MenuItem value={k} key={k}>
              {k}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 160 }}>
        <InputLabel id="price">Price</InputLabel>
        <Select
          value={price}
          onChange={(e) => onChangePrice(e.target.value)}
          label="Price"
          labelId="Price"
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="free">Free</MenuItem>
          <MenuItem value="paid">Paid</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
}
