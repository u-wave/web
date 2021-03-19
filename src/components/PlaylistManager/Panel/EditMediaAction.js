import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import EditMediaIcon from '@material-ui/icons/Edit';
import { editMedia } from '../../../actions/PlaylistActionCreators';
import { useMediaListContext } from '../../MediaList/BaseMediaList';
import Action from '../../MediaList/Actions/Action';

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
    <Action onAction={handleClick}>
      <EditMediaIcon />
    </Action>
  );
}

EditMediaAction.propTypes = {
  media: PropTypes.object.isRequired,
};

export default EditMediaAction;
