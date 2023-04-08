import React from 'react';
import PropTypes from 'prop-types';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ThemeProvider } from '@mui/material/styles';
import { Provider as BusProvider } from 'react-bus';
import { TranslateProvider } from '@u-wave/react-translate';
import { useSelector, useDispatch } from '../hooks/useRedux';
import { closeOverlay, selectOverlay } from '../reducers/activeOverlay';
import { themeSelector } from '../selectors/settingSelectors';
import { translatorSelector } from '../selectors/localeSelectors';
import { isConnectedSelector } from '../selectors/serverSelectors';
import DesktopApp from '../components/App';
import MobileApp from '../mobile/components/App';
import FatalError from '../components/FatalError';
import UwaveContext from '../context/UwaveContext';
import { ClockProvider } from '../context/ClockContext';
import MediaSourceContext from '../context/MediaSourceContext';
import { AllStoresProvider } from '../stores';
import { initState } from '../reducers/auth';

const { useCallback, useEffect, useRef } = React;

class ErrorWrapper extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      error: null,
    };
  }

  static getDerivedStateFromError(error) {
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

function usePageVisibility(fn) {
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

function AppContainer({ uwave, mediaSources }) {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const activeOverlay = useSelector(selectOverlay);
  const isConnected = useSelector(isConnectedSelector);
  const theme = useSelector(themeSelector);
  const translator = useSelector(translatorSelector);
  const dispatch = useDispatch();
  const onCloseOverlay = useCallback(() => dispatch(closeOverlay()), [dispatch]);

  useEffect(() => {
    const html = document.documentElement;
    html.dir = theme.direction;

    const root = document.body;
    Object.keys(theme.cssProperties).forEach((prop) => {
      root.style.setProperty(prop, theme.cssProperties[prop]);
    });
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

AppContainer.propTypes = {
  mediaSources: PropTypes.object.isRequired,
  uwave: PropTypes.object,
};

export default AppContainer;
