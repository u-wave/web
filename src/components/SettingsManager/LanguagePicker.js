import React from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import compose from 'recompose/compose';
import { translate } from '@u-wave/react-translate';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { availableLanguagesSelector } from '../../selectors/localeSelectors';

const mapStateToProps = createStructuredSelector({
  availableLanguages: availableLanguagesSelector,
});

const enhance = compose(
  translate(),
  connect(mapStateToProps),
);

const LanguagePicker = ({ availableLanguages, t, ...props }) => (
  <Select className="LanguagePicker" {...props}>
    {availableLanguages.map(lang => (
      <MenuItem key={lang} value={lang}>
        {t(`locales.${lang}`)}
      </MenuItem>
    ))}
  </Select>
);

LanguagePicker.propTypes = {
  t: PropTypes.func.isRequired,
  availableLanguages: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default enhance(LanguagePicker);
