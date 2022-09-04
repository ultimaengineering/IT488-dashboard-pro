import React from "react";
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";
import axios from "axios";
import NotificationAlert from "react-notification-alert";
import {Redirect} from "react-router-dom";

const Register = () => {
  const [state, setState] = React.useState({
    firstName: "",
    lastName: "",
    username:"",
    password: "",
    toLogin: false
  });
  const notificationAlertRef = React.useRef(null);
  React.useEffect(() => {
    document.body.classList.toggle("register-page");
    return function cleanup() {
      document.body.classList.toggle("register-page");
    };
  });

  const notify = (place) => {
    var color = 3
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
              Username Taken please change your username and try again.
            </div>
          </div>
      ),
      type: type,
      icon: "tim-icons icon-bell-55",
      autoDismiss: 7
    };
    notificationAlertRef.current.notificationAlert(options);
  };

  function submit(username, password, firstname, lastname) {
    let post_body = {
      username: username,
      password: password,
      FirstName: firstname,
      LastName: lastname
    }
    axios.post("https://it488-inventory.ultimaengineering.io/Users", post_body).then((x) => {
      if(x.status === 200) {
        console.log("Account created, redirect")
        setState({ state, toLogin: true })
      }
    }).catch((exception) => {
      notify("tc");
    });
  }

  if (state.toLogin) {
    return <Redirect to='/auth/login' />
  } else {
    return (
        <>
          <div className="rna-container">
            <NotificationAlert ref={notificationAlertRef}/>
          </div>
          <div className="content">
            <Container>
              <Row>
                <Col className="ml-auto" md="5">
                  <div className="info-area info-horizontal mt-5">
                    <div className="icon icon-warning">
                      <i className="tim-icons icon-wifi"/>
                    </div>
                    <div className="description">
                      <h3 className="info-title">Marketing</h3>
                      <p className="description">
                        We've created the marketing campaign of the website. It was
                        a very interesting collaboration.
                      </p>
                    </div>
                  </div>
                  <div className="info-area info-horizontal">
                    <div className="icon icon-primary">
                      <i className="tim-icons icon-triangle-right-17"/>
                    </div>
                    <div className="description">
                      <h3 className="info-title">Fully Coded in HTML5</h3>
                      <p className="description">
                        We've developed the website with HTML5 and CSS3. The client
                        has access to the code using GitHub.
                      </p>
                    </div>
                  </div>
                  <div className="info-area info-horizontal">
                    <div className="icon icon-info">
                      <i className="tim-icons icon-trophy"/>
                    </div>
                    <div className="description">
                      <h3 className="info-title">Built Audience</h3>
                      <p className="description">
                        There is also a Fully Customizable CMS Admin Dashboard for
                        this product.
                      </p>
                    </div>
                  </div>
                </Col>
                <Col className="mr-auto" md="7">
                  <Card className="card-register card-white">
                    <CardHeader>
                      <CardImg
                          alt="..."
                          src={require("assets/img/card-primary.png")}
                      />
                      <CardTitle tag="h4">Register</CardTitle>
                    </CardHeader>
                    <CardBody>
                      <Form className="form">
                        <InputGroup
                            className={classnames({
                              "input-group-focus": state.nameFocus
                            })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-single-02"/>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                              placeholder="First Name"
                              type="text"
                              onFocus={(e) => setState({...state, nameFocus: true})}
                              onBlur={(e) => setState({...state, nameFocus: false})}
                              onChange={(e) => {
                                setState({...state, firstName: e.target.value})
                              }}
                          />

                        </InputGroup>
                        <InputGroup
                            className={classnames({
                              "input-group-focus": state.nameFocus
                            })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-single-02"/>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                              placeholder="Last Name"
                              type="text"
                              onFocus={(e) => setState({...state, nameFocus: true})}
                              onBlur={(e) => setState({...state, nameFocus: false})}
                              onChange={(e) => {
                                setState({...state, lastName: e.target.value})
                                console.log("lastname " + state.lastName)
                              }}
                          />
                        </InputGroup>
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
                              onFocus={(e) =>
                                  setState({...state, emailFocus: true})
                              }
                              onBlur={(e) =>
                                  setState({...state, emailFocus: false})
                              }
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
                        <FormGroup check className="text-left">
                          <Label check>
                            <Input type="checkbox"/>
                            <span className="form-check-sign"/>I agree to the{" "}
                            <a href="#pablo" onClick={(e) => e.preventDefault()}>
                              terms and conditions
                            </a>
                            .
                          </Label>
                        </FormGroup>
                      </Form>
                    </CardBody>
                    <CardFooter>
                      <Button
                          className="btn-round"
                          color="primary"
                          onClick={() => {
                            submit(state.username, state.password, state.firstName, state.lastName)
                          }}
                          size="lg"
                      >
                        Create Account
                      </Button>
                    </CardFooter>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        </>
    )
  }
};

export default Register;
