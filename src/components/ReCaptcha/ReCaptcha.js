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

    grecaptcha.render(this.container, {
      sitekey,
      theme,
      callback: this.handleResponse,
    });
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
