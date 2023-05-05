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

interface Props {}

const classNames = (...classes: Array<string | boolean>) => {
  return classes.filter(Boolean).join(" ");
};

const DatePicker: React.FC<Props> = () => {
  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  const monthStart = parse(currentMonth, "MMM-yyyy", new Date());

  useEffect(() => {
    if (!isSameMonth(selectedDay, monthStart))
      setCurrentMonth(format(selectedDay, "MMM-yyyy"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDay]);

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
      <div className={styles.DatePickerControls}>
        <button
          type="button"
          onClick={previousMonth}
          className={styles.DatePickerControlsButton}
        >
          <span className={styles.ScreenReader}>Previous month</span>
          <ChevronLeftIcon height={20} width={20} />
        </button>
        <h2 className={styles.Month}>{format(monthStart, "MMMM yyyy")}</h2>
        <button
          onClick={nextMonth}
          type="button"
          className={styles.DatePickerControlsButton}
        >
          <span className={styles.ScreenReader}>Next month</span>
          <ChevronRightIcon height={20} width={20} />
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
              onClick={() => setSelectedDay(day)}
              className={classNames(
                isToday(day) && !isEqual(day, selectedDay) && styles.Today,
                isEqual(day, selectedDay) && !isToday(day) && styles.Selected,
                isEqual(day, selectedDay) &&
                  isToday(day) &&
                  styles.SelectedToday,
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
