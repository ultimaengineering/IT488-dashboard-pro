import React from "react";
import {Redirect} from 'react-router-dom';
import classnames from "classnames";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col
} from "reactstrap";
import axios from "axios";

const Login = () => {
  const [state, setState] = React.useState({
    username: "",
    password: "",
    toDashboard: false
  });
  React.useEffect(() => {
    document.body.classList.toggle("login-page");
    return function cleanup() {
      document.body.classList.toggle("login-page");
    };
  });

  function submit(username, password) {
    axios.post("https://it488-inventory.ultimaengineering.io/Users/authenticate", {
      username: username, password: password
    }).then((x) => {
      if(x.status === 200) { // login worked!
        console.log("Login worked, storing token and redirect...")
        localStorage.setItem("token", JSON.stringify(x.data['token']))
        setState({ state, toDashboard: true })
      }
      if (x.status !== 200) {
        console.log("Should maybe do an error message here");
      }
    });
  }

  if (!state.toDashboard) {
    return (
        <>
          <div className="content">
            <Container>
              <Col className="ml-auto mr-auto" lg="4" md="6">
                <Form className="form">
                  <Card className="card-login card-white">
                    <CardHeader>
                      <img alt="..." src={require("assets/img/card-primary.png")}/>
                      <CardTitle tag="h1">Log in</CardTitle>
                    </CardHeader>
                    <CardBody>
                      <InputGroup
                          className={classnames({
                            "input-group-focus": state.emailFocus
                          })}
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-email-85"/>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                            placeholder="Username"
                            type="text"
                            onFocus={(e) => setState({...state, emailFocus: true})}
                            onBlur={(e) => setState({...state, emailFocus: false})}
                            onChange={(e) => {
                              setState({...state, username: e.target.value})
                            }}
                        />
                      </InputGroup>
                      <InputGroup
                          className={classnames({
                            "input-group-focus": state.passFocus
                          })}
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="tim-icons icon-lock-circle"/>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                            placeholder="Password"
                            type="Password"

                            onFocus={(e) => setState({...state, passFocus: true})}
                            onBlur={(e) => setState({...state, passFocus: false})}
                            onChange={(e) => {
                              setState({...state, password: e.target.value})
                            }}
                        />
                      </InputGroup>
                    </CardBody>
                    <CardFooter>
                      <Button
                          block
                          className="mb-3"
                          color="primary"
                          href="#pablo"
                          onClick={() => {
                            console.log("state: " + state)
                            submit(state.username, state.password)
                          }}
                          size="lg"
                      >
                        Get Started
                      </Button>
                      <div className="pull-left">
                        <h6>
                          <a
                              className="link footer-link"
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                          >
                            Create Account
                          </a>
                        </h6>
                      </div>
                      <div className="pull-right">
                        <h6>
                          <a
                              className="link footer-link"
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                          >
                            Need Help?
                          </a>
                        </h6>
                      </div>
                    </CardFooter>
                  </Card>
                </Form>
              </Col>
            </Container>
          </div>
        </>
    );
  } else {
    return <Redirect to='/admin/dashboard' />
  }
};

export default Login;
