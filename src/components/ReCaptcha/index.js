import React from 'react';
import PropTypes from 'prop-types';

const {
  useEffect,
  useLayoutEffect,
  useRef,
} = React;

const onloadCallbackName = 'grecaptchaOnload__$';

function loadGrecaptcha() {
  return new Promise((resolve, reject) => {
    window[onloadCallbackName] = () => {
      resolve(window.grecaptcha);
      delete window[onloadCallbackName];
    };

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.google.com/recaptcha/api.js?onload=${onloadCallbackName}&render=explicit`;
    script.onload = () => {
      script.onerror = null;
      script.onload = null;
    };
    script.onerror = () => {
      script.onerror = null;
      script.onload = null;
      reject(new Error('Could not load ReCaptcha SDK'));
      delete window[onloadCallbackName];
    };

    document.head.appendChild(script);
  });
}

let grecaptchaPromise = null;
function getGrecaptcha() {
  if (typeof window.grecaptcha === 'object') {
    return Promise.resolve(window.grecaptcha);
  }

  grecaptchaPromise ??= loadGrecaptcha();
  return grecaptchaPromise;
}

function ReCaptcha({ sitekey, theme = 'light', onResponse }) {
  const refContainer = useRef(null);
  const onResponseRef = useRef(onResponse);

  useEffect(() => {
    onResponseRef.current = onResponse;
  });

  useLayoutEffect(() => {
    try {
      window.grecaptcha.render(refContainer.current, {
        sitekey,
        theme,
        callback: (response) => onResponseRef.current?.(response),
      });
    } catch {
      // If it threw an error, it's probably because of double-mounting in development mode.
    }
  }, [sitekey, theme]);

  return <div ref={refContainer} />;
}

ReCaptcha.propTypes = {
  sitekey: PropTypes.string.isRequired,
  theme: PropTypes.string,
  onResponse: PropTypes.func.isRequired,
};

export default React.lazy(() => getGrecaptcha().then(() => ({ default: ReCaptcha })));
