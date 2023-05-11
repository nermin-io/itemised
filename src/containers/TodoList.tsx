import CardBody from "@/components/CardBody";
import CardHeader from "@/components/CardHeader";
import useTodos from "@/hooks/todo";
import React from "react";
import NewTaskModal from "./NewTaskModal";
import { downloadFile, groupItemsByDate } from "@/helpers";
import CardRowGroup from "@/components/CardRowGroup";
import Switch from "@/components/Switch";
import CardSettings from "@/components/CardSettings";
import Field from "@/components/Field";
import Label from "@/components/Label";
import useSettings from "@/hooks/settings";
import EmptyState from "@/components/EmptyState";
import Button from "@/components/Button";
import { DownloadIcon } from "@radix-ui/react-icons";
import { serializer } from "@/providers/TodoProvider";
import { format } from "date-fns";
import FileInput from "@/components/FileInput";

interface Props { }

const TodoList: React.FC<Props> = () => {
  const { todos } = useTodos();
  const { settings, setSetting } = useSettings();
  const outstandingTodos = todos.filter(
    (t) => settings.showCompleted || !t.completed
  );
  const groups = groupItemsByDate(outstandingTodos);

  const exportHandler = () => {
    const exportKey = Buffer.from(
      JSON.stringify(todos, serializer, 2)
    ).toString("base64");
    const contents = JSON.stringify(
      {
        exported_at: new Date().toISOString(),
        key: exportKey,
        data: todos,
      },
      serializer,
      2
    );
    const filename = `itemised_export_${format(
      new Date(),
      "yyyyMMdd_HHmmss"
    )}.json`;
    const blob = new Blob([contents], { type: "application/json" });
    downloadFile(blob, filename);
  };

  const importHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    console.log(files);
  }

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
          <div style={{display: 'flex'}}>
            <Field>
              <FileInput size="small" onChange={importHandler}/>
            </Field>
            <Field>
              <Button onClick={exportHandler} size="small" intent="media">
                <DownloadIcon /> Export
              </Button>
            </Field>
          </div>
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
