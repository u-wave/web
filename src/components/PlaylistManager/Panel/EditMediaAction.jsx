import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import SvgIcon from '../../SvgIcon';
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
      <SvgIcon>
        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
      </SvgIcon>
    </MediaAction>
  );
}

EditMediaAction.propTypes = {
  media: PropTypes.object.isRequired,
};

export default EditMediaAction;
