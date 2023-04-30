import { TodoItem } from "./context/todo";
import {
  format,
  parse,
  isAfter,
  isBefore,
  isSameDay,
  differenceInCalendarDays,
} from "date-fns";
import { groupBy } from "lodash";

const sortTodos = (a: TodoItem, b: TodoItem) => {
  if (isBefore(a.date, b.date)) return -1;
  else if (isAfter(a.date, b.date)) return 1;
  else return 0;
};

export const groupItemsByDate = (items: Array<TodoItem>) => {
  const sorted = items.sort(sortTodos);
  return groupBy(sorted, (item) => format(item.date, "LLL d"));
};

export const triage = (date: Date) => {
  const currentDate = new Date();
  if (isSameDay(currentDate, date)) {
    return "medium";
  } else if (isAfter(currentDate, date)) {
    return "high";
  } else {
    return "low";
  }
};

export const getDueDays = (date: Date) => {
  const currentDate = new Date();
  const dueDays = differenceInCalendarDays(date, currentDate);

  if (dueDays === -1) {
    return "Due Yesterday";
  } else if (dueDays === 1) {
    return "Due Tomorrow";
  } else if (dueDays < 0) {
    return `Due ${Math.abs(dueDays)} days ago`;
  } else if (dueDays > 0) {
    return `Due in ${dueDays} days`;
  } else {
    return "Due Today";
  }
};
