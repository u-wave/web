import cx from 'classnames';
import React from 'react';
import FormGroup from './Group';

export default class Form extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    children: React.PropTypes.array
  };

  render() {
    const { className, children, ...props } = this.props;
    return (
      <form className={cx('Form', className)} {...props}>
        {children}
      </form>
    );
  }
}

Form.Group = FormGroup;
