import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  relativeTimeFormatterSelector,
  timeFormatterSelector,
  dateFormatterSelector,
  dateTimeFormatterSelector,
} from '../selectors/localeSelectors';

const intlSelector = createStructuredSelector({
  relativeTimeFormatter: relativeTimeFormatterSelector,
  timeFormatter: timeFormatterSelector,
  dateFormatter: dateFormatterSelector,
  dateTimeFormatter: dateTimeFormatterSelector,
});

export default function useIntl() {
  return useSelector(intlSelector);
}
