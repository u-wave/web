import React from 'react';
import ErrorArea from '../components/ErrorArea';
import { useDispatch, useSelector } from '../hooks/useRedux';
import { dismissError, firstErrorSelector } from '../reducers/errors';

const {
  useCallback,
} = React;

function ErrorAreaContainer() {
  const error = useSelector(firstErrorSelector);
  const dispatch = useDispatch();
  const onDismiss = useCallback(() => dispatch(dismissError()), [dispatch]);

  return <ErrorArea error={error} onDismiss={onDismiss} />;
}

export default ErrorAreaContainer;
