import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import styles from "./CardRow.module.scss";

const cardRow = cva(styles.base, {
  variants: {},
});

interface Props
  extends React.AllHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardRow> {
  children: React.ReactNode | React.ReactNode[];
}

const CardRow: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <div className={cardRow({ className })} {...props}>
      {children}
    </div>
  );
};

export default CardRow;
