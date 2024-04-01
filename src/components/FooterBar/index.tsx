import cx from 'clsx';
import useCurrentUser from '../../hooks/useCurrentUser';
import GuestFooterContent from './GuestFooterContent';
import UserFooterContent from './UserFooterContent';

type FooterBarProps = {
  className?: string,
};
function FooterBar({ className }: FooterBarProps) {
  const user = useCurrentUser();

  const content = user
    ? <UserFooterContent user={user} />
    : <GuestFooterContent />;

  return (
    <div className={cx('FooterBar', className)}>
      {content}
    </div>
  );
}

export default FooterBar;
