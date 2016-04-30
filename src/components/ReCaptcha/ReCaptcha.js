import * as React from 'react';

export default class ReCaptcha extends React.Component {
  static propTypes = {
    grecaptcha: React.PropTypes.object.isRequired,
    sitekey: React.PropTypes.string.isRequired,
    onResponse: React.PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.grecaptcha.render(
      this.refs.container,
      { sitekey: this.props.sitekey, callback: this.handleResponse }
    );
  }

  handleResponse = res => {
    if (this.props.onResponse) {
      this.props.onResponse(res);
    }
  };

  render() {
    return <div ref="container" />;
  }
}
