import { Component, PropTypes } from 'react';

export default class MuiTheme extends Component {
  static propTypes = {
    theme: PropTypes.object,
    children: PropTypes.node
  };
  static childContextTypes = {
    muiTheme: PropTypes.object
  };

  getChildContext() {
    return {
      muiTheme: this.props.theme
    };
  }

  render() {
    return this.props.children;
  }
}
