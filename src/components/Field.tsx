import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import styles from "./Field.module.scss";

const field = cva(styles.base, {
  variants: {
    direction: {
      row: styles.row,
      column: styles.column,
    },
  },
  defaultVariants: {
    direction: "row",
  },
});

interface Props
  extends React.AllHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof field> {
  children: React.ReactNode | React.ReactNode[];
}

const Field: React.FC<Props> = ({
  className,
  children,
  direction,
  ...props
}) => {
  return (
    <div className={field({ direction, className })} {...props}>
      {children}
    </div>
  );
};

export default Field;
