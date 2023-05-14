import React from "react"
import Container from "./Container";
import FundraisingLink from "./FundraisingLink";

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <Container>
      <div></div>
      {children}
      <FundraisingLink size={25}/>
    </Container>
  );
};

export default Layout;
