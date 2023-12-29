import React from 'react';
import { useSelector, useDispatch } from '../hooks/useRedux';
import { dismissError, firstErrorSelector } from '../reducers/errors';
import ErrorArea from '../components/ErrorArea';

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
