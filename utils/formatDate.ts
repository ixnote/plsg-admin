export function formatDate(inputDate: any) {
  const date: any = new Date(inputDate);
  const today: any = new Date();

  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const diffTime = today - date;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  const formatToOrdinal = (n: any) => {
    const s = ["th", "st", "nd", "rd"],
      v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  if (diffDays === 0) {
    return "today";
  } else if (diffDays === 1) {
    return "yesterday";
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else {
    const day = formatToOrdinal(date.getDate());
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }
}

// Examples:
