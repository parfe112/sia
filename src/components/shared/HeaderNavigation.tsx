import React from "react";
import Navbar from "./Navbar";
import type { ImageMetadata } from "astro";

type LogoUrlType = string | ImageMetadata | undefined;

interface HeaderNavigationProps {
  logoUrl?: LogoUrlType;
}

const HeaderNavigation: React.FC<HeaderNavigationProps> = ({ logoUrl }) => {
  return <Navbar logoUrl={logoUrl} />;
};

export default HeaderNavigation;
