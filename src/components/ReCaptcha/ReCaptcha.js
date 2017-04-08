import React from 'react';
import PropTypes from 'prop-types';

export default class ReCaptcha extends React.Component {
  static propTypes = {
    grecaptcha: PropTypes.object.isRequired,
    sitekey: PropTypes.string.isRequired,
    theme: PropTypes.string,
    onResponse: PropTypes.func.isRequired
  };

  static defaultProps = {
    theme: 'light'
  };

  componentDidMount() {
    this.props.grecaptcha.render(this.container, {
      sitekey: this.props.sitekey,
      callback: this.handleResponse,
      theme: this.props.theme
    });
  }

  handleResponse = (res) => {
    if (this.props.onResponse) {
      this.props.onResponse(res);
    }
  };

  refContainer = (container) => {
    this.container = container;
  };

  render() {
    return <div ref={this.refContainer} />;
  }
}
