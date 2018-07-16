import React from 'react';
import loadScript from 'load-script2';
import CircularProgress from '@material-ui/core/CircularProgress';
import InternalCaptcha from './ReCaptcha';

const GRECAPTCHA_API = 'https://www.google.com/recaptcha/api.js';
const onloadCallbackName = 'grecaptchaOnload__$';
const onloadCallbacks = [];

function loadReCaptcha(cb) {
  loadScript(`${GRECAPTCHA_API}?onload=${onloadCallbackName}&render=explicit`);
  onloadCallbacks.push(cb);
}

function onload() {
  onloadCallbacks.forEach(fn => fn(window.grecaptcha));
}

export default class ReCaptcha extends React.Component {
  state = {
    grecaptcha: window.grecaptcha,
  };

  componentDidMount() {
    const { grecaptcha } = this.state;

    if (!grecaptcha) {
      this.load();
    }
  }

  load() {
    if (typeof window[onloadCallbackName] !== 'function') {
      window[onloadCallbackName] = onload;
    }

    loadReCaptcha((grecaptcha) => {
      this.setState({ grecaptcha });
    });
  }

  render() {
    const { grecaptcha } = this.state;

    if (!grecaptcha) {
      return <CircularProgress className="ReCaptcha-spinner" />;
    }

    return (
      <InternalCaptcha
        {...this.props}
        grecaptcha={grecaptcha}
      />
    );
  }
}
