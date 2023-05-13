import React, { useState, useRef } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { TriggerButton } from "@/components/Button";
import DialogFooter from "@/components/DialogFooter";
import styles from "./FileImport.module.scss";
import Field from "@/components/Field";
import FileInput from "@/components/FileInput";
import SelectDropdown from "@/components/SelectDropdown";

interface Props {
}

const IMPORT_OPTIONS = [
  {
    value: 'replace',
    label: 'Replace All',
  },
  {
    value: 'append',
    label: 'Append to List'
  }
]

const FileImport: React.FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const [importOption, setImportOption] = useState(IMPORT_OPTIONS[0].value);

  const fileRef = useRef<HTMLInputElement>(null);
  const selectedFile = fileRef.current?.files?.item(0);

  const handleModalChange = (modalOpen: boolean) => {
    if (fileRef.current) fileRef.current.value = "";
    setOpen(modalOpen);
  }

  const processFile = () => {
    if (!fileRef.current) return;
    console.log(fileRef.current.files);
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleModalChange}>
      <Dialog.Trigger asChild>
        <div>
          <Field>
            <FileInput innerRef={fileRef} intent="media" size="small" accept="application/json" onChange={() => setOpen(true)} />
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
              <SelectDropdown placeholder="Select import bevaviour" items={IMPORT_OPTIONS} value={importOption} onChange={setImportOption} />
            </div>
          </div>
          <DialogFooter>
            <div className={styles.FooterActions}>
              <TriggerButton size="small" intent="primary" onClick={processFile}>Import Data</TriggerButton>
              <Dialog.Close asChild>
                <TriggerButton
                  size="small"
                  intent="secondary"
                >
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
