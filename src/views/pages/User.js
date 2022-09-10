import React from "react";
import jwt_decode from "jwt-decode";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";
import axios from "axios";
import NotificationAlert from "react-notification-alert";
import {Redirect} from "react-router-dom";

const User = () => {
  const notificationAlertRef = React.useRef(null);
  var token = localStorage.getItem("token");
  var decoded = jwt_decode(token);
  console.log(decoded)
  const [state, setState] = React.useState({
    username: decoded["username"],
    firstName: decoded["firstName"],
    lastName: decoded["lastName"],
    password: "",
    toLogin: false
  });

  function submit(username, password, firstName, lastName) {
    var token = localStorage.getItem("token");
    const config = {
      headers:{
        Authorization: "Bearer " + token.replaceAll('"', ''),
      }
    };
    var decoded = jwt_decode(token);
    axios.put("https://it488-inventory.ultimaengineering.io/Users", {
      OldUsername: decoded["username"],
      password: password,
      username: username,
      firstName: firstName,
      lastName: lastName
    }, config).then((x) => {
      if(x.status === 200) { // login worked!
        notify("tc", "Updated.");
        localStorage.removeItem("token")
        setState({ state, toLogin: true })
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

  if (!state.toLogin) {
  return (
    <>
      <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <div className="content">
        <Row>
          <Col md="8">
            <Card>
              <CardHeader>
                <h5 className="title">Edit Profile</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="px-md-1" md="3">
                      <FormGroup>
                        <label>Username</label>
                        <Input defaultValue={state.username} type="text"
                               onChange={(e) => {
                                 setState({...state, username: e.target.value})
                               }}/>
                      </FormGroup>
                    </Col>
                    <Col className="pr-md-1" md="3">
                      <FormGroup>
                        <label>First Name</label>
                        <Input defaultValue={state.firstName} type="text" onChange={(e) => {
                          setState({...state, firstName: e.target.value})
                        }}/>
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="3">
                      <FormGroup>
                        <label>Last Name</label>
                        <Input defaultValue={state.lastName} type="text" onChange={(e) => {
                          setState({...state, lastName: e.target.value})
                        }}/>
                      </FormGroup>
                    </Col>
                  </Row>
                <Row>
                  <Col className="pr-md-1" md="3">
                    <FormGroup>
                      <label>Password</label>
                      <Input defaultValue="*************" type="text" onChange={(e) => {
                        setState({...state, password: e.target.value})
                      }}/>
                    </FormGroup>
                  </Col>
                </Row>
                </Form>
              </CardBody>
              <CardFooter>
                <Button className="btn-fill" color="primary" type="submit" onClick={() => {
                  submit(state.username, state.password, state.firstName, state.lastName)
                }}>
                  Save
                </Button>
              </CardFooter>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <CardBody>
                <CardText />
                <div className="author">
                  <div className="block block-one" />
                  <div className="block block-two" />
                  <div className="block block-three" />
                  <div className="block block-four" />
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar"
                      src={require("assets/img/emilyz.jpg")}
                    />
                    <h5 className="title">{state.firstName} {state.lastName}</h5>
                  </a>
                </div>
                <div className="card-description">
                  We are glad to have you be a part of BrickBooks Incorporated!
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )} else {
    return <Redirect to='/auth/login' />
  }
};

export default User;
