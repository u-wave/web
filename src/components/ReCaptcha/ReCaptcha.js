import React from 'react';
import PropTypes from 'prop-types';

export default class ReCaptcha extends React.Component {
  static propTypes = {
    grecaptcha: PropTypes.object.isRequired,
    sitekey: PropTypes.string.isRequired,
    theme: PropTypes.string,
    onResponse: PropTypes.func.isRequired,
  };

  static defaultProps = {
    theme: 'light',
  };

  componentDidMount() {
    const { grecaptcha, sitekey, theme } = this.props;

    try {
      grecaptcha.render(this.container, {
        sitekey,
        theme,
        callback: this.handleResponse,
      });
    } catch {
      // If it threw an error, it's probably because of double-mounting in development mode.
    }
  }

  handleResponse = (res) => {
    const { onResponse } = this.props;

    if (onResponse) {
      onResponse(res);
    }
  };

  refContainer = (container) => {
    this.container = container;
  };

  render() {
    return <div ref={this.refContainer} />;
  }
}
