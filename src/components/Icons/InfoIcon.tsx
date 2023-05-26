import React from "react";
import info from "../../assets/icons/info.svg";

export default function InfoIcon() {
  return (
    <img
      src={info}
      style={{ width: "24px", cursor: "pointer", marginLeft: 10 }}
    />
  );
}
