import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import PreviewIcon from '@material-ui/icons/Preview';
import { openPreviewMediaDialog } from '../../actions/DialogActionCreators';
import MediaAction from './MediaAction';

const {
  useCallback,
} = React;

function PreviewMediaAction({ media }) {
  const dispatch = useDispatch();
  const handleClick = useCallback(() => {
    dispatch(openPreviewMediaDialog(media));
  }, [dispatch, media]);

  return (
    <MediaAction onClick={handleClick}>
      <PreviewIcon />
    </MediaAction>
  );
}

PreviewMediaAction.propTypes = {
  media: PropTypes.object.isRequired,
};

export default PreviewMediaAction;
