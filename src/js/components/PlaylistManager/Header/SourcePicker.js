import cx from 'classnames';
import React from 'react';
import { setSource } from '../../../actions/SearchActionCreators';

export default class SourcePicker extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    selected: React.PropTypes.string
  };

  createElement(sourceName) {
    const activeClass = this.props.selected === sourceName ? 'SourcePickerElement--active' : '';
    const props = {
      className: cx('SourcePickerElement', `SourcePickerElement--${sourceName}`, activeClass),
      onClick() {
        setSource(sourceName);
      }
    };
    return <div {...props} />;
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
