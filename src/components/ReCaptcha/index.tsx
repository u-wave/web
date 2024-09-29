import {
  lazy, useEffect, useLayoutEffect, useRef,
} from 'react';

const onloadCallbackName = 'grecaptchaOnload__$' as const;

declare global {
  interface Window {
    grecaptchaOnload__$?: () => void;
    grecaptcha: {
      render: (element: HTMLElement, options: {
        sitekey: string,
        theme: 'light' | 'dark',
        callback: (response: string) => void,
      }) => void,
    }
  }
}

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

type ReCaptchaProps = {
  sitekey: string,
  theme?: 'light' | 'dark',
  onResponse: (response: string) => void,
};
function ReCaptcha({ sitekey, theme = 'light', onResponse }: ReCaptchaProps) {
  const refContainer = useRef<HTMLDivElement>(null);
  const onResponseRef = useRef(onResponse);

  useEffect(() => {
    onResponseRef.current = onResponse;
  });

  useLayoutEffect(() => {
    if (refContainer.current == null) return;
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

export default lazy(() => getGrecaptcha().then(() => ({ default: ReCaptcha })));
