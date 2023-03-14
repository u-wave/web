import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { mdiAccountMultiple } from '@mdi/js';
import SvgIcon from '../../SvgIcon';

function GroupSuggestion({ value, select, selected }) {
  return (
    <button
      type="button"
      onClick={select}
      className={cx('SuggestionItem', selected && 'is-focused')}
    >
      <span className="SuggestionItem-icon">
        <SvgIcon path={mdiAccountMultiple} />
      </span>
      <span className="SuggestionItem-label">{value}</span>
    </button>
  );
}

GroupSuggestion.propTypes = {
  value: PropTypes.string.isRequired,
  select: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
};

export default GroupSuggestion;
