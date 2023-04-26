import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import styles from "./Card.module.scss";

const card = cva(styles.base, {
  variants: {},
});

interface Props
  extends React.AllHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof card> {
  children: React.ReactNode | React.ReactNode[];
}

const Card: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <div className={card({ className })} {...props}>
      {children}
    </div>
  );
};

export default Card;
