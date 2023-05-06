import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isEqual,
  isSameMonth,
  isSaturday,
  isToday,
  isWeekend,
  parse,
  startOfToday,
  startOfWeek,
} from "date-fns";
import React, { useEffect, useState } from "react";
import styles from "./DatePicker.module.scss";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import * as Popover from "@radix-ui/react-popover";

export type DatePickerOnChangeHandler = (val: Date) => void;
interface Props {
  value: Date;
  onChange: DatePickerOnChangeHandler;
  children: React.ReactNode | React.ReactNode[];
}

const classNames = (...classes: Array<string | boolean>) => {
  return classes.filter(Boolean).join(" ");
};

const presetDates = (currentDate: Date) => {
  const isDayWeekend = isWeekend(currentDate);
  return [
    {
      key: "today",
      label: "Today",
      value: startOfToday(),
    },
    {
      key: "tomorrow",
      label: "Tomorrow",
      value: add(currentDate, { days: 1 }),
    },
    {
      key: "weekend",
      label: isDayWeekend ? "Next Weekend" : "This Weekend",
      value: add(currentDate, {
        days: isDayWeekend
          ? isSaturday(currentDate)
            ? 7
            : 6
          : 6 - getDay(currentDate),
      }),
    },
    {
      key: "next_week",
      label: "Next Week",
      value: add(currentDate, {
        weeks: 1,
        days: isDayWeekend ? (isSaturday(currentDate) ? 2 : 1) : 0,
      }),
    },
    {
      key: "next_month",
      label: "Next Month",
      value: add(currentDate, { months: 1 }),
    },
  ];
};

const DatePicker: React.FC<Props> = ({ value, onChange, children }) => {
  const [currentMonth, setCurrentMonth] = useState(format(value, "MMM-yyyy"));
  const monthStart = parse(currentMonth, "MMM-yyyy", new Date());
  const [popoverOpen, setPopoverOpen] = useState(false);

  useEffect(() => {
    if (!isSameMonth(value, monthStart))
      setCurrentMonth(format(value, "MMM-yyyy"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const days = eachDayOfInterval({
    start: startOfWeek(monthStart),
    end: endOfWeek(endOfMonth(monthStart)),
  });

  const previousMonth = () => {
    const firstOfPreviousMonth = add(monthStart, { months: -1 });
    setCurrentMonth(format(firstOfPreviousMonth, "MMM-yyyy"));
  };

  const nextMonth = () => {
    const firstOfNextMonth = add(monthStart, { months: 1 });
    setCurrentMonth(format(firstOfNextMonth, "MMM-yyyy"));
  };

  const setDate = (date: Date) => {
    onChange(date);
    setPopoverOpen(false);
  };

  return (
    <Popover.Root
      open={popoverOpen}
      onOpenChange={(open) => setPopoverOpen(open)}
    >
      <Popover.Trigger asChild>
        <div style={{ cursor: "pointer" }}>{children}</div>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className={styles.DatePickerPopoverContent}
          align="start"
        >
          <div className={styles.DatePresets}>
            {presetDates(value).map((preset) => (
              <button
                key={preset.key}
                className={styles.PresetButton}
                onClick={() => setDate(preset.value)}
              >
                {preset.label}
                <span>{format(preset.value, "EEE MMM d")}</span>
              </button>
            ))}
          </div>
          <div className={styles.DatePickerControls}>
            <button
              type="button"
              onClick={previousMonth}
              className={styles.DatePickerControlsButton}
            >
              <span className={styles.ScreenReader}>Previous month</span>
              <ChevronLeftIcon height={18} width={18} />
            </button>
            <h2 className={styles.Month}>{format(monthStart, "MMMM yyyy")}</h2>
            <button
              onClick={nextMonth}
              type="button"
              className={styles.DatePickerControlsButton}
            >
              <span className={styles.ScreenReader}>Next month</span>
              <ChevronRightIcon height={18} width={18} />
            </button>
          </div>
          <div className={styles.DatePickerGridHeader}>
            <span>S</span>
            <span>M</span>
            <span>T</span>
            <span>W</span>
            <span>T</span>
            <span>F</span>
            <span>S</span>
          </div>
          <div className={styles.DatePickerGrid}>
            {days.map((day) => (
              <div key={day.toString()} className={styles.DatePickerDayCell}>
                <button
                  type="button"
                  onClick={() => setDate(day)}
                  className={classNames(
                    isToday(day) && !isEqual(day, value) && styles.Today,
                    isEqual(day, value) && !isToday(day) && styles.Selected,
                    isEqual(day, value) && isToday(day) && styles.SelectedToday,
                    !isSameMonth(day, monthStart) && styles.AdjacentMonthDay,
                    styles.DatePickerCellButton
                  )}
                >
                  <time dateTime={format(day, "yyyy-MM-dd")}>
                    {format(day, "d")}
                  </time>
                </button>
              </div>
            ))}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default DatePicker;
