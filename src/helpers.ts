import { TodoItem } from "./context/todo";
import { format } from "date-fns";
import { groupBy } from "lodash";

export const groupItemsByDate = (items: Array<TodoItem>) => {
  return groupBy(items, (item) => format(item.date, "LLL d"));
};
