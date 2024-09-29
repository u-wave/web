function PasswordResetPage() {
  return (
    <html lang="en" dir="ltr">
      <head>
        <meta charSet="utf-8" />
        <title>Reset Password · üWave</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="./src/password-reset/app.css" />
      </head>
      <body>
        <div id="app" />
        <script id="u-wave-config" type="application/json">{}</script>
        <script id="reset-data" type="text/plain">{}</script>
        <script type="module" src="./src/password-reset/app.tsx" />
      </body>
    </html>
  );
}

export default PasswordResetPage;
