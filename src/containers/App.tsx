import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ThemeProvider } from '@mui/material/styles';
import { Provider as BusProvider } from 'react-bus';
// @ts-expect-error TS7016: Untyped, not worth it as will likely move to fluent
import { TranslateProvider } from '@u-wave/react-translate';
import { useSelector, useDispatch } from '../hooks/useRedux';
import { closeOverlay, selectOverlay } from '../reducers/activeOverlay';
import { translatorSelector } from '../reducers/locales';
import { isConnectedSelector } from '../reducers/server';
import createTheme from '../utils/createTheme';
import DesktopApp from '../components/App';
import MobileApp from '../mobile/components/App';
import FatalError from '../components/FatalError';
import UwaveContext from '../context/UwaveContext';
import { ClockProvider } from '../context/ClockContext';
import MediaSourceContext, { type MediaSource } from '../context/MediaSourceContext';
import { AllStoresProvider } from '../stores';
import { initState } from '../reducers/auth';
import type Uwave from '../Uwave';

const {
  useCallback,
  useEffect,
  useMemo,
  useRef,
} = React;

class ErrorWrapper extends React.Component<
  { children: React.ReactNode },
  { error: object | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);

    this.state = {
      error: null,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static getDerivedStateFromError(error: any) {
    return { error };
  }

  render() {
    const { children } = this.props;
    const { error } = this.state;

    if (error) {
      return (
        <FatalError error={error} />
      );
    }

    return children;
  }
}

function usePageVisibility(fn: (visible: boolean) => void) {
  useEffect(() => {
    const handler = () => {
      fn(!document.hidden);
    };
    window.addEventListener('visibilitychange', handler);
    return () => {
      window.removeEventListener('visibilitychange', handler);
    };
  }, [fn]);
}

type AppContainerProps = {
  uwave: Uwave,
  mediaSources: Record<string, MediaSource>,
};
function AppContainer({ uwave, mediaSources }: AppContainerProps) {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const activeOverlay = useSelector(selectOverlay);
  const isConnected = useSelector(isConnectedSelector);
  const themeOptions = useSelector((state) => state.theme);
  const theme = useMemo(() => createTheme(themeOptions), [themeOptions]);
  const translator = useSelector(translatorSelector);
  const dispatch = useDispatch();
  const onCloseOverlay = useCallback(() => dispatch(closeOverlay()), [dispatch]);

  useEffect(() => {
    const html = document.documentElement;
    html.dir = theme.direction;

    const root = document.body;
    for (const [prop, value = null] of Object.entries(theme.cssProperties)) {
      root.style.setProperty(prop, value);
    }
  }, [theme]);

  const hiddenTime = useRef(0);
  usePageVisibility((visible) => {
    if (visible && (Date.now() - hiddenTime.current) > 60_000) {
      dispatch(initState());
    } else {
      hiddenTime.current = Date.now();
    }
  });

  const props = {
    activeOverlay,
    isConnected,
    onCloseOverlay,
  };

  const app = isMobile
    ? <MobileApp {...props} />
    : <DesktopApp {...props} />;

  return (
    <ThemeProvider theme={theme}>
      <ErrorWrapper>
        <TranslateProvider translator={translator}>
          <BusProvider>
            <ClockProvider>
              <UwaveContext.Provider value={uwave}>
                <MediaSourceContext.Provider mediaSources={mediaSources}>
                  <AllStoresProvider>
                    {app}
                  </AllStoresProvider>
                </MediaSourceContext.Provider>
              </UwaveContext.Provider>
            </ClockProvider>
          </BusProvider>
        </TranslateProvider>
      </ErrorWrapper>
    </ThemeProvider>
  );
}

export default AppContainer;
