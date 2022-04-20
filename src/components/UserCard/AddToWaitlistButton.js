import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { joinWaitlist } from '../../actions/WaitlistActionCreators';

const { useCallback } = React;

function AddToWaitlistButton({ user }) {
  const dispatch = useDispatch();
  const onClick = useCallback(() => dispatch(joinWaitlist(user)), [dispatch, user]);

  return (
    <IconButton onClick={onClick}>
      <GroupAddIcon />
    </IconButton>
  );
}
AddToWaitlistButton.propTypes = {
  user: PropTypes.object.isRequired,
};

export default AddToWaitlistButton;
