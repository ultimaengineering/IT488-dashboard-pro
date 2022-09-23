import React from "react";
import {Redirect} from 'react-router-dom';
import classnames from "classnames";
import ReactGA from "react-ga";
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
import NotificationAlert from "react-notification-alert";

const Login = () => {
  const notificationAlertRef = React.useRef(null);
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

  const useAnalyticsEventTracker = (category="Blog category") => {
    const eventTracker = (action = "test action", label = "test label") => {
      ReactGA.event({category, action, label});
    }
    return eventTracker;
  }

  function submit(username, password) {
    axios.post("https://it488-inventory.ultimaengineering.io/Users/authenticate", {
      username: username, password: password
    }).then((x) => {
      if(x.status === 200) { // login worked!
        localStorage.setItem("token", JSON.stringify(x.data['token']))
        setState({ state, toDashboard: true })
      }
    }).catch((exception) => {
      notify("tc", "Invalid login, double check your username and password and try again.");
    });
  }

  const notify = (place) => {
    var color = 4;
    var type;
    switch (color) {
      case 1:
        type = "primary";
        break;
      case 2:
        type = "success";
        break;
      case 3:
        type = "danger";
        break;
      case 4:
        type = "warning";
        break;
      case 5:
        type = "info";
        break;
      default:
        break;
    }
    var options = {};
    options = {
      place: place,
      message: (
          <div>
            <div>
              Invalid login, double check your username and password and try again.
            </div>
          </div>
      ),
      type: type,
      icon: "tim-icons icon-bell-55",
      autoDismiss: 7
    };
    notificationAlertRef.current.notificationAlert(options);
  };

  const gaEventTracker = useAnalyticsEventTracker('Login page');
  if (!state.toDashboard) {
    return (
        <>
          <div className="rna-container">
            <NotificationAlert ref={notificationAlertRef} />
          </div>
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
                          onClick={() => {
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
                              href="/auth/register"
                              onClick={(e) => <Redirect to='/admin/dashboard' />}
                          >
                            Create Account
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
