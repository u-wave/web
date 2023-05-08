import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { openPreviewMediaDialog } from '../../actions/DialogActionCreators';
import SvgIcon from '../SvgIcon';
import MediaAction from './MediaAction';

const {
  useCallback,
} = React;

// From https://fonts.google.com/icons?selected=Material%20Icons%3Apreview%3A
const mdiPreview = 'M19,3H5C3.89,3,3,3.9,3,5v14c0,1.1,0.89,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.11,3,19,3z M19,19H5V7h14V19z M13.5,13 c0,0.83-0.67,1.5-1.5,1.5s-1.5-0.67-1.5-1.5c0-0.83,0.67-1.5,1.5-1.5S13.5,12.17,13.5,13z M12,9c-2.73,0-5.06,1.66-6,4 c0.94,2.34,3.27,4,6,4s5.06-1.66,6-4C17.06,10.66,14.73,9,12,9z M12,15.5c-1.38,0-2.5-1.12-2.5-2.5c0-1.38,1.12-2.5,2.5-2.5 c1.38,0,2.5,1.12,2.5,2.5C14.5,14.38,13.38,15.5,12,15.5z';

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