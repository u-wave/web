import React from 'react';
import favicon from '../assets/favicon.ico';
import LoadingScreen from './components/LoadingScreen';

function Index() {
  return (
    <html lang="en" dir="ltr">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>üWave</title>
        <link rel="shortcut icon" href={favicon} />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        <link rel="dns-prefetch" href="https://i.ytimg.com" />
        <link rel="stylesheet" href="./src/app.css" />
      </head>
      <body>
        <div id="app" />
        <div id="app-loading">
          <LoadingScreen />
        </div>
        <script id="u-wave-config" type="application/json">{}</script>
        <script>global=window</script>
        <script type="module" src="./src/app.js" async defer />
      </body>
    </html>
  );
}

export default Index;
