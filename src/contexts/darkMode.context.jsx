import { createContext, useState, useEffect } from "react";

// creating a darkmode context and storing it in LS
export const DarkmodeContext = createContext({
  darkmode: false,
  setDarkmode: () => {},
});

export const DarkmodeProvider = ({ children }) => {
  const [darkmode, setDarkmode] = useState(() => {
    const storedDarkmode = localStorage.getItem("darkmode");
    return storedDarkmode ? JSON.parse(storedDarkmode) : false;
  });

  // making sure it only runs when the darkmode changes + initial load
  useEffect(() => {
    localStorage.setItem("darkmode", JSON.stringify(darkmode));
  }, [darkmode]);

  const value = { darkmode, setDarkmode };

  return (
    <DarkmodeContext.Provider value={value}>
      {children}
    </DarkmodeContext.Provider>
  );
};
