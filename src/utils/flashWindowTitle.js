let flashing;
let originalTitle;

function unflash() {
  if (!flashing) return;

  clearTimeout(flashing);
  document.title = originalTitle;

  flashing = null;
  originalTitle = null;
}

export default function flashWindowTitle(text) {
  unflash();

  if (!document.hidden) return;

  originalTitle = document.title;

  let stars = false;
  function flash() {
    stars = !stars;
    document.title = stars
      ? `${text} · ${originalTitle}`
      : `! ${text} · ${originalTitle}`;

    if (!document.hidden) unflash();
  }

  flash();
  flashing = setInterval(flash, 1000);
}
