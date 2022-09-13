import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { authRoutes, publicRoutes } from "../routes";
import { MANAGEMENT_ROUTE, SINGIN_ROUTE } from "../utils/consts";
import Context from "../index";

const AppRouter = observer(() => {
  const { user } = useContext(Context);

  return (
    <Switch>
      {user.isAuth &&
        authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} component={Component} exact />
        ))}
      {!user.isAuth &&
        publicRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} component={Component} exact />
        ))}
      <Redirect to={user.isAuth ? MANAGEMENT_ROUTE : SINGIN_ROUTE} />
    </Switch>
  );
});

export default AppRouter;
