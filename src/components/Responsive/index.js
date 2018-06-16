import MediaQuery from '@u-wave/react-mq';
import withProps from 'recompose/withProps';

export const Mobile = withProps({ query: '(max-width: 767px)' })(MediaQuery);
export const Desktop = withProps({ query: '(min-width: 768px)' })(MediaQuery);
