import PropTypes from 'prop-types';
import { Component } from 'react';
import {HiOutlineSearch} from 'react-icons/hi'
import { SearchbarWrapper, SearchForm, SearchFormButton, SearchFormButtonLabel, SearchFormInput } from './Searchbar.styled';

export class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
  }
  
  state = {
    searchQuery: '',
  }

  handleInputChange = (evt) => {
    console.log(evt.currentTarget.value);
    this.setState({ searchQuery: evt.currentTarget.value });
}

  handleSubmit = (evt) => {
    evt.preventDefault();
    this.props.onSubmit(this.state.searchQuery.trim());
    this.setState({ searchQuery: '' });

  }

  render() {
    return (
      <SearchbarWrapper>
  <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit" >
            <HiOutlineSearch size={24}/>
      <SearchFormButtonLabel >Search</SearchFormButtonLabel>
    </SearchFormButton>

    <SearchFormInput
      
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
      value={this.state.searchQuery} onChange={this.handleInputChange}
    />
  </SearchForm>
</SearchbarWrapper> 
    )
  }
}


