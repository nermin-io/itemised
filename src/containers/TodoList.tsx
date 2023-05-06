import CardBody from "@/components/CardBody";
import CardHeader from "@/components/CardHeader";
import useTodos from "@/hooks/todo";
import React from "react";
import NewTaskModal from "./NewTaskModal";
import TodoItem from "./TodoItem";
import { getDueDays, groupItemsByDate, triage } from "@/helpers";
import CardRowGroup from "@/components/CardRowGroup";
import { parse } from "date-fns";
import Switch from "@/components/Switch";
import CardSettings from "@/components/CardSettings";
import Field from "@/components/Field";
import Label from "@/components/Label";
import useSettings from "@/hooks/settings";
import EmptyState from "@/components/EmptyState";
import DatePicker from "@/components/DatePicker";

interface Props {}

const TodoList: React.FC<Props> = () => {
  const { todos, rescheduleMany } = useTodos();
  const { settings, setSetting } = useSettings();
  const outstandingTodos = todos.filter(
    (t) => settings.showCompleted || !t.completed
  );

  const groups = groupItemsByDate(outstandingTodos);

  return (
    <>
      <CardHeader>
        <p>My List</p>
        <NewTaskModal />
      </CardHeader>
      <CardBody>
        <CardSettings>
          <Field>
            <Switch
              checked={settings.showCompleted}
              onCheckedChange={(checked) =>
                setSetting("showCompleted", checked)
              }
              id="show-completed"
            />
            <Label htmlFor="show-completed">Show Completed</Label>
          </Field>
        </CardSettings>
        {outstandingTodos.length === 0 && (
          <EmptyState newUser={settings.newUser} />
        )}
        {Object.keys(groups).map((dateStr) => {
          const date = parse(dateStr, "LLL d", new Date());
          const urgency = triage(date);
          const dueDays = getDueDays(date);
          const items = groups[dateStr];
          return (
            <CardRowGroup key={dateStr} urgency={urgency}>
              <div>
                <p>
                  {dateStr} ({dueDays})
                </p>
                {urgency === "high" && (
                  <DatePicker
                    value={date}
                    onChange={(d) =>
                      rescheduleMany(
                        items.map((item) => item.key),
                        d
                      )
                    }
                  >
                    <a>Reschedule</a>
                  </DatePicker>
                )}
              </div>
              {items.map((item) => (
                <TodoItem key={item.key} item={item} />
              ))}
            </CardRowGroup>
          );
        })}
      </CardBody>
    </>
  );
};

export default TodoList;
