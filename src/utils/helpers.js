import {
  formatDistanceStrict,
  parseISO,
} from 'date-fns';

// ✅ FIXED — same as Jonas
export const subtractDates = (dateStr1, dateStr2) =>
  Math.round((new Date(dateStr1) - new Date(dateStr2)) / (1000 * 60 * 60 * 24));

export const formatDistanceFromNow = (dateStr) =>
  formatDistanceStrict(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace("about ", "")
    .replace("in", "In");

// Supabase needs an ISO date string.
export const getToday = function (options = {}) {
  const today = new Date();

  if (options?.end) today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);

  return today.toISOString();
};

export const formatCurrency = (value) =>
  new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
