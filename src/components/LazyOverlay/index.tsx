import React from 'react';
import { useTranslator } from '@u-wave/react-translate';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch } from '../../hooks/useRedux';
import Overlay from '../Overlay';
import OverlayContent from '../Overlay/Content';
import OverlayHeader from '../Overlay/Header';
import { closeOverlay } from '../../reducers/activeOverlay';
import ErrorBoundary from './ErrorBoundary';

const {
  useEffect,
  useState,
} = React;

function createLazyOverlay<
  ContentProps,
  OverlayProps extends { children: React.ReactNode } = React.ComponentProps<typeof Overlay>
>({
  loader,
  title,
  OverlayComponent = Overlay,
}: {
  loader: () => Promise<{ default: React.ComponentType<ContentProps> }>,
  title: (t: (key: string) => string) => string,
  OverlayComponent: React.ComponentType<OverlayProps>,
}) {
  if (typeof loader !== 'function') throw new TypeError('loader must be a function');

  function LoadingOverlay() {
    const { t } = useTranslator();
    const dispatch = useDispatch();
    const onCloseOverlay = () => dispatch(closeOverlay());

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

  function LazyOverlay(props: React.ComponentProps<typeof RealOverlay>) {
    return (
      <OverlayComponent>
        <ErrorBoundary>
          <React.Suspense fallback={<LoadingOverlay />}>
            <RealOverlay {...props} />
          </React.Suspense>
        </ErrorBoundary>
      </OverlayComponent>
    );
  }

  return LazyOverlay;
}

export default createLazyOverlay;
