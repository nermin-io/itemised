import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import styles from "./CardBody.module.scss";

const cardBody = cva(styles.base, {
  variants: {},
});

interface Props
  extends React.AllHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardBody> {
  children: React.ReactNode | React.ReactNode[];
}

const CardBody: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <div className={cardBody({ className })} {...props}>
      {children}
    </div>
  );
};

export default CardBody;
