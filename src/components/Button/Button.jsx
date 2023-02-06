import PropTypes from 'prop-types';
import {LoadButton} from './Button.styled'

export const Button = ({ onClick }) => {
    return (
      <LoadButton type="button" onClick = {onClick}>
      <span>Load more</span>
    </LoadButton>
    )
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
}