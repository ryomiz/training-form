"use client";
import type { ComponentProps } from "react";
import type { Matcher } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import type { Holiday } from "@/schema";

type Props = ComponentProps<typeof Calendar> & {
  holidays: Holiday[];
};
export const ApplicationFormCalendar = ({ holidays, ...props }: Props) => {
  const disabled: Matcher[] = [
    {
      dayOfWeek: [0, 7],
    },
    ...holidays
      .filter((holiday) => holiday.type === "NATIONAL_HOLIDAY")
      .map((holiday) => new Date(holiday.date)),
  ];
  return (
    <Calendar
      disabled={disabled}
      showOutsideDays={false}
      weekStartsOn={1}
      {...props}
    />
  );
};
