import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useTranslator } from '@u-wave/react-translate';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { joinWaitlist } from '../../actions/WaitlistActionCreators';

const { useCallback } = React;

function AddToWaitlistButton({ user }) {
  const { t } = useTranslator();
  const dispatch = useDispatch();
  const onClick = useCallback(() => dispatch(joinWaitlist(user)), [dispatch, user]);

  return (
    <Tooltip title={t('waitlist.add')}>
      <IconButton onClick={onClick}>
        <GroupAddIcon />
      </IconButton>
    </Tooltip>
  );
}
AddToWaitlistButton.propTypes = {
  user: PropTypes.object.isRequired,
};

export default AddToWaitlistButton;
