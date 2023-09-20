import React, { useState, useRef } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { TriggerButton } from "@/components/Button";
import DialogFooter from "@/components/DialogFooter";
import styles from "./FileImport.module.scss";
import Field from "@/components/Field";
import FileInput from "@/components/FileInput";
import SelectDropdown from "@/components/SelectDropdown";
import { isBoolean } from "lodash";
import { isValid } from "date-fns";
import { deserializer, serializer } from "@/providers/TodoProvider";
import useTodos from "@/hooks/todo";

interface Props {}

enum ImportBehaviour {
  ReplaceAll = "replace",
  Append = "append",
}

const IMPORT_BEHAVIOUR_OPTIONS = [
  {
    value: ImportBehaviour.ReplaceAll,
    label: "Replace All",
  },
  {
    value: ImportBehaviour.Append,
    label: "Append to List",
  },
];

const isValidImportFile = (data: any) => {
  const validProperties =
    data.key &&
    data.data &&
    data.data.every((item: any) => {
      return (
        item.key &&
        item.title &&
        item.description &&
        isValid(item.date) &&
        isBoolean(item.completed)
      );
    });

  if (validProperties) {
    const exportKey = Buffer.from(
      JSON.stringify(data.data, serializer, 2)
    ).toString("base64");

    return exportKey === data.key;
  }

  return false;
};

const FileImport: React.FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [importOption, setImportOption] = useState(ImportBehaviour.Append);
  const { todos, setTodos, addItem } = useTodos();

  const fileRef = useRef<HTMLInputElement>(null);
  const selectedFile = fileRef.current?.files?.item(0);

  const reset = () => {
    if (fileRef.current) fileRef.current.value = "";
    setError("");
    setOpen(false);
    setImportOption(ImportBehaviour.Append);
  };

  const handleModalChange = (modalOpen: boolean) => {
    // reset file input when modal is closed
    if (!modalOpen && fileRef.current) {
      fileRef.current.value = "";
      setError("");
    }
    setOpen(modalOpen);
  };

  const appendItems = (fileImport: any) => {
    const currentKeys = todos.map((t) => t.key);
    fileImport.data
      // filter out items that are already present in the current list
      .filter((item: any) => !currentKeys.includes(item.key))
      .forEach((item: any) => addItem(item));
    reset();
  };

  const replaceItems = (fileImport: any) => {
    setTodos([...fileImport.data]);
    reset();
  };

  const processFile = (e: ProgressEvent<FileReader>) => {
    try {
      const data = JSON.parse(`${e.target?.result}`, deserializer);
      if (!isValidImportFile(data)) {
        setError("The selected file is invalid.");
        return;
      }
      switch (importOption) {
        case ImportBehaviour.Append:
          appendItems(data);
          break;
        case ImportBehaviour.ReplaceAll:
          replaceItems(data);
          break;
      }
    } catch (e) {
      setError("Corrupted File");
    }
  };

  const handleImport = () => {
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.onload = processFile;

    reader.readAsText(selectedFile);
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleModalChange}>
      <Dialog.Trigger asChild>
        <div>
          <Field>
            <FileInput
              innerRef={fileRef}
              intent="media"
              size="small"
              accept="application/json"
              onChange={() => setOpen(true)}
            />
          </Field>
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.DialogOverlay} />
        <Dialog.Content className={styles.DialogContent}>
          <h3>Import file</h3>
          <div className={styles.ImportConfiguration}>
            <div className={styles.ImportFileInfo}>
              <p>File</p>
              <p>{selectedFile?.name}</p>
            </div>
            <div className={styles.ImportBehaviour}>
              <p>Behaviour</p>
              <SelectDropdown
                placeholder="Select import bevaviour"
                items={IMPORT_BEHAVIOUR_OPTIONS}
                value={importOption}
                onChange={(opt) => setImportOption(opt as ImportBehaviour)}
              />
            </div>
          </div>
          <DialogFooter>
            <p className={styles.ImportError}>{error}</p>
            <div className={styles.FooterActions}>
              <TriggerButton
                size="small"
                intent="primary"
                onClick={handleImport}
              >
                Import Data
              </TriggerButton>
              <Dialog.Close asChild>
                <TriggerButton size="small" intent="secondary">
                  Cancel
                </TriggerButton>
              </Dialog.Close>
            </div>
          </DialogFooter>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default FileImport;
