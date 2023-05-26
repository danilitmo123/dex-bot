import ProfilesProvider from "providers/ProfilesProvider";
import StrategiesProvider from "providers/StrategiesProvider";
import React from "react";
import { useParams } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

export default function StrategiesWrapper({ children }: Props) {
  const params = useParams<{ id: string }>();
  return (
    <ProfilesProvider>
      <StrategiesProvider profileId={+params.id}>{children}</StrategiesProvider>
    </ProfilesProvider>
  );
}
