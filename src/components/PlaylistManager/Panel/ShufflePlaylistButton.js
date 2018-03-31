import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import { translate } from 'react-i18next';
import Tooltip from 'material-ui-next/Tooltip'; // eslint-disable-line
import IconButton from 'material-ui-next/IconButton'; // eslint-disable-line
import ShuffleIcon from 'material-ui-icons/Shuffle';
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
  <Tooltip title={t('playlists.shuffle')} placement="top">
    <IconButton
      className="PlaylistMeta-iconButton"
      onClick={onClick}
    >
      {isLoading ? (
        <Loader size="tiny" />
      ) : (
        <ShuffleIcon />
      )}
    </IconButton>
  </Tooltip>
);

ShuffleButton.propTypes = {
  t: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onShuffle: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
};

export default enhance(ShuffleButton);
