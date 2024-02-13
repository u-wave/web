import { createStructuredSelector } from 'reselect';
import { useSelector } from './useRedux';
import {
  relativeTimeFormatterSelector,
  timeFormatterSelector,
  dateFormatterSelector,
  dateTimeFormatterSelector,
} from '../reducers/locales';

const intlSelector = createStructuredSelector({
  relativeTimeFormatter: relativeTimeFormatterSelector,
  timeFormatter: timeFormatterSelector,
  dateFormatter: dateFormatterSelector,
  dateTimeFormatter: dateTimeFormatterSelector,
});

export default function useIntl() {
  return useSelector(intlSelector);
}
