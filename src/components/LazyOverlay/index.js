import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslator } from '@u-wave/react-translate';
import CircularProgress from '@mui/material/CircularProgress';
import Overlay from '../Overlay';
import OverlayContent from '../Overlay/Content';
import OverlayHeader from '../Overlay/Header';
import { closeAll } from '../../actions/OverlayActionCreators';

const {
  useEffect,
  useState,
} = React;

export default function createLazyOverlay({
  loader,
  title,
  OverlayComponent = Overlay,
}) {
  if (typeof loader !== 'function') throw new TypeError('loader must be a function');

  function LoadingOverlay() {
    const { t } = useTranslator();
    const dispatch = useDispatch();
    const onCloseOverlay = () => dispatch(closeAll());

    // Simulate `pastDelay` from react-loadable
    const [pastDelay, setPastDelay] = useState(false);
    useEffect(() => {
      const timer = setTimeout(() => setPastDelay(true), 1000);
      return () => clearTimeout(timer);
    }, []);

    return (
      <>
        <OverlayHeader
          title={title ? title(t) : '...'}
          onCloseOverlay={onCloseOverlay}
        />
        <OverlayContent className="LoadingOverlay-body">
          {pastDelay && (
            <CircularProgress
              className="LoadingOverlay-spinner"
              thickness={1.6}
            />
          )}
        </OverlayContent>
      </>
    );
  }

  const RealOverlay = React.lazy(loader);

  function LazyOverlay(props) {
    return (
      <OverlayComponent {...props}>
        <React.Suspense fallback={<LoadingOverlay {...props} />}>
          <RealOverlay {...props} />
        </React.Suspense>
      </OverlayComponent>
    );
  }

  return LazyOverlay;
}
