import * as React from 'react';

export default class ReCaptcha extends React.Component {
  static propTypes = {
    grecaptcha: React.PropTypes.object.isRequired,
    sitekey: React.PropTypes.string.isRequired,
    theme: React.PropTypes.string,
    onResponse: React.PropTypes.func.isRequired
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
