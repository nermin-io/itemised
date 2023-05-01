import React from "react";
import { motion } from "framer-motion";

interface Props extends React.SVGAttributes<HTMLOrSVGElement> {}

const CheckIcon: React.FC<Props> = ({ height = 18, width = 18, ...props }) => {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      height={height}
      width={width}
      {...props}
    >
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L18 7"
      />
    </svg>
  );
};

export default CheckIcon;
