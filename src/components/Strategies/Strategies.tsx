import React, { FC } from "react";
import { Link } from "react-router-dom";
import edit from "../../assets/icons/edit.svg";
import useStrategies from "../../hooks/useStrategies";
import classNames from "classnames";
import EmptyRow from "../Form/EmptyRow";
import FlexCell from "../Form/FlexCell";
import Tooltip from "../Tooltip";
import { usePagination } from "../../hooks/usePagination";

interface StrategiesProps {
  strategies: {
    id: number;
    type_operations: string;
    user_operation: string;
    bot_operation: string;
    min_base_price: number;
    max_base_price: number;
    fill_percent: number;
    min_remaining: number;
  }[];
  profileId: number;
}

const Strategies: FC<StrategiesProps> = ({ profileId }) => {
  const { list } = useStrategies();

  const strategiesList = usePagination(list);

  return (
    <>
      <div className="row">
        <div className="col-md-12 text-end">
          <Link
            to={`/profile/${profileId}/add-strategy`}
            className="btn btn-outline-secondary btn-sm"
          >
            Add strategy
          </Link>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table-striped table-hover table-bordered mt-3 table">
          <thead>
            <tr>
              <th scope="col">
                <FlexCell>
                  Trigger Type
                  <Tooltip>
                    Info: After bot discovers Mempool Trade Trigger Type in
                    mempool and the price is in specific range - it will create
                    counter trade with amount equal to % of discovered trade.
                  </Tooltip>
                </FlexCell>
              </th>
              <th scope="col">Min Base Asset Price</th>
              <th scope="col">Max Base Asset Price</th>
              <th scope="col">Fill Percent</th>
              <th scope="col">Min Remaining Base / Quote</th>
              {strategiesList.list.length > 0 && <th scope="col"></th>}
            </tr>
          </thead>
          <tbody>
            {strategiesList.list.length === 0 && <EmptyRow rows={5} />}
            {strategiesList.list.map((item) => (
              <tr key={item.id}>
                <td>
                  <span
                    className={classNames(
                      "badge",
                      item.type === "sell"
                        ? "text-bg-danger"
                        : "text-bg-success"
                    )}
                  >
                    {item.type}
                  </span>
                </td>
                <td>{item.minBaseAssetPrice}</td>
                <td>{item.maxBaseAssetPrice}</td>
                <td>{item.fill}%</td>
                <td>{item.minBalance}</td>
                <td>
                  <Link to={`/profile/${profileId}/edit-strategy/${item.id}`}>
                    <img
                      style={{ width: "20px", cursor: "pointer" }}
                      src={edit}
                    />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {strategiesList.pagination}
    </>
  );
};

export default Strategies;
