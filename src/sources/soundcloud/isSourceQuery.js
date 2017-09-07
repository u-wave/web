export default function isSourceQuery(text) {
  return /https?:\/\/soundcloud\.com/.test(text);
}
