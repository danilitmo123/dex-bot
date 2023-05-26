import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";
import PageLayout from "../../layout/Layout";
import { useToast } from "@chakra-ui/react";
import { IEditProps } from "dtos/IEditProps";
import useProfiles from "hooks/useProfiles";
import IProfile from "dtos/IProfile";
import ProfileForm from "./ProfileForm";
import FromTitle from "../FromTitle";
import useSWR, { SWRResponse } from "swr";
import { apiUrl, get } from "utils/fetcher";
import { quoteTokenAddressesMapIds } from "../../providers/ProfilesProvider";

const EditProfile = () => {
  const params = useParams<{ id?: string }>();
  const history = useHistory();

  const profileData: SWRResponse<IProfile> = useSWR(
    params?.id ? apiUrl(`/profile/${params.id}`) : null,
    get
  );

  const { updateProfile } = useProfiles();

  const onSubmit: SubmitHandler<IEditProps> = (data) => handleAddProfile(data);

  const toastSuccess = useToast({ status: "success", position: "top" });
  const toastError = useToast({ status: "error", position: "top" });

  const handleAddProfile = async (data: IEditProps) => {
    try {
      const response = await updateProfile(data);

      if (response.error) {
        toastError({
          title: response.error,
          description: Array.isArray(response.message)
            ? response.message.join(", ")
            : typeof response.message === "string"
            ? response.message
            : "",
        });
        return;
      } else {
        await profileData.mutate();
        toastSuccess({ description: "Updated" });
        history.push("/profiles");
      }
    } catch (e) {
      toastError({
        description: e,
      });
    }
  };

  const profile = profileData.data;
  if (profile) {
    profile.__quoteTokenId =
      quoteTokenAddressesMapIds[profile.quoteTokenAddr.toLowerCase()] || "";
  }

  return (
    <PageLayout>
      <div className="text-center">
        <FromTitle>Edit Profile</FromTitle>
      </div>
      <ProfileForm
        onSubmit={onSubmit}
        readOnly={[
          "baseTokenAddr",
          "__vaultMode",
          "mainReceiverAddr",
          "__quoteTokenId",
          "dex",
          "buyersCount",
          "sellersCount",
          "proxyMaxBaseBalance",
          "proxyMaxQuoteBalance",
        ]}
        values={profile}
      />
    </PageLayout>
  );
};

export default EditProfile;
