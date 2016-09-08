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

export default class ReCaptcha extends React.Component {
  state = { grecaptcha: window.grecaptcha };

  componentWillMount() {
    if (!this.state.grecaptcha) {
      loadScript(`${GRECAPTCHA_API}?onload=${onloadCallbackName}&render=explicit`);
      onloadCallbacks.push(grecaptcha => this.setState({ grecaptcha }));
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
