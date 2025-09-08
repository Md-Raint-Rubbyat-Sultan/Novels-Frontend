import { format } from "date-fns";

export const formatDate = (dateString?: string) => {
  if (!dateString) return "N/A";
  const d = new Date(dateString);
  return isNaN(d.getTime()) ? "N/A" : format(d, "PPpp");
};
