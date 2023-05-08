import React from "react";
import styles from "./Sortable.module.scss";

interface Props extends React.AllHTMLAttributes<HTMLDivElement> {
  innerRef?: React.ForwardedRef<HTMLDivElement>;
}

const Sortable: React.FC<Props> = ({ children, innerRef, ...props }) => {
  return (
    <div className={styles.Sortable} ref={innerRef} {...props}>
      {children}
    </div>
  );
};

export default Sortable;
