import React from "react";
import Container from "./Container";

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

const Layout: React.FC<Props> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Layout;
