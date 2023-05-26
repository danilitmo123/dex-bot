import { useWeb3React } from "@web3-react/core";
import { IEditProps } from "dtos/IEditProps";
import useBackendAuth from "hooks/useBackendAuth";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { isAddress } from "utils/contractsHelper";
import InfoIcon from "../Icons/InfoIcon";
import { createRegister } from "./createRegister";

const defaultProfile = {
  sellersCount: 2,
  buyersCount: 2,
  gasLimit: 350_000,
  maxPriceImpact: 10,
  proxyMaxBaseBalance: 1000,
  proxyMaxQuoteBalance: 1000,
  minTriggeringAmount: 100,
  transaction_count_proxy: 1000,
  dex: "pancakeswap",
  __quoteTokenId: "3",
  __vaultMode: "Vault Contract",
};

interface ProfileFormProps {
  onSubmit: SubmitHandler<IEditProps>;
  readOnly?: string[];
  values?: {
    [key: string]: any;
  };
  loading?: boolean;
  disabled?: boolean;
}

const decodePriceImpact = (v: number) => v / 10;

const ProfileForm: React.FC<ProfileFormProps> = ({
  onSubmit,
  readOnly = [],
  values = {},
  loading,
  disabled,
}) => {
  const { userId } = useBackendAuth();
  const [show, setShow] = React.useState(false);
  const { account, active } = useWeb3React();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IEditProps>({
    defaultValues: {
      ...defaultProfile,
      ...values,
    },
  });

  const defaultValues = {
    ...defaultProfile,
    ...values,
  };

  useEffect(() => {
    Object.keys(defaultValues).forEach((key) => {
      const value =
        key !== "maxPriceImpact"
          ? defaultValues[key]
          : decodePriceImpact(defaultValues[key]);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setValue(key, value);
    });
  }, [JSON.stringify(defaultValues)]);

  useEffect(() => {
    setValue("withdrawerAddr", account);
  }, [account]);

  const _register = createRegister(register, readOnly, errors);

  const onError = () => {
    setShow(true);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <input
        type="hidden"
        name="userId"
        defaultValue={userId}
        {...register("userId", { required: true })}
      />
      <div className="row mb-3">
        <label className="col-sm-4 col-form-label text-end">
          Profile name:
        </label>
        <div className="col-sm-4">
          <input
            type="text"
            {..._register("name", {
              required: true,
            })}
          />
        </div>
      </div>
      <div className="row mb-3">
        <label className="col-sm-4 col-form-label text-end">Dex:</label>
        <div className="col-sm-4">
          <select {..._register("dex", { required: true }, "select")}>
            <option value="pancakeswap" selected>
              Pancake (BSC)
            </option>
          </select>
        </div>
      </div>
      <div className="row mb-3">
        <label className="col-sm-4 col-form-label text-end">
          Base Token Address:
        </label>
        <div className="col-sm-4">
          <input
            type="text"
            {..._register("baseTokenAddr", {
              required: true,
              validate: (value) => isAddress(value) !== false,
            })}
          />
          <div className="d-inline-block tooltipItem">
            <InfoIcon />
            <div className="tooltipArea" style={{ marginTop: -70 }}>
              Info: Base Asset Address. The asset which bot will Buy or Sell.
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <label className="col-sm-4 col-form-label text-end">
          Quote Token Symbol:
        </label>
        <div className="col-sm-4">
          <select
            {..._register("__quoteTokenId", {}, "select")}
            style={{ display: "inline-block" }}
          >
            <option value="0">WBNB</option>
            <option value="1">DAI</option>
            <option value="2">USDC</option>
            <option value="3">USDT</option>
            <option value="4">BUSD</option>
          </select>
          <div className="d-inline-block tooltipItem">
            <InfoIcon />
            <div className="tooltipArea" style={{ marginTop: -90 }}>
              Info: Quote Asset. The asset will be used to quote the Base asset.
              Supported: WBNB, DAI, USDC, USDT, BUSD.
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <label className="col-sm-4 col-form-label text-end">
          Main Receiver Address:
        </label>
        <div className="col-sm-4">
          <input
            type="text"
            {..._register("mainReceiverAddr", {
              required: true,
              validate: (value) => isAddress(value) !== false,
            })}
          />
          <div className="d-inline-block tooltipItem">
            <InfoIcon />
            <div className="tooltipArea" style={{ marginTop: -130 }}>
              Info: Main Receiver Address is final destination for output asset.
              After Proxy-Receiver Max Balance reached assets will automatically
              be transferred to Main Receiver Address
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <label className="col-sm-4 col-form-label text-end">Vault Mode:</label>
        <div className="col-sm-4">
          <select
            disabled={readOnly.includes("__vaultMode")}
            {..._register(
              "__vaultMode",
              {
                required: true,
              },
              "select"
            )}
            style={{ display: "inline-block" }}
          >
            <option value="Vault Contract" selected>
              Vault Contract
            </option>
          </select>
          <div className="d-inline-block tooltipItem">
            <InfoIcon />
            <div className="tooltipArea" style={{ marginTop: -180 }}>
              Info: In this mode - main vault smart contract will be deployed.
              It should be filled with required trading amounts (Base asset for
              Sell operations, Quote asset for Buy operation). Note, that only
              Withdrawer will be able to withdraw funds from this smart
              contract, bot will only have access to trade on specific pair.
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <label className="col-sm-4 col-form-label text-end">Withdrawer:</label>
        <div className="col-sm-4">
          <input
            type="text"
            {..._register("withdrawerAddr", {
              required: true,
            })}
            readOnly
          />
          <div className="d-inline-block tooltipItem">
            <InfoIcon />
            <div className="tooltipArea" style={{ marginTop: -130 }}>
              Info: The only address which will be able to withdraw funds form
              deployed vaults (Main Vault and Proxy-Receivers). Note: Make sure
              you insert the address which you have access to!
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-sm-4 text-end">
          <button
            className="btn btn-outline-secondary btn-withdrawal dropdown-toggle mb-3 mt-3"
            type="button"
            onClick={() => setShow(!show)}
          >
            Advanced Settings
          </button>
        </div>
      </div>

      <div className={show ? "collapse show" : "collapse"}>
        <div className="row mb-3">
          <label className="col-sm-4 col-form-label text-end">
            Sellers Count:
          </label>
          <div className="col-sm-4">
            <input
              type="text"
              {..._register("sellersCount", {
                required: true,
                max: 30,
              })}
            />
            <div className="d-inline-block tooltipItem">
              <InfoIcon />
              <div className="tooltipArea" style={{ marginTop: -130 }}>
                Info: Count of wallets which will trigger and execute sell
                operations on Vault contract. Note: In order them to work - they
                should be filled with blockchain native currency for gas
                purpose.
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-4 col-form-label text-end">
            Buyers Count:
          </label>
          <div className="col-sm-4">
            <input
              type="text"
              {..._register("buyersCount", {
                required: true,
                max: 30,
              })}
            />
            <div className="d-inline-block tooltipItem">
              <InfoIcon />
              <div className="tooltipArea" style={{ marginTop: -90 }}>
                Info: Count of wallets which will trigger and execute sell
                operations on Vault contract.
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-4 col-form-label text-end">Gas Limit:</label>
          <div className="col-sm-4">
            <input
              type="text"
              {..._register("gasLimit", {
                required: true,
                max: 400_000,
                min: 300_000,
              })}
            />
            <div className="d-inline-block tooltipItem">
              <InfoIcon />
              <div className="tooltipArea" style={{ marginTop: -50 }}>
                Info: Profile transactions gas limit
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-4 col-form-label text-end">
            Max Price Impact Per Transaction %:
          </label>
          <div className="col-sm-4">
            <input
              type="text"
              {..._register("maxPriceImpact", {
                required: true,
                max: 100,
              })}
            />
            <div className="d-inline-block tooltipItem">
              <InfoIcon />
              <div className="tooltipArea" style={{ marginTop: -180 }}>
                Info: Max allowed price impact per bot transaction. Use-case
                example: Bot discovers in mempool a huge Buy transaction and
                performs Sell into it. If target Buy transaction will fail for
                any reason - there is a risk to impact the price by bot counter
                trade. This parameter should be used to reduce that risk
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-4 col-form-label text-end">
            Proxy-Receiver Max BaseToken Balance:
          </label>
          <div className="col-sm-4">
            <input
              type="text"
              {..._register("proxyMaxBaseBalance", {
                required: true,
              })}
            />
            <div className="d-inline-block tooltipItem">
              <InfoIcon />
              <div className="tooltipArea" style={{ marginTop: -110 }}>
                Info: Max Balance in BaseToken which will be allowed to keep on
                single Proxy-Receiver before sending currency to Main Receiver
                Address.
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-4 col-form-label text-end">
            Proxy-Receiver Max QuoteToken Balance:
          </label>
          <div className="col-sm-4">
            <input
              type="text"
              {..._register("proxyMaxQuoteBalance", {
                required: true,
              })}
            />
            <div className="d-inline-block tooltipItem">
              <InfoIcon />
              <div className="tooltipArea" style={{ marginTop: -110 }}>
                Info: Max Balance in QuoteToken which will be allowed to keep on
                single Proxy-Receiver before sending currency to Main Receiver
                Address.
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-4 col-form-label text-end">
            Min Amount For Triggering $:
          </label>
          <div className="col-sm-4">
            <input
              type="text"
              {..._register("minTriggeringAmount", {
                required: true,
              })}
            />
            <div className="d-inline-block tooltipItem">
              <InfoIcon />
              <div className="tooltipArea" style={{ marginTop: -70 }}>
                Info: Min amount of mempool transaction trade which will trigger
                trading bot.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-12 text-center">
          <button
            type="submit"
            className="btn btn-outline-secondary"
            style={{ marginRight: 10 }}
            disabled={!active || loading || disabled}
          >
            Save profile
          </button>
          <Link to="/profiles" className="btn btn-outline-secondary">
            Cancel
          </Link>
        </div>
      </div>
    </form>
  );
};

export default ProfileForm;
