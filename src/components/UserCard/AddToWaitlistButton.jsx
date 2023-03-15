import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '../SvgIcon';
import { useDispatch } from '../../hooks/useRedux';
import { joinWaitlist } from '../../actions/WaitlistActionCreators';

const { useCallback } = React;

// From https://fonts.google.com/icons?selected=Material%20Icons%3Agroup_add%3A
const groupAddIcon = (
  <SvgIcon>
    <polygon points="22,9 22,7 20,7 20,9 18,9 18,11 20,11 20,13 22,13 22,11 24,11 24,9" />
    <path d="M8,12c2.21,0,4-1.79,4-4s-1.79-4-4-4S4,5.79,4,8S5.79,12,8,12z" />
    <path d="M8,13c-2.67,0-8,1.34-8,4v3h16v-3C16,14.34,10.67,13,8,13z" />
    <path d="M12.51,4.05C13.43,5.11,14,6.49,14,8s-0.57,2.89-1.49,3.95C14.47,11.7,16,10.04,16,8S14.47,4.3,12.51,4.05z" />
    <path d="M16.53,13.83C17.42,14.66,18,15.7,18,17v3h2v-3C20,15.55,18.41,14.49,16.53,13.83z" />
  </SvgIcon>
);

function AddToWaitlistButton({ user }) {
  const { t } = useTranslator();
  const dispatch = useDispatch();
  const onClick = useCallback(() => dispatch(joinWaitlist(user)), [dispatch, user]);

  return (
    <Tooltip title={t('waitlist.add')}>
      <IconButton onClick={onClick}>
        {groupAddIcon}
      </IconButton>
    </Tooltip>
  );
}
AddToWaitlistButton.propTypes = {
  user: PropTypes.object.isRequired,
};

export default AddToWaitlistButton;
