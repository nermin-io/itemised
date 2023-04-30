import React from "react";
import styles from "./CardRowGroup.module.scss";
import { cva, type VariantProps } from "class-variance-authority";

const group = cva(styles.base, {
  variants: {
    urgency: {
      high: styles.highUrgency,
      medium: styles.mediumUrgency,
      low: styles.lowUrgency,
    },
  },
  defaultVariants: {
    urgency: "medium",
  },
});

interface Props
  extends React.AllHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof group> {
  children: React.ReactNode | React.ReactNode[];
}

const CardRowGroup: React.FC<Props> = ({ urgency, className, children }) => {
  return <div className={group({ urgency, className })}>{children}</div>;
};

export default CardRowGroup;
