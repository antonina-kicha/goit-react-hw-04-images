import PropTypes from 'prop-types';
import { useState } from 'react';
import {HiOutlineSearch} from 'react-icons/hi'
import { SearchbarWrapper, SearchForm, SearchFormButton, SearchFormButtonLabel, SearchFormInput } from './Searchbar.styled';

export const Searchbar = ({onSubmit}) => {
  
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (evt) => {
    console.log(evt.currentTarget.value);
    setSearchQuery(evt.currentTarget.value);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(searchQuery.trim());
    setSearchQuery('');
  }

return (
      <SearchbarWrapper>
  <SearchForm onSubmit={handleSubmit}>
          <SearchFormButton type="submit" >
            <HiOutlineSearch size={24}/>
      <SearchFormButtonLabel >Search</SearchFormButtonLabel>
    </SearchFormButton>

    <SearchFormInput
      
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
      value={searchQuery} onChange={handleInputChange}
    />
  </SearchForm>
</SearchbarWrapper> 
    )
}


Searchbar.propTypes = {
    onSubmit: PropTypes.func,
  }

