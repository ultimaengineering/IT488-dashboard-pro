import React from "react";
import classnames from "classnames";
import useAnalyticsEventTracker from 'views/components/useAnalyticsEventTracker';
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
import ReactGA from "react-ga";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = { firstName: "",
      lastName: "",
      username:"",
      password: "",
      toLogin: false }
  }

  notificationAlertRef() {} //React.useRef(null) }
  /*React.useEffect(() => {
  document.body.classList.toggle("register-page");
  return function cleanup() {
    document.body.classList.toggle("register-page");
  };
})*/

  useAnalyticsEventTracker(category="Blog category") {
    {
      const eventTracker = (action = "test action", label = "test label") => {
        ReactGA.event({category, action, label});
      }
      return eventTracker();
    }
  }

  componentDidMount() {
    this.useAnalyticsEventTracker('Register Page');
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

  notify(place) {
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
    this.notificationAlertRef.current.notificationAlert(options);
  };
  submit(username, password, firstname, lastname) {
    let post_body = {
      username: username,
      password: password,
      FirstName: firstname,
      LastName: lastname
    }
    axios.post("https://it488-inventory.ultimaengineering.io/Users", post_body).then((x) => {
      if(x.status === 200) {
        console.log("Account created, redirect")
        this.setState({toLogin: true })
      }
    }).catch((exception) => {
      this.notify("tc");
    });
  }

  render() {
    if (this.state.toLogin) {
      return <Redirect to='/auth/login' />
    } else {
      return (
          <>
            <div className="rna-container">
              <NotificationAlert ref={this.notificationAlertRef}/>
            </div>
            <div className="content">
              <Container>
                <Row>
                  <Col className="ml-auto" md="5">
                    <div className="info-area info-horizontal mt-5">
                      <div className="description">
                        <ins className='adsbygoogle'
                             style={{ display: 'block' }}
                             data-ad-client='ca-pub-6408011637167689'
                             data-ad-slot='9628080294'
                             data-ad-format='auto'
                             data-full-width-responsive='true'
                        />
                      </div>
                    </div>
                  </Col>
                  <Col className="mr-auto" md="10">
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
                                "input-group-focus": this.state.nameFocus
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
                                onFocus={(e) => this.setState({nameFocus: true})}
                                onBlur={(e) => this.setState({nameFocus: false})}
                                onChange={(e) => {
                                  this.setState({firstName: e.target.value})
                                }}
                            />

                          </InputGroup>
                          <InputGroup
                              className={classnames({
                                "input-group-focus": this.state.nameFocus
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
                                onFocus={(e) => this.setState({nameFocus: true})}
                                onBlur={(e) => this.setState({nameFocus: false})}
                                onChange={(e) => {
                                  this.setState({lastName: e.target.value})
                                  console.log("lastname " + this.state.lastName)
                                }}
                            />
                          </InputGroup>
                          <InputGroup
                              className={classnames({
                                "input-group-focus": this.state.emailFocus
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
                                    this.setState({emailFocus: true})
                                }
                                onBlur={(e) =>
                                    this.setState({emailFocus: false})
                                }
                                onChange={(e) => {
                                  this.setState({username: e.target.value})
                                }}
                            />
                          </InputGroup>
                          <InputGroup
                              className={classnames({
                                "input-group-focus": this.state.passFocus
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
                                onFocus={(e) => this.setState({passFocus: true})}
                                onBlur={(e) => this.setState({passFocus: false})}
                                onChange={(e) => {
                                  this.setState({password: e.target.value})
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
                              this.submit(this.state.username, this.state.password, this.state.firstName, this.state.lastName)
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
  }
}

export default Register;
