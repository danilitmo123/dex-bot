import React from "react";
import deleteIcon from "../../assets/icons/delete.svg";

export default function DeleteIcon() {
  return (
    <img
      style={{
        display: "inline",
        width: "20px",
        cursor: "pointer",
      }}
      src={deleteIcon}
    />
  );
}
