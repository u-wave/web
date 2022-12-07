import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import useCurrentUser from '../../hooks/useCurrentUser';
import GuestFooterContent from './GuestFooterContent';
import UserFooterContent from './UserFooterContent';

function FooterBar({ className }) {
  const user = useCurrentUser();

  const content = user && !user.isGuest
    ? <UserFooterContent />
    : <GuestFooterContent />;

  return (
    <div className={cx('FooterBar', className)}>
      {content}
    </div>
  );
}

FooterBar.propTypes = {
  className: PropTypes.string,
};

export default FooterBar;
