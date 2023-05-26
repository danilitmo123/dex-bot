import React, { FC, useState } from "react";
import useBlackList from "hooks/useBlackList";
import DeleteIcon from "../../Icons/DeleteIcon";
import CopyIcon from "../../Icons/CopyIcon";
import classNames from "classnames";
import { isAddress } from "utils/contractsHelper";
import EmptyRow from "../../Form/EmptyRow";
import { usePagination } from "../../../hooks/usePagination";

interface BlacklistProps {
  profileId: number;
}

const Blacklist: FC<BlacklistProps> = ({ profileId }) => {
  const [modal, setModal] = React.useState(false);
  const { list, create, remove } = useBlackList();
  const [address, setAddress] = useState<string>("");
  const [error, setError] = useState<string>("");

  const changeAddress = (value: string) => {
    setAddress(value);
    setError("");
  };

  function showModal() {
    setModal(true);
  }

  function closeModal() {
    setModal(false);
  }

  const handleSubmit = async () => {
    if (!isAddress(address)) {
      setError("Please type valid address");
      return;
    }
    await create({
      address,
      profileId,
      network: "bsc",
    });
    setAddress("");
    closeModal();
  };

  const handleRemove = (id) => async () => {
    await remove(id);
  };

  const blackListList = usePagination(list);

  return (
    <>
      <div className="row">
        <div className="col-md-12 text-end">
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={showModal}
          >
            Add address
          </button>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table-striped table-hover table-bordered mt-3 table">
          <thead>
            <tr>
              <th scope="col">Address</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {!blackListList.list.length && <EmptyRow rows={2} />}
            {blackListList.list.map((element) => (
              <tr key={element.id}>
                <td>
                  <CopyIcon text={element.address} />
                  <a
                    href={`https://bscscan.com/address/${element.address}`}
                    target="_blank"
                    className="link-primary"
                  >
                    {element.address}
                  </a>
                </td>
                <td className="text-center">
                  <span onClick={handleRemove(element.id)}>
                    <DeleteIcon />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {blackListList.pagination}

      <div className={modal ? "modal fade show d-block" : "modal fade"}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Blacklist Address</h5>
              <button
                type="button"
                className="btn-close"
                onClick={closeModal}
              ></button>
            </div>
            <div className="modal-body">
              <div className="row mb-3">
                <label className="col-sm-2 col-form-label">Address</label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className={classNames(
                      "form-control",
                      error !== "" && "is-invalid"
                    )}
                    value={address}
                    onChange={(e) => changeAddress(e.target.value)}
                  />
                  {error && <div className="invalid-feedback">{error}</div>}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-success btn-sm"
                onClick={handleSubmit}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={modal ? "modal-backdrop fade show" : "d-none"}></div>
    </>
  );
};

export default Blacklist;
