import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import nest from 'recompose/nest';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import hoistStatics from 'hoist-non-react-statics';
import loadable from 'react-loadable';
import { CircularProgress } from 'material-ui/Progress';
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

  const enhance = compose(
    translate(),
    connect(null, {
      onCloseOverlay: closeAll,
    }),
  );

  const LoadingOverlay = ({
    t,
    pastDelay,
    onCloseOverlay,
  }) => (
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

  LoadingOverlay.propTypes = {
    t: PropTypes.func.isRequired,
    pastDelay: PropTypes.bool.isRequired,
    onCloseOverlay: PropTypes.func.isRequired,
  };

  const LazyOverlay = loadable({
    loader,
    loading: enhance(LoadingOverlay),
  });

  return hoistStatics(nest(OverlayComponent, LazyOverlay), LazyOverlay);
}
