import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import PageLayout from "../layout/Layout";
import profilesCfg from "../config/constants/profiles";
import info from "../assets/icons/info.svg";
import { Text } from "@chakra-ui/react";

interface EditProps {
  id: number;
  name: string;
  status: string;
  dex: string;
  main_receiver_address: string;
  vault_mode: string;
  vault_address: string;
  withdrawer: string;
  base_token_symbol: string;
  base_token: string;
  quote_token_symbol: string;
  quote_token: string;
  native_token_symbol: string;
  native_token_address: string;
  sellers_count: number;
  buyers_count: number;
  receivers_count: number;
  fee_percent: number;
  gas_limit: number;
  max_price_tx: number;
  max_base_balance_send: number;
  max_quote_balance_send: number;
  min_amount_triggering: number;
  transaction_count_proxy: number;
  created: string;
}

const ProfileEdit = () => {
  const pathParams = useParams<{ id?: string }>();
  const [show, setShow] = React.useState(false);
  const profileId = useMemo(
    () => (pathParams.id ? parseInt(pathParams.id, 10) : undefined),
    []
  );
  const currentProfile = useMemo(
    () => profilesCfg.filter((item) => item.id === profileId)[0],
    []
  );

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProps>();
  const onSubmit: SubmitHandler<EditProps> = (data) => console.log(data);

  // console.log(currentProfile)

  return (
    <PageLayout>
      {currentProfile ? (
        <>
          <div className="text-center">
            <Text
              margin="0"
              lineHeight="1.15"
              fontSize={["1.0em", "1.5em", "2em", "3em"]}
              fontWeight="600"
            >
              Edit Profile {currentProfile.name}
            </Text>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row mb-3 mt-5">
              <label className="col-sm-4 col-form-label text-end">
                Profile name:
              </label>
              <div className="col-sm-4">
                <input
                  type="text"
                  className="form-control"
                  defaultValue={currentProfile.name}
                  {...register("name", { required: true })}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label text-end">Dex:</label>
              <div className="col-sm-4">
                <select
                  className="form-select"
                  defaultValue={currentProfile.dex}
                  {...register("dex", { required: true })}
                >
                  <option value={currentProfile.dex} selected>
                    {currentProfile.dex}
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
                  className="form-control"
                  readOnly
                  defaultValue={currentProfile.base_token}
                  {...register("base_token")}
                />
                <div className="d-inline-block tooltipItem">
                  <img
                    src={info}
                    style={{ width: "24px", cursor: "pointer", marginLeft: 10 }}
                  />
                  <div className="tooltipArea" style={{ marginTop: -70 }}>
                    Info: Base Asset Address. The asset which bot will Buy or
                    Sell.
                  </div>
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label text-end">
                Quote Token Address:
              </label>
              <div className="col-sm-4">
                <input
                  type="text"
                  className="form-control"
                  readOnly
                  defaultValue={currentProfile.quote_token}
                  {...register("quote_token")}
                />
                <div className="d-inline-block tooltipItem">
                  <img
                    src={info}
                    style={{ width: "24px", cursor: "pointer", marginLeft: 10 }}
                  />
                  <div className="tooltipArea" style={{ marginTop: -90 }}>
                    Info: Quote Asset Address. The asset which will be used to
                    quote Base asset. Example: WBNB, WETH, USDT, USDC etc.
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
                  className="form-control"
                  readOnly
                  defaultValue={currentProfile.main_receiver_address}
                  {...register("main_receiver_address")}
                />
                <div className="d-inline-block tooltipItem">
                  <img
                    src={info}
                    style={{ width: "24px", cursor: "pointer", marginLeft: 10 }}
                  />
                  <div className="tooltipArea" style={{ marginTop: -130 }}>
                    Info: Main Receiver Address is final destination for output
                    asset. After Proxy-Receiver Max Balance reached assets will
                    automatically be transferred to Main Receiver Address
                  </div>
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label text-end">
                Vault Mode:
              </label>
              <div className="col-sm-4">
                <input
                  type="text"
                  className="form-control"
                  readOnly
                  defaultValue={currentProfile.vault_mode}
                  {...register("vault_mode")}
                />
                <div className="d-inline-block tooltipItem">
                  <img
                    src={info}
                    style={{ width: "24px", cursor: "pointer", marginLeft: 10 }}
                  />
                  <div className="tooltipArea" style={{ marginTop: -180 }}>
                    Info: In this mode - main vault smart contract will be
                    deployed. It should be filled with required trading amounts
                    (Base asset for Sell operations, Quote asset for Buy
                    operation). Note, that only Withdrawer will be able to
                    withdraw funds from this smart contract, bot will only have
                    access to trade on specific pair.
                  </div>
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label text-end">
                Withdrawer:
              </label>
              <div className="col-sm-4">
                <input
                  type="text"
                  className="form-control"
                  readOnly
                  defaultValue={currentProfile.withdrawer}
                  {...register("withdrawer")}
                />
                <div className="d-inline-block tooltipItem">
                  <img
                    src={info}
                    style={{ width: "24px", cursor: "pointer", marginLeft: 10 }}
                  />
                  <div className="tooltipArea" style={{ marginTop: -130 }}>
                    Info: The only address which will be able to withdraw funds
                    form deployed vaults (Main Vault and Proxy-Receivers). Note:
                    Make sure you insert the address which you have access to!
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
                    className="form-control"
                    defaultValue={currentProfile.sellers_count}
                    {...register("sellers_count", { required: true, max: 30 })}
                  />
                  <div className="d-inline-block tooltipItem">
                    <img
                      src={info}
                      style={{
                        width: "24px",
                        cursor: "pointer",
                        marginLeft: 10,
                      }}
                    />
                    <div className="tooltipArea" style={{ marginTop: -130 }}>
                      Info: Count of wallets which will trigger and execute sell
                      operations on Vault contract. Note: In order them to work
                      - they should be filled with blockchain native currency
                      for gas purpose.
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
                    className="form-control"
                    defaultValue={currentProfile.buyers_count}
                    {...register("buyers_count", { required: true, max: 30 })}
                  />
                  <div className="d-inline-block tooltipItem">
                    <img
                      src={info}
                      style={{
                        width: "24px",
                        cursor: "pointer",
                        marginLeft: 10,
                      }}
                    />
                    <div className="tooltipArea" style={{ marginTop: -90 }}>
                      Info: Count of wallets which will trigger and execute sell
                      operations on Vault contract.
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-4 col-form-label text-end">
                  Proxy-Receivers Count:
                </label>
                <div className="col-sm-4">
                  <input
                    type="text"
                    className="form-control"
                    readOnly
                    defaultValue={currentProfile.receivers_count}
                    {...register("receivers_count")}
                  />
                  <div className="d-inline-block tooltipItem">
                    <img
                      src={info}
                      style={{
                        width: "24px",
                        cursor: "pointer",
                        marginLeft: 10,
                      }}
                    />
                    <div className="tooltipArea" style={{ marginTop: -130 }}>
                      Info: Proxy-Receivers are smart contracts which will be
                      keep output asset before it’s sent to Main Receiver
                      (Customer Wallet). They will be displayed as Makers on
                      Dextools and other explorers.
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-4 col-form-label text-end">
                  Token Transfer Fee %:
                </label>
                <div className="col-sm-4">
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={currentProfile.fee_percent}
                    {...register("fee_percent", { required: true })}
                  />
                  <div className="d-inline-block tooltipItem">
                    <img
                      src={info}
                      style={{
                        width: "24px",
                        cursor: "pointer",
                        marginLeft: 10,
                      }}
                    />
                    <div className="tooltipArea" style={{ marginTop: -70 }}>
                      Info: If Base asset token contract has fee on transfer -
                      it should be specified here.
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mb-3">
                <label className="col-sm-4 col-form-label text-end">
                  Gas Limit:
                </label>
                <div className="col-sm-4">
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={currentProfile.gas_limit}
                    {...register("gas_limit", { required: true, max: 40000 })}
                  />
                  <div className="d-inline-block tooltipItem">
                    <img
                      src={info}
                      style={{
                        width: "24px",
                        cursor: "pointer",
                        marginLeft: 10,
                      }}
                    />
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
                    className="form-control"
                    defaultValue={currentProfile.max_price_tx}
                    {...register("max_price_tx", { required: true })}
                  />
                  <div className="d-inline-block tooltipItem">
                    <img
                      src={info}
                      style={{
                        width: "24px",
                        cursor: "pointer",
                        marginLeft: 10,
                      }}
                    />
                    <div className="tooltipArea" style={{ marginTop: -180 }}>
                      Info: Max allowed price impact per bot transaction.
                      Use-case example: Bot discovers in mempool a huge Buy
                      transaction and performs Sell into it. If target Buy
                      transaction will fail for any reason - there is a risk to
                      impact the price by bot counter trade. This parameter
                      should be used to reduce that risk
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-4 col-form-label text-end">
                  Proxy-Receiver Max BaseToken Balance :
                </label>
                <div className="col-sm-4">
                  <input
                    type="text"
                    className="form-control"
                    readOnly
                    defaultValue={currentProfile.max_base_balance_send}
                    {...register("max_base_balance_send")}
                  />
                  <div className="d-inline-block tooltipItem">
                    <img
                      src={info}
                      style={{
                        width: "24px",
                        cursor: "pointer",
                        marginLeft: 10,
                      }}
                    />
                    <div className="tooltipArea" style={{ marginTop: -110 }}>
                      Info: Max Balance in BaseToken which will be allowed to
                      keep on single Proxy-Receiver before sending currency to
                      Main Receiver Address.
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-4 col-form-label text-end">
                  Proxy-Receiver Max QuoteToken Balance :
                </label>
                <div className="col-sm-4">
                  <input
                    type="text"
                    className="form-control"
                    readOnly
                    defaultValue={currentProfile.max_quote_balance_send}
                    {...register("max_quote_balance_send")}
                  />
                  <div className="d-inline-block tooltipItem">
                    <img
                      src={info}
                      style={{
                        width: "24px",
                        cursor: "pointer",
                        marginLeft: 10,
                      }}
                    />
                    <div className="tooltipArea" style={{ marginTop: -110 }}>
                      Info: Max Balance in QuoteToken which will be allowed to
                      keep on single Proxy-Receiver before sending currency to
                      Main Receiver Address.
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
                    className="form-control"
                    defaultValue={currentProfile.min_amount_triggering}
                    {...register("min_amount_triggering")}
                  />
                  <div className="d-inline-block tooltipItem">
                    <img
                      src={info}
                      style={{
                        width: "24px",
                        cursor: "pointer",
                        marginLeft: 10,
                      }}
                    />
                    <div className="tooltipArea" style={{ marginTop: -70 }}>
                      Info: Min amount of mempool transaction trade which will
                      trigger trading bot.
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-4 col-form-label text-end">
                  Transaction Count Per Proxy-Receiver:
                </label>
                <div className="col-sm-4">
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={currentProfile.transaction_count_proxy}
                    {...register("transaction_count_proxy")}
                  />
                  <div className="d-inline-block tooltipItem">
                    <img
                      src={info}
                      style={{
                        width: "24px",
                        cursor: "pointer",
                        marginLeft: 10,
                      }}
                    />
                    <div className="tooltipArea" style={{ marginTop: -110 }}>
                      Info: Threshold transaction count value for
                      proxy-receivers lifetime. After it will be reached -
                      proxy-receiver contract will be automatically redeployed.
                    </div>
                  </div>
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
                  Save profile
                </button>
                <Link to="/profiles" className="btn btn-secondary">
                  Cancel
                </Link>
              </div>
            </div>
          </form>
        </>
      ) : (
        <h2>Profile not found!</h2>
      )}
    </PageLayout>
  );
};

export default ProfileEdit;
