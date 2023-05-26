import React from "react";
import InfoIcon from "./Icons/InfoIcon";
import styled from "styled-components";

type TooltipProps = {
  children: React.ReactNode;
};

const Area = styled.div`
  transform: translateX(50%) translateY(-20px);
`;

const Tooltip: React.FC<TooltipProps> = ({ children }) => {
  return (
    <div className="tooltipItem">
      <InfoIcon />
      <Area className="tooltipArea">{children}</Area>
    </div>
  );
};

export default Tooltip;
