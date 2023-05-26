import React from "react";

type EmptyRowProps = {
  rows: number;
};

const EmptyRow: React.FC<EmptyRowProps> = ({}) => {
  return (
    <tr>
      <td colSpan={100}>Empty</td>
    </tr>
  );
};

export default EmptyRow;
