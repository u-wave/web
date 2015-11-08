import React from 'react';

export default class FormGroup extends React.Component {
  static propTypes = {
    children: React.PropTypes.element
  };

  render() {
    const { children, ...props } = this.props;
    return (
      <div className="FormGroup" {...props}>
        {children}
      </div>
    );
  }
}
