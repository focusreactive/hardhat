import React, { useState } from "react";
import { defaultMenuItemsList, DocumentationSidebarStructure } from "../config";
import MobileSidebarMenu from "./MobileSidebarMenu";
import defaultProps from "./ui/default-props";

import DocumentationNavigation from "./Navigation";
import Sidebar from "./Sidebar";

const { defaultSocialsItems } = defaultProps;

export default {
  title: "Documentation/ Navigation",
};

export const MobileSidebar = () => (
  <MobileSidebarMenu
    menuItems={defaultMenuItemsList}
    socialsItems={defaultSocialsItems}
    sidebarElementsList={DocumentationSidebarStructure}
  />
);

export const SidebarMenu = () => (
  <Sidebar elementsList={DocumentationSidebarStructure} />
);

export const Navigation = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <DocumentationNavigation
      isSidebarOpen={isSidebarOpen}
      setIsSidebarOpen={setIsSidebarOpen}
    />
  );
};
