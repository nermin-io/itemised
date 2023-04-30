import React from "react";
import styles from "./DialogFooter.module.scss";

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

const DialogFooter: React.FC<Props> = ({ children }) => {
  return <div className={styles.DialogFooter}>{children}</div>;
};

export default DialogFooter;
