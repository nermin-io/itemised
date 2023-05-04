import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  formatISO,
  getDay,
  isEqual,
  isToday,
  parse,
  startOfToday,
} from "date-fns";
import React, { useState } from "react";
import styles from "./Calendar.module.scss";

interface Props {}

const columnStart = (day: Date, dayIndex: number) => {
  if (dayIndex !== 0) return {};
  return {
    gridColumnStart: getDay(day) + 1,
  };
};

function classNames(...classes: Array<string | boolean>) {
  return classes.filter(Boolean).join(" ");
}

const Calendar: React.FC<Props> = () => {
  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  console.log("selectedDay", selectedDay);

  const days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  function previousMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  return (
    <div>
      <div className={styles.CalendarControls}>
        <h2 className={styles.Month}>
          {format(firstDayCurrentMonth, "MMMM yyyy")}
        </h2>
        <button
          type="button"
          onClick={previousMonth}
          className={styles.CalendarControlsButton}
        >
          <span className={styles.SrHelper}>Previous month</span>
          {"<"}
        </button>
        <button
          onClick={nextMonth}
          type="button"
          className={styles.CalendarControlsButton}
        >
          <span className={styles.SrHelper}>Next month</span>
          {">"}
        </button>
      </div>
      <div className={styles.CalendarGridHeader}>
        <div>S</div>
        <div>M</div>
        <div>T</div>
        <div>W</div>
        <div>T</div>
        <div>F</div>
        <div>S</div>
      </div>
      <div className={styles.CalendarGrid}>
        {days.map((day, dayIdx) => (
          <div
            key={day.toString()}
            style={columnStart(day, dayIdx)}
            className={styles.CalendarCell}
          >
            <button
              type="button"
              onClick={() => setSelectedDay(day)}
              className={classNames(
                isToday(day) && styles.Today,
                isEqual(day, selectedDay) && styles.Selected,
                styles.CalendarCellButton
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

export default Calendar;
