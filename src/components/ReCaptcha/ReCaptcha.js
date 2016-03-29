import * as React from 'react';

export default class ReCaptcha extends React.Component {
  static propTypes = {
    grecaptcha: React.PropTypes.object.isRequired,
    sitekey: React.PropTypes.string.isRequired
  };

  componentDidMount() {
    this.props.grecaptcha.render(
      this.refs.container,
      { sitekey: this.props.sitekey }
    );
  }

  render() {
    return <div ref="container" />;
  }
}
