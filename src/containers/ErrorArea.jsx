import React from 'react';
import { useSelector, useDispatch } from '../hooks/useRedux';
import { dismiss } from '../actions/ErrorActionCreators';
import { firstErrorSelector } from '../reducers/errors';
import ErrorArea from '../components/ErrorArea';

const {
  useCallback,
} = React;

function ErrorAreaContainer() {
  const error = useSelector(firstErrorSelector);
  const dispatch = useDispatch();
  const onDismiss = useCallback(() => dispatch(dismiss()), [dispatch]);

  return <ErrorArea error={error} onDismiss={onDismiss} />;
}

export default ErrorAreaContainer;
