function getExpress() {
  try {
    return require('express');
  } catch (e) {
    throw new Error('Could not find express');
  }
}

export default function uwaveWebClient(basePath = __dirname) {
  const express = getExpress();
  return express.Router() // eslint-disable-line new-cap
    .use(express.static(basePath));
}
