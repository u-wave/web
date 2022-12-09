import React from 'react';
import DesktopSkeleton from './DesktopSkeleton';
import MobileSkeleton from './MobileSkeleton';

export default function LoadingScreen() {
  return (
    <>
      <div className="desktop-only">
        <DesktopSkeleton />
      </div>
      <div className="mobile-only">
        <MobileSkeleton />
      </div>
    </>
  );
}
