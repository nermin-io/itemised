import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import styles from "./CardHeader.module.scss";

const cardHeader = cva(styles.base, {
  variants: {},
});

interface Props
  extends React.AllHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardHeader> {
  children: React.ReactNode | React.ReactNode[];
}

const CardHeader: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <div className={cardHeader({ className })} {...props}>
      {children}
    </div>
  );
};

export default CardHeader;
