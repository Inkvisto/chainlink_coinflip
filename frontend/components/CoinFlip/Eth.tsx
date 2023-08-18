import React from "react";

const toSignificant = (value: any, signif: any) => {
  const [base, decimals] = value.split(".");
  return [base, (decimals && decimals.substring(0, signif - base.length)) || "0"].join(".");
};

export const Eth = ({ children, signif = 6 }: any) => {
  const converted = toSignificant(children || "0", signif);

  if (!isNaN(children))  return <span>Ξ {converted}</span>;
  return <span>{children}</span>;
  
};

export default Eth;