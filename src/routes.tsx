import React, { FC } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AddProfile from "./components/Profiles/AddProfile";
import Profiles from "./components/Profiles/Profiles";
import ProfileInfo from "./components/Profiles/ProfileInfo";
import StrategyEdit from "./components/Strategies/StrategyEdit";
import StrategyAdd from "./components/Strategies/StrategyAdd";
import useBackendAuth from "hooks/useBackendAuth";
import LoginPage from "components/LoginPage";
import ProfilesProvider from "providers/ProfilesProvider";
import EditProfile from "components/Profiles/EditProfile";
import StrategiesWrapper from "components/Profiles/Tabs/StrategiesWrapper";
import CurrentProfileProvider from "./providers/CurrentProfileProvider";
import baseName from "./utils/base";

const AppRoutes: FC = () => {
  const { initialized, authorized } = useBackendAuth();

  return (
    <>
      {initialized ? (
        authorized ? (
          <BrowserRouter basename={baseName}>
            <Switch>
              <Route path="/" exact>
                <ProfilesProvider>
                  <Profiles />
                </ProfilesProvider>
              </Route>
              <Route path="/profiles">
                <ProfilesProvider>
                  <Profiles />
                </ProfilesProvider>
              </Route>
              <Route exact path="/profile/:id/">
                <ProfilesProvider>
                  <CurrentProfileProvider>
                    <ProfileInfo />
                  </CurrentProfileProvider>
                </ProfilesProvider>
              </Route>

              <Route exact path="/profile/:id/add-strategy">
                <StrategiesWrapper>
                  <StrategyAdd />
                </StrategiesWrapper>
              </Route>
              <Route path="/profile/:id/edit-strategy/:strategy">
                <StrategiesWrapper>
                  <StrategyEdit />
                </StrategiesWrapper>
              </Route>

              <Route exact path="/profile/:id/:tab">
                <ProfilesProvider>
                  <CurrentProfileProvider>
                    <ProfileInfo />
                  </CurrentProfileProvider>
                </ProfilesProvider>
              </Route>

              <Route path="/edit-profile/:id">
                <ProfilesProvider>
                  <EditProfile />
                </ProfilesProvider>
              </Route>
              {/* <Route path="/edit-profile-old/:id">
                <ProfileEdit />
              </Route> */}
              <Route path="/add-profile">
                <ProfilesProvider>
                  <AddProfile />
                </ProfilesProvider>
              </Route>
              <Route path="/edit-stratygy/:id">
                <StrategyEdit />
              </Route>
              <Route path="/add-strategy">
                <StrategyAdd />
              </Route>
            </Switch>
          </BrowserRouter>
        ) : (
          <LoginPage />
        )
      ) : null}
    </>
  );
};

export default AppRoutes;
