import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import EditMediaIcon from '@material-ui/icons/Edit';
import { editMedia } from '../../../actions/PlaylistActionCreators';
import { useMediaListContext } from '../../MediaList/BaseMediaList';
import MediaAction from '../../MediaList/MediaAction';

const {
  useCallback,
} = React;

function EditMediaAction({ media }) {
  const { playlist } = useMediaListContext();
  const dispatch = useDispatch();
  const handleClick = useCallback(() => {
    dispatch(editMedia(playlist._id, media));
  }, [dispatch, playlist, media]);

  return (
    <MediaAction onClick={handleClick}>
      <EditMediaIcon />
    </MediaAction>
  );
}

EditMediaAction.propTypes = {
  media: PropTypes.object.isRequired,
};

export default EditMediaAction;
