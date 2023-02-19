import { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useHistory, NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import { MANAGEMENT_ROUTE, SINGIN_ROUTE } from "../utils/consts";
import Context from "../contexts/user-context";

const NavBar = observer(() => {
  const { userStore } = useContext(Context);
  const history = useHistory();

  const logOut = () => {
    userStore.setCurrentUser({});
    userStore.setIsAuth(false);
    localStorage.removeItem("token");
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <NavLink
          style={{ color: "white" }}
          to={userStore.getIsAuth() ? MANAGEMENT_ROUTE : SINGIN_ROUTE}
        >
          User management
        </NavLink>
        {userStore.getIsAuth() ? (
          <Nav className="ml-auto" style={{ color: "white" }}>
            <Button
              variant="outline-light"
              onClick={() => logOut()}
              className="ml-2"
            >
              Sing out
            </Button>
          </Nav>
        ) : (
          <Nav className="ml-auto" style={{ color: "white" }}>
            <Button
              variant="outline-light"
              onClick={() => history.push(SINGIN_ROUTE)}
            >
              Sing in
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});

export default NavBar;
