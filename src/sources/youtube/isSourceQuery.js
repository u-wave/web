export default function isSourceQuery(text) {
  // matching youtu.be, youtube.com, youtube-nocookie
  return /https?:\/\/.*?youtu\.?be.*?\//.test(text);
}

