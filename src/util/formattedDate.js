import { format } from "date-fns";
export const formattedDate = date => {
  return format(date, "MM/DD/YYYY HH:mm:ss A");
};
