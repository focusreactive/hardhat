import React, { useState } from "react";

import DocumentsNavigation from "./Navigation";

export default {
  title: "Common/Documents Navigation",
};

export const Navigation = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <DocumentsNavigation
      isSidebarOpen={isSidebarOpen}
      setIsSidebarOpen={setIsSidebarOpen}
    />
  );
};
