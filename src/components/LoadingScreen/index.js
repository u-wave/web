import React from 'react';
import styled from '@emotion/styled';
import DesktopSkeleton from './DesktopSkeleton';
import MobileSkeleton from './MobileSkeleton';

const DesktopOnly = styled.div({
  display: 'none',
  '@media (min-width: 769px)': {
    display: 'block',
  },
});

const MobileOnly = styled.div({
  display: 'block',
  '@media (min-width: 769px)': {
    display: 'none',
  },
});

export default function LoadingScreen() {
  return (
    <>
      <DesktopOnly>
        <DesktopSkeleton />
      </DesktopOnly>
      <MobileOnly>
        <MobileSkeleton />
      </MobileOnly>
    </>
  );
}
