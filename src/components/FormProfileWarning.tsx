import { Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

type Props = {
  handlerDeleteProfile: (id: number) => (e: any) => void;
  profileId: number;
};

export default function FormProfileWarning({
  handlerDeleteProfile,
  profileId,
}: Props) {
  return (
    <Text>
      You can not create profile if you have profile in WAITNIG status.{" "}
      <Link to={`/profile/${profileId}`} className="link-primary">
        Show
      </Link>
      {" / "}
      <Link
        to="/profiles"
        className="link-danger"
        onClick={handlerDeleteProfile(profileId)}
      >
        Delete
      </Link>
    </Text>
  );
}
