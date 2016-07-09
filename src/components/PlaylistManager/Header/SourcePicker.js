import cx from 'classnames';
import * as React from 'react';

import injectMediaSources from '../../../utils/injectMediaSources';

class SourcePicker extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    selected: React.PropTypes.string,
    onChange: React.PropTypes.func,

    getAllMediaSources: React.PropTypes.func.isRequired
  };

  createElement(sourceName) {
    const { selected, onChange } = this.props;
    const activeClass = selected === sourceName ? 'SourcePickerElement--active' : '';
    return (
      <div
        className={cx('SourcePickerElement', `SourcePickerElement--${sourceName}`, activeClass)}
        onClick={() => onChange(sourceName)}
      />
    );
  }

  render() {
    const sourceNames = Object.keys(this.props.getAllMediaSources());
    return (
      <div className={cx('SourcePicker', this.props.className)}>
        {sourceNames.map(this.createElement, this)}
      </div>
    );
  }
}

export default injectMediaSources()(SourcePicker);
