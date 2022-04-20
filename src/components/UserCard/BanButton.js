import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import BlockIcon from '@mui/icons-material/Block';
import { banUser } from '../../actions/ModerationActionCreators';

const { useCallback } = React;

function BanButton({ user }) {
  const dispatch = useDispatch();
  const onClick = useCallback(() => dispatch(banUser(user)), [dispatch, user]);

  return (
    <IconButton onClick={onClick}>
      <BlockIcon />
    </IconButton>
  );
}
BanButton.propTypes = {
  user: PropTypes.object.isRequired,
};

export default BanButton;
