import React from 'react';
import PropTypes from 'prop-types';
import nest from 'recompose/nest';
import { useDispatch } from 'react-redux';
import { useTranslator } from '@u-wave/react-translate';
import hoistStatics from 'hoist-non-react-statics';
import loadable from 'react-loadable';
import CircularProgress from '@material-ui/core/CircularProgress';
import Overlay from '../Overlay';
import OverlayContent from '../Overlay/Content';
import OverlayHeader from '../Overlay/Header';
import { closeAll } from '../../actions/OverlayActionCreators';

export default function createLazyOverlay({
  loader,
  title,
  OverlayComponent = Overlay,
}) {
  if (typeof loader !== 'function') throw new TypeError('loader must be a function');

  function LoadingOverlay({ pastDelay }) {
    const { t } = useTranslator();
    const dispatch = useDispatch();
    const onCloseOverlay = () => dispatch(closeAll());

    return (
      <React.Fragment>
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
      </React.Fragment>
    );
  }

  LoadingOverlay.propTypes = {
    pastDelay: PropTypes.bool.isRequired,
  };

  const LazyOverlay = loadable({
    loader,
    loading: LoadingOverlay,
  });

  return hoistStatics(nest(OverlayComponent, LazyOverlay), LazyOverlay);
}
