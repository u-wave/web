const formatters = {
  date: {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  },
  time: {
    hour: 'numeric',
    minute: 'numeric',
  },
};

const all = {
  ...formatters.date,
  ...formatters.time,
};

export default function formatJoinDate(date, only) {
  const format = only ? formatters[only] : all;
  return new Date(date).toLocaleString([], format);
}
