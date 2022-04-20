import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useTranslator } from '@u-wave/react-translate';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import { removeWaitlistUser } from '../../actions/ModerationActionCreators';

const { useCallback } = React;

function RemoveFromWaitlistButton({ user }) {
  const { t } = useTranslator();
  const dispatch = useDispatch();
  const onClick = useCallback(() => dispatch(removeWaitlistUser(user)), [dispatch, user]);

  return (
    <Tooltip title={t('waitlist.remove')}>
      <IconButton onClick={onClick}>
        <GroupRemoveIcon />
      </IconButton>
    </Tooltip>
  );
}
RemoveFromWaitlistButton.propTypes = {
  user: PropTypes.object.isRequired,
};

export default RemoveFromWaitlistButton;
