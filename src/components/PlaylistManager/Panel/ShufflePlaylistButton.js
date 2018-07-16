import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import { translate } from 'react-i18next';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import ShuffleIcon from '@material-ui/icons/Shuffle';

const enhance = compose(
  withState('isLoading', 'setLoading', false),
  withHandlers({
    onClick: props => () => {
      const { setLoading, onShuffle } = props;

      setLoading(true);
      onShuffle().finally(() => {
        setLoading(false);
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
        <CircularProgress size="100%" />
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
