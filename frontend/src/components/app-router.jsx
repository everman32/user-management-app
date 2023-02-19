import { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { authRoutes, publicRoutes } from "../routes";
import { MANAGEMENT_ROUTE, SINGIN_ROUTE } from "../utils/consts";
import Context from "../contexts/user-context";

const AppRouter = observer(() => {
  const { userStore } = useContext(Context);

  return (
    <Switch>
      {userStore.getIsAuth() &&
        authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} component={Component} exact />
        ))}
      {!userStore.getIsAuth() &&
        publicRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} component={Component} exact />
        ))}
      <Redirect to={userStore.getIsAuth() ? MANAGEMENT_ROUTE : SINGIN_ROUTE} />
    </Switch>
  );
});

export default AppRouter;
