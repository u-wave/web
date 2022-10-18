import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import InternalCaptcha from './ReCaptcha';

function ReCaptcha(props) {
  return (
    <React.Suspense fallback={<CircularProgress className="ReCaptcha-spinner" />}>
      <InternalCaptcha {...props} />
    </React.Suspense>
  );
}

ReCaptcha.propTypes = InternalCaptcha.propTypes;

export default ReCaptcha;
