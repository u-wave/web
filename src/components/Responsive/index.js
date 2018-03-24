import Responsive from 'react-responsive';
import withProps from 'recompose/withProps';

export const Mobile = withProps({ maxWidth: 767 })(Responsive);
export const Desktop = withProps({ minWidth: 768 })(Responsive);
