import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { dismiss } from '../actions/ErrorActionCreators';
import { firstErrorSelector } from '../selectors/errorSelectors';
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
