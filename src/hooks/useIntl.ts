import { createStructuredSelector } from 'reselect';
import {
  dateFormatterSelector,
  dateTimeFormatterSelector,
  relativeTimeFormatterSelector,
  timeFormatterSelector,
} from '../reducers/locales';
import { useSelector } from './useRedux';

const intlSelector = createStructuredSelector({
  relativeTimeFormatter: relativeTimeFormatterSelector,
  timeFormatter: timeFormatterSelector,
  dateFormatter: dateFormatterSelector,
  dateTimeFormatter: dateTimeFormatterSelector,
});

export default function useIntl() {
  return useSelector(intlSelector);
}
