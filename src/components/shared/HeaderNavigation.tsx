import React from "react";
import Navbar from "./Navbar";
import type { ImageMetadata } from "astro";

type LogoUrlType = string | ImageMetadata | undefined;

interface HeaderNavigationProps {
  children?: React.ReactNode;
}

const HeaderNavigation: React.FC<HeaderNavigationProps> = ({ children }) => {
  return <Navbar logoComponent={children} />;
};

export default HeaderNavigation;
