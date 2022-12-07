import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useTranslator } from '@u-wave/react-translate';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import BlockIcon from '@mui/icons-material/Block';
import { banUser } from '../../actions/ModerationActionCreators';

const { useCallback } = React;

function BanButton({ user }) {
  const { t } = useTranslator();
  const dispatch = useDispatch();
  const onClick = useCallback(() => dispatch(banUser(user)), [dispatch, user]);

  return (
    <Tooltip title={t('users.ban')}>
      <IconButton onClick={onClick}>
        <BlockIcon />
      </IconButton>
    </Tooltip>
  );
}
BanButton.propTypes = {
  user: PropTypes.object.isRequired,
};

export default BanButton;
