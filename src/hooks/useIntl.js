import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  relativeTimeFormatterSelector,
  timeFormatterSelector,
  dateFormatterSelector,
  dateTimeFormatterSelector,
  numberFormatterSelector,
} from '../selectors/localeSelectors';

const intlSelector = createStructuredSelector({
  relativeTimeFormatter: relativeTimeFormatterSelector,
  timeFormatter: timeFormatterSelector,
  dateFormatter: dateFormatterSelector,
  dateTimeFormatter: dateTimeFormatterSelector,
  numberFormatter: numberFormatterSelector,
});

export default function useIntl() {
  return useSelector(intlSelector);
}
