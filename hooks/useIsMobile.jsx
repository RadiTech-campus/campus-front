import React, { createContext, useContext, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

const isMobileContext = createContext({});

export const ProvideIsMobile = ({ children }) => {
  const isMobile = useProvideIsMobile();
  return (
    <isMobileContext.Provider value={isMobile}>
      {children}
    </isMobileContext.Provider>
  );
};

export const useIsMobile = () => {
  return useContext(isMobileContext);
};

export default function useProvideIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  const mobile = useMediaQuery({ query: "(max-width: 650px)" });
  useEffect(() => {
    setIsMobile(mobile);
  }, [mobile]);
  return isMobile;
}
