import { createContext, useState, useEffect } from "react";

// this is the same exact structure as the darkmode context - saving the price is LS
export const PriceContext = createContext({
  totalPrice: 0,
  setTotalPrice: () => {},
});

export const PriceProvider = ({ children }) => {
  const [totalPrice, setTotalPrice] = useState(() => {
    const storedTotalPrice = localStorage.getItem("totalPrice");
    return storedTotalPrice ? parseInt(storedTotalPrice, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem("totalPrice", totalPrice.toString());
  }, [totalPrice]);
  const value = { totalPrice, setTotalPrice };

  return (
    <PriceContext.Provider value={value}>{children}</PriceContext.Provider>
  );
};
