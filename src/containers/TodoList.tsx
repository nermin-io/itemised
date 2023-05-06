import CardBody from "@/components/CardBody";
import CardHeader from "@/components/CardHeader";
import useTodos from "@/hooks/todo";
import React from "react";
import NewTaskModal from "./NewTaskModal";
import { groupItemsByDate } from "@/helpers";
import CardRowGroup from "@/components/CardRowGroup";
import Switch from "@/components/Switch";
import CardSettings from "@/components/CardSettings";
import Field from "@/components/Field";
import Label from "@/components/Label";
import useSettings from "@/hooks/settings";
import EmptyState from "@/components/EmptyState";

interface Props {}

const TodoList: React.FC<Props> = () => {
  const { todos } = useTodos();
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
        {Object.keys(groups).map((dateKey) => (
          <CardRowGroup
            key={dateKey}
            dateKey={dateKey}
            items={groups[dateKey]}
          />
        ))}
      </CardBody>
    </>
  );
};

export default TodoList;
