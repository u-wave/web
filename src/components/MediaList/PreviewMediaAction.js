import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import PreviewIcon from '@material-ui/icons/Preview';
import { openPreviewMediaDialog } from '../../actions/DialogActionCreators';
import Action from './Actions/Action';

const {
  useCallback,
} = React;

function PreviewMediaAction({ media }) {
  const dispatch = useDispatch();
  const handleClick = useCallback(() => {
    dispatch(openPreviewMediaDialog(media));
  }, [dispatch, media]);

  return (
    <Action onAction={handleClick}>
      <PreviewIcon />
    </Action>
  );
}

PreviewMediaAction.propTypes = {
  media: PropTypes.object.isRequired,
};

export default PreviewMediaAction;
