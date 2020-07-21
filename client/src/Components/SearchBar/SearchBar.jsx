import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import { StyledSearchBar, StyledSearchBarContent } from '../styles/SearchBarStyles';
import SearchIcon from '@material-ui/icons/Search';

const SearchBar = ({ callback }) => {
  const [state, setState] = useState('');
  const timeOut = useRef(null);

  const handleSearch = (event) => {
    const { value } = event.target;

    clearTimeout(timeOut.current);
    setState(value);

    timeOut.current = setTimeout(() => {
      callback(value);
    }, 500);
  };

  return (
    <StyledSearchBar>
      <StyledSearchBarContent>
        <SearchIcon className="fa-search" name="search" size="2x" />
        <input type="text" placeholder="Search Movie" onChange={handleSearch} value={state} />
      </StyledSearchBarContent>
    </StyledSearchBar>
  );
};
SearchBar.propTypes = {
  callback: PropTypes.func,
};

export default SearchBar;
