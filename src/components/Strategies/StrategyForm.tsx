import React from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import PageLayout from "../../layout/Layout";
import info from "../../assets/icons/info.svg";
import Title from "../Title";
import { IStrategy } from "dtos/IStrategy";
import { useToast } from "@chakra-ui/react";

export type StrategiesProps = Omit<IStrategy, "id">;

interface StrategyFormProps {
  title: string;
  onSubmit: (data: StrategiesProps) => any;
  defaultValues: {
    type?: string;
    minBaseAssetPrice?: number;
    maxBaseAssetPrice?: number;
    fill?: number;
    minBalance?: number;
  };
}

const StrategyForm: React.FC<StrategyFormProps> = ({
  title,
  onSubmit,
  defaultValues,
}) => {
  const { register, watch, handleSubmit } = useForm<StrategiesProps>();
  const history = useHistory();
  const params = useParams<{ id: string }>();
  const toastSuccess = useToast({ status: "success", position: "top" });
  const toastError = useToast({ status: "error", position: "top" });

  const _onSubmit: SubmitHandler<StrategiesProps> = async (data) => {
    const result = onSubmit(data);

    if (!result || result?.error) {
      toastError({
        description: Array.isArray(result?.message)
          ? result?.message.join(", ")
          : result?.message || "Please ty again latter",
      });
    } else {
      toastSuccess({ description: "Strategy created" });
      history.push(`/profile/${params.id}`);
    }
  };

  return (
    <PageLayout>
      <div className="row mb-3 text-center">
        <Title>{title}</Title>
      </div>
      <form onSubmit={handleSubmit(_onSubmit)}>
        <div className="row mb-3">
          <label className="col-sm-4 col-form-label text-end">
            Mempool Trade Trigger Type:
          </label>
          <div className="col-sm-4">
            <select
              className="form-select"
              defaultValue={defaultValues.type}
              {...register("type", { required: true })}
              style={{ display: "inline-block" }}
            >
              <option value="buy">buy</option>
              <option value="sell">sell</option>
            </select>
            <div className="d-inline-block tooltipItem">
              <img
                src={info}
                style={{ width: "24px", cursor: "pointer", marginLeft: 10 }}
              />
              <div className="tooltipArea" style={{ marginTop: -110 }}>
                Info: This mempol trade operation will trigger bot to execute
                the strategy. Example: Bot will start Sell counter strategy
                after discover Buy trade.
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-4 col-form-label text-end">
            Min Base Asset Price $:
          </label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              defaultValue={defaultValues.minBaseAssetPrice}
              {...register("minBaseAssetPrice", { required: true })}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-4 col-form-label text-end">
            Max Base Asset Price $:
          </label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              defaultValue={defaultValues.maxBaseAssetPrice}
              {...register("maxBaseAssetPrice", { required: true })}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-4 col-form-label text-end">
            Counter Trade Fill %:
          </label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              defaultValue={defaultValues.fill}
              {...register("fill", { required: true })}
            />
            <div className="d-inline-block tooltipItem">
              <img
                src={info}
                style={{ width: "24px", cursor: "pointer", marginLeft: 10 }}
              />
              <div className="tooltipArea" style={{ marginTop: -130 }}>
                Info: After bot discovers Mempool Trade Trigger Type in mempool
                and the price is in specific range - it will create counter
                trade with amount equal to % of discovered trade.
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-4 col-form-label text-end">
            Min Remaning Quote:
          </label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              defaultValue={defaultValues.minBalance}
              {...register("minBalance", { required: true })}
            />
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-sm-4 offset-sm-4">
            <div className="alert alert-secondary" role="alert">
              When a user performs a{" "}
              <b>{watch("type") ? watch("type") : defaultValues.type}</b>{" "}
              operation, and the trade price is between{" "}
              <b>
                {watch("minBaseAssetPrice")
                  ? watch("minBaseAssetPrice")
                  : defaultValues.minBaseAssetPrice}
              </b>{" "}
              and{" "}
              <b>
                {watch("maxBaseAssetPrice")
                  ? watch("maxBaseAssetPrice")
                  : defaultValues.maxBaseAssetPrice}
              </b>{" "}
              we create opposite trade and fill{" "}
              <b>{watch("fill") ? watch("fill") : defaultValues.fill}</b>{" "}
              percent from the original amount.
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-12 text-center">
            <button
              type="submit"
              className="btn btn-success"
              style={{ marginRight: 10 }}
            >
              Save
            </button>
            <Link to={`/profile/${params.id}`} className="btn btn-secondary">
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </PageLayout>
  );
};

export default StrategyForm;
