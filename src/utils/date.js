export function getDateFormat(
  value,
  format = "date",
  dateOptions,
  timeOptions
) {
  let date = ``;

  if (format.includes("dateshort")) {
    date = new Date(value).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
      ...dateOptions,
    });
  } else if (format.includes("date")) {
    date = new Date(value).toLocaleDateString("ru-RU", {
      weekday: "short",
      day: "numeric",
      month: "long",
      year: "numeric",
      ...dateOptions,
    });
  }

  if (format.includes("time")) {
    date += ` ${new Date(value).toLocaleTimeString("ru-RU", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      ...timeOptions,
    })}`;
  }

  return date;
}
