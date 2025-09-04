import { isSameDay as fnsIsSameDay } from "date-fns";

export const useDate = () => {
  const isSameDay = (date1: Date, date2: Date) => {
    return fnsIsSameDay(date1, date2);
  };

  return { isSameDay };
};
