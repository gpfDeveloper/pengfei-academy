import { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateMyCoursePriceAsync } from 'store/course-async';

import {
  Button,
  Stack,
  Select,
  MenuItem,
  Box,
  InputLabel,
  FormControl,
  FormHelperText,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { getAvaliableCoursePrices } from 'utils';

const AVALIABLE_COURSE_PRICES = getAvaliableCoursePrices();

export default function PricingForm() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { token } = user;
  const course = useSelector((state) => state.course);
  const { id: courseId } = course;

  const [isSaving, setIsSaving] = useState(false);

  const {
    formState: { errors },
    handleSubmit,
    control,
    setValue,
  } = useForm();

  useEffect(() => {
    setValue('price', course.price);
  }, []);

  const onSubmit = async ({ price }) => {
    setIsSaving(true);
    await dispatch(
      updateMyCoursePriceAsync({
        courseId,
        token,
        price,
      })
    );
    setIsSaving(false);
  };

  const transformPrice = (price) => {
    if (price === 0) {
      return 'Free';
    } else {
      return `$ ${price}`;
    }
  };
  return (
    <Stack sx={{ gap: 2 }} component="form" onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', mb: 4 }}>
        <FormControl sx={{ minWidth: 200 }} error={Boolean(errors.price)}>
          <InputLabel id="Price">Course Price (USD)</InputLabel>
          <Controller
            name="price"
            defaultValue={''}
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select {...field} label="Course Price (USD)" labelId="Price">
                {AVALIABLE_COURSE_PRICES.map((k) => (
                  <MenuItem value={k} key={k}>
                    {transformPrice(k)}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          {Boolean(errors.price) && (
            <FormHelperText>Please enter a course price</FormHelperText>
          )}
        </FormControl>
      </Box>
      {!isSaving && (
        <Button
          size="large"
          variant="contained"
          type="submit"
          sx={{ alignSelf: 'flex-start' }}
        >
          Save
        </Button>
      )}
      {isSaving && (
        <LoadingButton loading size="large" sx={{ alignSelf: 'flex-start' }}>
          Save
        </LoadingButton>
      )}
    </Stack>
  );
}
