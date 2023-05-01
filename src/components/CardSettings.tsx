import React from "react";
import styles from "./CardSettings.module.scss";

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

const CardSettings: React.FC<Props> = ({ children }) => {
  return <div className={styles.CardSettings}>{children}</div>;
};

export default CardSettings;
