import { createContext, useState } from "react";

export const DarkmodeContext = createContext({
  darkmode: false,
  setDarkmode: () => {},
});

export const DarkmodeProvider = ({ children }) => {
  const [darkmode, setDarkmode] = useState(false);

  const value = { darkmode, setDarkmode };

  return (
    <DarkmodeContext.Provider value={value}>
      {children}
    </DarkmodeContext.Provider>
  );
};
