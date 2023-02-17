import { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import Context from "./contexts/user-context";
import { getToken } from "./http/user-api";
import AppRouter from "./components/app-router";
import NavBar from "./components/nav-bar";

const App = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getToken()
      .then((data) => {
        user.setUser(data);
        user.setIsAuth(true);
      })
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) {
    return <Spinner animation="grow" />;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
