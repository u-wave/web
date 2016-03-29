import * as React from 'react';
import loadScript from 'load-script';

import Loader from '../Loader';

import InternalCaptcha from './ReCaptcha';

const GRECAPTCHA_API = 'https://www.google.com/recaptcha/api.js';
const onloadCallbackName = 'grecaptchaOnload__$';
const onloadCallbacks = [];

window[onloadCallbackName] = () => {
  onloadCallbacks.forEach(fn => fn(window.grecaptcha));
};

export default class ReCaptcha extends React.Component {
  static propTypes = {
    sitekey: React.PropTypes.string.isRequired,
    onResponse: React.PropTypes.func.isRequired
  };

  state = { grecaptcha: window.grecaptcha };

  componentWillMount() {
    if (!this.state.grecaptcha) {
      loadScript(`${GRECAPTCHA_API}?onload=${onloadCallbackName}&render=explicit`);
      onloadCallbacks.push(grecaptcha => this.setState({ grecaptcha }));
    }
  }

  loading() {
    return (
      <Loader
        className="ReCaptcha-spinner"
        size="tiny"
      />
    );
  }

  render() {
    if (!this.state.grecaptcha) {
      return this.loading();
    }
    return (
      <InternalCaptcha
        {...this.props}
        grecaptcha={this.state.grecaptcha}
      />
    );
  }
}
