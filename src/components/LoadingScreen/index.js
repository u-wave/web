import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DesktopSkeleton from './DesktopSkeleton';
import MobileSkeleton from './MobileSkeleton';

const useStyles = makeStyles({
  desktop: {
    display: 'none',
    '@media (min-width: 769px)': {
      display: 'block',
    },
  },
  mobile: {
    display: 'block',
    '@media (min-width: 769px)': {
      display: 'none',
    },
  },
});

export default function LoadingScreen() {
  const { desktop, mobile } = useStyles();

  return (
    <>
      <div className={desktop}>
        <DesktopSkeleton />
      </div>
      <div className={mobile}>
        <MobileSkeleton />
      </div>
    </>
  );
}
