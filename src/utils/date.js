export function getDateFormat(
  value,
  format = "date",
  locale = "ru-RU",
  dateOptions,
  timeOptions
) {
  let date = ``;

  if (format.includes("datedot")) {
    date = new Date(value).toLocaleDateString(locale, {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      ...dateOptions,
    });
  } else if (format.includes("dateshort")) {
    date = new Date(value).toLocaleDateString(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
      ...dateOptions,
    });
  } else if (format.includes("date")) {
    date = new Date(value).toLocaleDateString(locale, {
      weekday: "short",
      day: "numeric",
      month: "long",
      year: "numeric",
      ...dateOptions,
    });
  }

  if (format.includes("time")) {
    date += ` ${new Date(value).toLocaleTimeString(locale, {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      ...timeOptions,
    })}`;
  }

  return date;
}
