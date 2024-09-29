import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useDispatch } from '../../hooks/useRedux';
import OverlayContent from '../Overlay/Content';
import OverlayHeader from '../Overlay/Header';
import { closeOverlay } from '../../reducers/activeOverlay';

type ErrorOverlayProps = {
  error: Error,
};
function ErrorOverlay({ error }: ErrorOverlayProps) {
  const dispatch = useDispatch();
  const onCloseOverlay = () => dispatch(closeOverlay());

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
              <Typography variant="h6">
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

type ErrorBoundaryProps = {
  children: React.ReactNode,
};
type ErrorBoundaryState = {
  error: Error | null,
};
export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = {
      error: null,
    };
  }

  static getDerivedStateFromError(error: unknown) {
    if (error instanceof Error) {
      return { error };
    }
    return new Error(String(error || 'Unknown error'));
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
