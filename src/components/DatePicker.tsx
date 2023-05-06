import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isEqual,
  isSameMonth,
  isToday,
  parse,
  startOfToday,
  startOfWeek,
} from "date-fns";
import React, { useEffect, useState } from "react";
import styles from "./DatePicker.module.scss";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

export type DatePickerOnChangeHandler = (val: Date) => void;
interface Props {
  value: Date;
  onChange: DatePickerOnChangeHandler;
}

const classNames = (...classes: Array<string | boolean>) => {
  return classes.filter(Boolean).join(" ");
};

const presetDates = (currentDate: Date) => {
  return [
    {
      label: "Tomorrow",
      value: add(currentDate, { days: 1 }),
    },
    {
      label: "Next Week",
      value: add(currentDate, { weeks: 1 }),
    },
    {
      label: "Next Month",
      value: add(currentDate, { months: 1 }),
    },
  ];
};

const DatePicker: React.FC<Props> = ({ value, onChange }) => {
  const today = startOfToday();
  const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  const monthStart = parse(currentMonth, "MMM-yyyy", new Date());

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

  return (
    <div className={styles.DatePickerWrapper}>
      <div className={styles.DatePresets}>
        {presetDates(value).map((preset) => (
          <button
            key={preset.value.toString()}
            className={styles.PresetButton}
            onClick={() => onChange(preset.value)}
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
              onClick={() => onChange(day)}
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
    </div>
  );
};

export default DatePicker;
