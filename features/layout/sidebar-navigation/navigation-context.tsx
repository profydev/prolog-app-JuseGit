import React, { useState } from "react";
import { useMediaQuery } from "../../../custom-hooks/usehooks";
import { theme, breakpoint } from "@styles/theme";

type NavigationContextProviderProps = {
  children: React.ReactNode;
};

const defaultContext = {
  isSidebarCollapsed: false,
  isMobile: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleSidebar: () => {},
};

export const NavigationContext = React.createContext(defaultContext);

export function NavigationProvider({
  children,
}: NavigationContextProviderProps) {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(
    defaultContext.isSidebarCollapsed
  );
  const isMobile = !useMediaQuery(
    `(min-width: ${breakpoint("desktop")({ theme })})`
  );

  return (
    <NavigationContext.Provider
      value={{
        isSidebarCollapsed,
        isMobile,
        toggleSidebar: () => setSidebarCollapsed((isCollapsed) => !isCollapsed),
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}
