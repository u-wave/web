import cx from 'classnames';
import React, { Component, PropTypes } from 'react';

export default class SourcePicker extends Component {
  static propTypes = {
    className: PropTypes.string,
    selected: PropTypes.string,
    onChange: PropTypes.func
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
    return (
      <div className={cx('SourcePicker', this.props.className)}>
        {this.createElement('youtube')}
        {this.createElement('soundcloud')}
      </div>
    );
  }
}
