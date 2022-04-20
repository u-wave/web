import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import { removeWaitlistUser } from '../../actions/ModerationActionCreators';

const { useCallback } = React;

function RemoveFromWaitlistButton({ user }) {
  const dispatch = useDispatch();
  const onClick = useCallback(() => dispatch(removeWaitlistUser(user)), [dispatch, user]);

  return (
    <IconButton onClick={onClick}>
      <GroupRemoveIcon />
    </IconButton>
  );
}
RemoveFromWaitlistButton.propTypes = {
  user: PropTypes.object.isRequired,
};

export default RemoveFromWaitlistButton;
