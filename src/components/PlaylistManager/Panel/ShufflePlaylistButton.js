import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import { translate } from 'react-i18next';
import IconButton from 'material-ui/IconButton';
import ShuffleIcon from 'material-ui/svg-icons/av/shuffle';
import Loader from '../../Loader';

const enhance = compose(
  withState('isLoading', 'setLoading', false),
  withHandlers({
    onClick: props => () => {
      props.setLoading(true);
      props.onShuffle().then(() => {
        props.setLoading(false);
      }, () => {
        props.setLoading(false);
      });
    },
  }),
  translate(),
);

const ShuffleButton = ({
  t,
  isLoading,
  onClick,
}) => (
  <IconButton
    onClick={onClick}
    tooltip={t('playlists.shuffle')}
    tooltipPosition="top-center"
  >
    {isLoading ? (
      <Loader size="tiny" />
    ) : (
      <ShuffleIcon color="#555" hoverColor="#fff" />
    )}
  </IconButton>
);

ShuffleButton.propTypes = {
  t: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onShuffle: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
};

export default enhance(ShuffleButton);
