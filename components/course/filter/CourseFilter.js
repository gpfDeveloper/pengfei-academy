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
  language,
  category,
  subcategory,
  price,
}) {
  return (
    <Stack sx={{ gap: 2 }}>
      <FormControl sx={{ width: 120 }}>
        <InputLabel id="Language">Language</InputLabel>
        <Select
          label="Language"
          value={language}
          onChange={(e) => onChangeLanguage(e.target.value)}
          labelId="Language"
        >
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
          {publishedSubcategories.map((k) => (
            <MenuItem value={k} key={k}>
              {k}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
}
