const padZero = n => n < 10 ? `0${n}` : n;

export default function formatDuration(duration) {
  const h = Math.floor(duration / 3600);
  const m = Math.floor((duration % 3600) / 60);
  const s = padZero(Math.floor(duration % 60));
  return (h > 0 ? [ h, m, s ] : [ m, s ]).join(':');
}
