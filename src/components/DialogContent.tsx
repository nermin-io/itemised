import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import styles from "./DialogContent.module.scss";

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

const DialogContent: React.FC<Props> = ({ children }) => {
  return (
    <Dialog.Content className={styles.DialogContent}>{children}</Dialog.Content>
  );
};

export default DialogContent;
