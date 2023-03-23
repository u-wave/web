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

function createLazyOverlay<TComponent extends React.ElementType>({
  title,
  OverlayComponent = Overlay,
  Component,
}: {
  title: (t: (key: string) => string) => string,
  OverlayComponent: React.ComponentType<{ children: React.ReactElement }>,
  Component: TComponent,
}) {
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

  function LazyOverlay(props: React.ComponentProps<TComponent>) {
    return (
      <OverlayComponent>
        <ErrorBoundary>
          <React.Suspense fallback={<LoadingOverlay />}>
            <Component {...props} />
          </React.Suspense>
        </ErrorBoundary>
      </OverlayComponent>
    );
  }

  return LazyOverlay;
}

export default createLazyOverlay;
