import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import styles from "./DateToggle.module.scss";
import {
  add,
  format,
  isPast,
  isThisWeek,
  isToday,
  isTomorrow,
  isWeekend,
  isWithinInterval,
  startOfToday,
} from "date-fns";
import { CalendarIcon } from "@radix-ui/react-icons";

const classNames = cva(styles.base, {
  variants: {
    size: {
      small: styles.small,
      medium: styles.medium,
      large: styles.large,
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

const shouldDisplaySimpleDate = (date: Date) => {
  const daysInFuture = 6;
  const today = startOfToday();

  if (isThisWeek(date)) return true;
  if (
    isWeekend(today) &&
    isWithinInterval(date, {
      start: today,
      end: add(today, { days: daysInFuture }),
    })
  )
    return true;
};

const humanFriendlyDate = (date: Date) => {
  if (isToday(date)) return "Today";
  if (isPast(date)) return "Invallid Date";
  if (isTomorrow(date)) return "Tomorrow";
  if (shouldDisplaySimpleDate(date)) return format(date, "EEE");
  return format(date, "EEE MMM e");
};

type ButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "size">;

interface Props extends ButtonProps, VariantProps<typeof classNames> {
  date: Date;
}

const DateToggle: React.FC<Props> = ({ date, size, className, ...props }) => {
  return (
    <button
      type="button"
      className={classNames({ size, className })}
      {...props}
    >
      <CalendarIcon />
      {humanFriendlyDate(date)}
    </button>
  );
};

export default DateToggle;
