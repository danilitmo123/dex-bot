import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";
import PageLayout from "../../layout/Layout";
import useAuth from "../../hooks/useAuth";
import ConnectModal from "../ConnectModal";
import { truncateAddress } from "../../utils/wallet";
import { useWeb3React } from "@web3-react/core";
import {
  useDisclosure,
  Text,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import useCatchTxError from "hooks/useCatchTxError";
import { addProfileWithEstimateGas } from "utils/contractsHelper";
import { useToast } from "@chakra-ui/react";
import { default as ToastDescriptionWithTx } from "components/Toast/DescriptionWithTx";

import { useVaultsFactory } from "hooks/useContract";
import { IEditProps } from "dtos/IEditProps";
import useProfiles from "hooks/useProfiles";
import IProfile from "dtos/IProfile";
import ProfileForm from "./ProfileForm";
import Title from "../Title";

const AddProfile = () => {
  const [modalIsOpen, setmodalIsOpen] = useState<boolean>(false);
  const history = useHistory();
  const { addProfile, deleteProfile, profiles } = useProfiles();
  const [data, setdata] = useState<IEditProps>();
  const [formLoading, setformLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<IEditProps> = (data) => handleAddProfile(data);

  const { logout } = useAuth();
  const toastSuccess = useToast({ status: "success", position: "top" });
  const toastError = useToast({ status: "error", position: "top" });
  const toastWarning = useToast({ status: "warning", position: "top" });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const vaultsFactoryContract = useVaultsFactory(true);

  const { account, active } = useWeb3React();

  const { fetchWithCatchTxError, loading } = useCatchTxError();

  const handlerDeleteProfile = (id: number) => async (e) => {
    e.preventDefault();
    await deleteProfile(id);
  };

  const handleAddProfile = async (data: IEditProps) => {

    setformLoading(true);
    try {
      const response = await addProfile(data);

      if (response.error) {
        toastError({
          title: response.error,
          description: Array.isArray(response.message)
            ? response.message.join(", ")
            : typeof response.message === "string"
            ? response.message
            : "",
        });
      } else {
        toastWarning({
          description: "Please wait for transaction confirmation",
        });
        await fetchWithCatchTxError(() => {
          return addProfileWithEstimateGas(
            vaultsFactoryContract,
            response.hash,
            data.mainReceiverAddr,
            data.baseTokenAddr,
            data.__quoteTokenId,
            response.addresses.seller,
            response.addresses.buyer
          );
        }).then(async (receipt) => {
          if (receipt === null) {
            await deleteProfile(response.id);
          } else {
            setformLoading(false);
            if (receipt?.status) {
              toastSuccess({
                description: (
                  <ToastDescriptionWithTx txHash={receipt.transactionHash}>
                    'Your Vault contract have been deployed'
                  </ToastDescriptionWithTx>
                ),
              });
              // update profiles in store
            }
            history.push("/profiles");
          }
        });
      }
    } catch (e) {
      console.error(e);

      toastError({
        description: e,
      });
    }

    setformLoading(false);
  };

  const hasProfileInWaitingStatus = profiles.find(
    (profile: IProfile) => profile.status === "waiting"
  );

  const save = async () => {
    if (hasProfileInWaitingStatus && data) {
      // await deleteProfile(hasProfileInWaitingStatus.id);
      setmodalIsOpen(false);
      onSubmit(data);
    }
  };

  const _onSubmit = (data: IEditProps) => {
    if (hasProfileInWaitingStatus) {
      setmodalIsOpen(true);
      setdata(data);
      return;
    }
    onSubmit(data);
  };

  return (
    <PageLayout>
      <div className="text-center">
        <Title>Add Profile</Title>
        {(formLoading || loading) && (
          <div className="row justify-content-center mt-3">
            <div className="col-sm-4">
              <div className="alert alert-warning mb-0">
                {loading
                  ? "Please wait for transaction confirmation"
                  : "Loading..."}
              </div>
            </div>
          </div>
        )}

        {hasProfileInWaitingStatus && !loading && (
          <Text>
            You can not create profile if you have profile in WAITNIG status.{" "}
            <Link
              to={`/profile/${hasProfileInWaitingStatus.id}`}
              className="link-primary"
            >
              Show
            </Link>
            {" / "}
            <Link
              to="/profiles"
              className="link-danger"
              onClick={handlerDeleteProfile(hasProfileInWaitingStatus.id)}
            >
              Delete
            </Link>
          </Text>
        )}
        <div className="row mt-3 mb-3">
          <div className="col-md-8 text-end">
            {!active ? (
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                onClick={onOpen}
              >
                Connect Wallet
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-success btn-sm"
                onClick={logout}
              >
                {truncateAddress(account)}
              </button>
            )}
          </div>
        </div>
      </div>
      <ProfileForm onSubmit={_onSubmit} loading={loading || formLoading} />
      <ConnectModal isOpen={isOpen} closeModal={onClose} />
      <Modal
        isOpen={modalIsOpen}
        onClose={() => {
          setmodalIsOpen(false);
        }}
      >
        <ModalOverlay />
        <ModalContent w="600px">
          <ModalHeader>Important</ModalHeader>
          <ModalCloseButton
            _focus={{
              boxShadow: "none",
            }}
          />
          <ModalBody>
            You have profile in{" "}
            <span className="badge text-bg-warning">WAITNIG</span> status. After
            creating new profile - the previous in{" "}
            <span className="badge text-bg-warning">WAITNIG</span> status will
            be deleted.
          </ModalBody>
          <ModalFooter>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                style={{ marginRight: 8 }}
                onClick={() => {
                  save();
                }}
              >
                Save changes
              </button>
              <a
                className="btn btn-warning"
                style={{ marginRight: 8 }}
                target="_blank"
                href={`/app/profile/${hasProfileInWaitingStatus?.id}`}
              >
                Show profile
              </a>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={() => setmodalIsOpen(false)}
              >
                Close
              </button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </PageLayout>
  );
};

export default AddProfile;
