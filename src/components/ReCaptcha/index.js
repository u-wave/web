import * as React from 'react';
import loadScript from 'load-script';

import Loader from '../Loader';

import InternalCaptcha from './ReCaptcha';

const GRECAPTCHA_API = 'https://www.google.com/recaptcha/api.js';
const onloadCallbackName = 'grecaptchaOnload__$';
const onloadCallbacks = [];

if (typeof window !== 'undefined') {
  window[onloadCallbackName] = () => {
    onloadCallbacks.forEach(fn => fn(window.grecaptcha));
  };
}

function loadReCaptcha(cb) {
  loadScript(`${GRECAPTCHA_API}?onload=${onloadCallbackName}&render=explicit`);
  onloadCallbacks.push(cb);
}

export default class ReCaptcha extends React.Component {
  state = {
    grecaptcha: window.grecaptcha
  };

  componentDidMount() {
    if (!this.state.grecaptcha) {
      loadReCaptcha((grecaptcha) => {
        this.setState({ grecaptcha });
      });
    }
  }

  render() {
    if (!this.state.grecaptcha) {
      return <Loader className="ReCaptcha-spinner" size="tiny" />;
    }
    return (
      <InternalCaptcha
        {...this.props}
        grecaptcha={this.state.grecaptcha}
      />
    );
  }
}
