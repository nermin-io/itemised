import { TodoItem } from "./context/todo";
import { format, parse, isAfter, isBefore, isSameDay } from "date-fns";
import { groupBy } from "lodash";

export const groupItemsByDate = (items: Array<TodoItem>) => {
  return groupBy(items, (item) => format(item.date, "LLL d"));
};

export const getUrgency = (dateStr: string) => {
  const currentDate = new Date();
  const date = parse(dateStr, "LLL d", currentDate);
  if (isSameDay(currentDate, date)) {
    return "medium";
  } else if (isAfter(currentDate, date)) {
    return "high";
  } else {
    return "low";
  }
};
