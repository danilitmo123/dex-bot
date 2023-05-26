import React from "react";
import visibility from "../../assets/icons/visibility.svg";

export default function ViewIcon() {
  return (
    <img
      style={{
        display: "inline",
        width: "20px",
        cursor: "pointer",
        marginRight: 10,
      }}
      src={visibility}
    />
  );
}
