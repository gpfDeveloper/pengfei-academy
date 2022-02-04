import { useState } from 'react';
import { useRouter } from 'next/router';
import { styled, alpha } from '@mui/material/styles';
import { InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  //   minWidth: '100vw',
}));

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
    //     minWidth: '100vw',
  },
}));

export default function HeaderSearchMobileInput({ onClose }) {
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
      onClose();
    }
  };
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        onChange={changeHandler}
        onKeyDown={inputHandler}
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
      />
    </Search>
  );
}
