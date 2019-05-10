import React from 'react';
import { ReactReduxContext } from 'react-redux';
import {
  relativeTimeFormatterSelector,
  timeFormatterSelector,
  dateFormatterSelector,
  dateTimeFormatterSelector,
} from '../selectors/localeSelectors';

const { useContext } = React;

export default function useIntl() {
  const { store } = useContext(ReactReduxContext);
  const state = store.getState();

  return {
    relativeTimeFormatter: relativeTimeFormatterSelector(state),
    timeFormatter: timeFormatterSelector(state),
    dateFormatter: dateFormatterSelector(state),
    dateTimeFormatter: dateTimeFormatterSelector(state),
  };
}
