import { useContext, useState } from "react";
import { Container, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { NavLink, useHistory } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { MANAGEMENT_ROUTE, SINGIN_ROUTE } from "../utils/consts";
import { singUp } from "../http/user-api";
import Context from "../contexts/user-context";

const singup = observer(() => {
  const { userStore } = useContext(Context);
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const singUpButtonClick = async () => {
    try {
      const data = await singUp(name, email, password);
      userStore.setCurrentUser(data);
      userStore.setIsAuth(true);
      history.push(MANAGEMENT_ROUTE);
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">Sing up</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            className="mt-3"
            placeholder="Enter your name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Control
            className="mt-3"
            placeholder="Enter your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control
            className="mt-3"
            placeholder="Enter your password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
            Have an account? <NavLink to={SINGIN_ROUTE}>Sing in!</NavLink>
            <Button variant="outline-success" onClick={singUpButtonClick}>
              Sing up
            </Button>
          </Row>
        </Form>
      </Card>
    </Container>
  );
});

export default singup;
