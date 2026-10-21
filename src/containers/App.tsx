import { ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import React from 'react';
import { Provider as BusProvider } from 'react-bus';
// @ts-expect-error TS7016: Untyped, not worth it as will likely move to fluent
import { TranslateProvider } from '@u-wave/react-translate';
import DesktopApp from '../components/App';
import CrashHandler from '../components/CrashHandler';
import { ClockProvider } from '../context/ClockContext';
import MediaSourceContext, { type MediaSource } from '../context/MediaSourceContext';
import UwaveContext from '../context/UwaveContext';
import { useDispatch, useSelector } from '../hooks/useRedux';
import MobileApp from '../mobile/components/App';
import { closeOverlay, selectOverlay } from '../reducers/activeOverlay';
import { initState } from '../reducers/auth';
import { translatorSelector } from '../reducers/locales';
import { isConnectedSelector } from '../reducers/server';
import { AllStoresProvider } from '../stores';
import createTheme from '../utils/createTheme';
import type Uwave from '../Uwave';

const {
  useCallback,
  useEffect,
  useMemo,
  useRef,
} = React;

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

  const hiddenTimeRef = useRef(0);
  usePageVisibility((visible) => {
    if (visible && (Date.now() - hiddenTimeRef.current) > 60_000) {
      dispatch(initState());
    } else {
      hiddenTimeRef.current = Date.now();
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
      <CrashHandler>
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
      </CrashHandler>
    </ThemeProvider>
  );
}

export default AppContainer;
