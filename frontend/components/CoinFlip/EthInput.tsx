import React, { useCallback, useState } from "react";
import styled from "@emotion/styled";
import { Input } from "@mui/material";
/*
const StyledNumberInput = styled.input`
  margin: 0;
  box-sizing: border-box;
  padding: 8px 12px;
  background: white;
  border: ${({ theme }) => `${theme.sizes.border.m} solid ${theme.colors.darkest}`};
  border-radius: ${({ theme }) => theme.sizes.borderRadius.m};
  font-size: ${({ block }) => (block ? "0.9rem" : "0.8rem")};
  text-transform: uppercase;
  letter-spacing: 0.09em;
  font-weight: 700;
  outline: 0;
  &:focus {
    border: ${({ theme }) => `${theme.sizes.border.m} solid ${theme.colors.primary}`};
  }
`;

const Wrapper = styled.span`
  position: relative;
  display: inline-flex;
  margin-bottom: ${({ theme, margin }) => (margin ? theme.space.l : 0)}px;
  &:after {
    content: "Ξ";
    display: inline-flex;
    align-items: center;
    position: absolute;
    right: 12px;
    font-size: 0.9em;
    top: 0;
    bottom: 0;
    color: #aaaaaa;
  }
`;
*/
export const EthInput = ({ value, onChange }:any) => {
  const [internalValue, setInternalValue] = useState(value);
  const handleChange = useCallback(() => {
    const number = Number(internalValue);
    if (!Number.isNaN(number)) {
      onChange(Number(internalValue));
      setInternalValue(number.toString());
    } else {
      setInternalValue(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onChange, internalValue]);

  const handleInternalChange = useCallback((event:any) => {
    setInternalValue(event.currentTarget.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    < >
      <input value={internalValue} onBlur={handleChange} onChange={handleInternalChange} />
    </>
  );
};

export default EthInput;