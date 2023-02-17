import { useContext, useState } from "react";
import { Container, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { NavLink, useHistory } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { MANAGEMENT_ROUTE, SINGUP_ROUTE } from "../utils/consts";
import { singIn } from "../http/user-api";
import Context from "../contexts/user-context";

const singin = observer(() => {
  const { user } = useContext(Context);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const singInButtonClick = async () => {
    try {
      const data = await singIn(email, password);
      user.setUser(data);
      user.setIsAuth(true);
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
        <h2 className="m-auto">Sing in</h2>
        <Form className="d-flex flex-column">
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
            Don&rsquo;t have an account?{" "}
            <NavLink to={SINGUP_ROUTE}>Sing up!</NavLink>
            <Button variant="outline-success" onClick={singInButtonClick}>
              Sing in
            </Button>
          </Row>
        </Form>
      </Card>
    </Container>
  );
});

export default singin;
