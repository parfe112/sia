import React from "react";
import Navbar from "./Navbar";

interface HeaderNavigationProps {
  children?: React.ReactNode;
}

const HeaderNavigation: React.FC<HeaderNavigationProps> = ({ children }) => {
  return <Navbar logoComponent={children} />;
};

export default HeaderNavigation;
