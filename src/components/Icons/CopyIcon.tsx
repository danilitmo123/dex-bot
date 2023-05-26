import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import contentCopy from "../../assets/icons/content_copy.svg";
import { showCopyToast } from "../CopyToast";

interface CopyIconProps {
  text: string;
}

const CopyIcon: React.FC<CopyIconProps> = ({ text }) => {
  return (
    <CopyToClipboard text={text} onCopy={() => showCopyToast(text)}>
      <img
        style={{
          display: "inline",
          width: "20px",
          cursor: "pointer",
        }}
        className="me-2"
        src={contentCopy}
      />
    </CopyToClipboard>
  );
};

export default CopyIcon;
