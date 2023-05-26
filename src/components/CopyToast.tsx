import classNames from "classnames";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { abbreviateAddress } from "utils/abbreveareAddress";

const CopyToastEvent = "APP_CopyToastEvent";

let timeout;

const CopyToast = () => {
  const [copy, setCopy] = React.useState<boolean>(false);
  const [address, setAddress] = React.useState<string>("");

  useEffect(() => {
    if (address) {
      setCopy(true);
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        setCopy(false);
        setAddress("");
      }, 3000);
    }
  }, [address]);

  const handleEvent = (e) => {
    setAddress(e["detail"] || "");
  };

  useEffect(() => {
    window.addEventListener(CopyToastEvent, handleEvent);
    return () => {
      window.removeEventListener(CopyToastEvent, handleEvent);
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, []);

  return ReactDOM.createPortal(
    <div className="toast-container position-fixed end-0 top-0 p-3">
      <div
        id="liveToast"
        className={classNames("toast fade", copy ? "show" : "hide")}
      >
        <div className="toast-header">
          <strong className="me-auto">Success</strong>
          <button type="button" className="btn-close"></button>
        </div>
        <div className="toast-body">
          The address {abbreviateAddress(address)} has been copied.
        </div>
      </div>
    </div>,
    document.body
  );
};

export default CopyToast;

export function showCopyToast(account: string) {
  const e = new CustomEvent(CopyToastEvent, { detail: account });
  window.dispatchEvent(e);
}
