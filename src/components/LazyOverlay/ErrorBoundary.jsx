import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import OverlayContent from '../Overlay/Content';
import OverlayHeader from '../Overlay/Header';
import { closeAll } from '../../actions/OverlayActionCreators';

function ErrorOverlay({ error }) {
  const dispatch = useDispatch();
  const onCloseOverlay = () => dispatch(closeAll());

  return (
    <>
      <OverlayHeader
        title="An error occurred"
        onCloseOverlay={onCloseOverlay}
      />
      <OverlayContent className="LoadingOverlay-body">
        <div className="FatalError">
          <Card raised>
            <CardContent>
              <Typography variant="headline">
                This area could not be displayed because of an error:
              </Typography>
              <Typography component="p">
                {error.message}
              </Typography>
              <Typography component="p">
                The admins have been made aware of this issue.
                Please try again later.
              </Typography>
            </CardContent>
          </Card>
        </div>
      </OverlayContent>
    </>
  );
}

ErrorOverlay.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }).isRequired,
};

export default class ErrorBoundary extends React.Component {
  static propTypes = {
    // onCloseOverlay: PropTypes.func.isRequired,
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

    if (!error) {
      return children;
    }

    return <ErrorOverlay error={error} />;
  }
}
