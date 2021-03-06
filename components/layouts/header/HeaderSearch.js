import { useState } from 'react';
import { useRouter } from 'next/router';
import { styled, alpha } from '@mui/material/styles';
import { InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => {
  const isDark = theme.palette.mode === 'dark';
  let backgroundColor;
  let hoverBackgroundColor;
  if (isDark) {
    backgroundColor = alpha(theme.palette.common.white, 0.12);
    hoverBackgroundColor = alpha(theme.palette.common.white, 0.2);
  } else {
    backgroundColor = alpha(theme.palette.common.black, 0.08);
    hoverBackgroundColor = alpha(theme.palette.common.black, 0.12);
  }
  return {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: backgroundColor,
    '&:hover': {
      backgroundColor: hoverBackgroundColor,
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  };
});

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function HeaderSearch() {
  const [inputQuery, setInputQuery] = useState('');
  const router = useRouter();
  const changeHandler = (e) => {
    setInputQuery(e.target.value);
  };
  const inputHandler = (e) => {
    if (e.keyCode === 13) {
      const pathname = '/course';
      const { query } = router;
      query.searchQuery = inputQuery;
      router.push({ pathname, query });
    }
  };
  return (
    <Search sx={{ display: { xs: 'none', sm: 'block' } }}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        onChange={changeHandler}
        onKeyDown={inputHandler}
        placeholder="Search???"
        inputProps={{ 'aria-label': 'search' }}
      />
    </Search>
  );
}
