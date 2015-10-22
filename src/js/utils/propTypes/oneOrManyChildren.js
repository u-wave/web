import { PropTypes } from 'react';

const oneOrManyChildren =  PropTypes.oneOfType([
  PropTypes.element,
  PropTypes.arrayOf(PropTypes.element)
]);

export default oneOrManyChildren;
