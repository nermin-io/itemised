import { TodoItem } from "./context/todo";
import { format, parse, isAfter, isBefore, isSameDay } from "date-fns";
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
