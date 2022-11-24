import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { mdiPreview } from '@mdi/js';
import { openPreviewMediaDialog } from '../../actions/DialogActionCreators';
import SvgIcon from '../SvgIcon';
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
      <SvgIcon path={mdiPreview} />
    </MediaAction>
  );
}

PreviewMediaAction.propTypes = {
  media: PropTypes.object.isRequired,
};

export default PreviewMediaAction;
