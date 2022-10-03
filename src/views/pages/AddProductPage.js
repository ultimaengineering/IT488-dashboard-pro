import React from "react"
import ReactGA from "react-ga";
import axios from "axios";
import {Redirect} from "react-router-dom";
import NotificationAlert from "react-notification-alert";
import {
    Button,
    Card,
    CardBody, CardFooter,
    CardHeader,
    CardImg,
    CardTitle,
    Col,
    Container,
    Form, FormGroup, Input,
    InputGroup,
    InputGroupAddon, InputGroupText, Label,
    Row
} from "reactstrap";
import classnames from "classnames";

class AddProductPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { Name: "",
            Description: "",
            ISBN:"",
            InStock: "",
            Price: "",
            toLogin: false }
    }

    useAnalyticsEventTracker(category="Blog category") {
        {
            const eventTracker = (action = "test action", label = "test label") => {
                ReactGA.event({category, action, label});
            }
            return eventTracker();
        }
    }

    componentDidMount() {
        this.useAnalyticsEventTracker('Add New Product Page');
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    }

    submit(Name, Description, ISBN, InStock, Price) {
        let post_body = {
            description: Description,
            inStock: InStock,
            isbn: ISBN,
            name: Name,
            price: Price
        }

        var token = localStorage.getItem("token");
        const config = {
            headers: {
                Authorization: "Bearer " + token.replaceAll('"', ''),
            }
        };

        axios.post("https://it488-inventory.ultimaengineering.io/Products", post_body, config).then((x) => {
            if(x.status === 200) {
                console.log("Account created, redirect")
            }
        }).catch((exception) => {
            console.log(exception)
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
                                <Col className="mr-auto" md="8">
                                    <Card className="card-white">
                                        <CardHeader>
                                            <CardTitle tag="h4">Add New Product</CardTitle>
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
                                                        placeholder="Name"
                                                        type="text"
                                                        onFocus={(e) => this.setState({nameFocus: true})}
                                                        onBlur={(e) => this.setState({nameFocus: false})}
                                                        onChange={(e) => {
                                                            this.setState({Name: e.target.value})
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
                                                        placeholder="Description"
                                                        type="text"
                                                        onFocus={(e) => this.setState({nameFocus: true})}
                                                        onBlur={(e) => this.setState({nameFocus: false})}
                                                        onChange={(e) => {
                                                            this.setState({Description: e.target.value})
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
                                                        placeholder="ISBN"
                                                        type="text"
                                                        onFocus={(e) =>
                                                            this.setState({emailFocus: true})
                                                        }
                                                        onBlur={(e) =>
                                                            this.setState({emailFocus: false})
                                                        }
                                                        onChange={(e) => {
                                                            this.setState({ISBN: e.target.value})
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
                                                        placeholder="InStock"
                                                        type="text"
                                                        onFocus={(e) => this.setState({passFocus: true})}
                                                        onBlur={(e) => this.setState({passFocus: false})}
                                                        onChange={(e) => {
                                                            this.setState({InStock: e.target.value})
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
                                                        placeholder="Price"
                                                        type="text"
                                                        onFocus={(e) => this.setState({passFocus: true})}
                                                        onBlur={(e) => this.setState({passFocus: false})}
                                                        onChange={(e) => {
                                                            this.setState({Price: e.target.value})
                                                        }}
                                                    />
                                                </InputGroup>
                                            </Form>
                                        </CardBody>
                                        <CardFooter>
                                            <Button
                                                className="btn-round"
                                                color="primary"
                                                onClick={() => {
                                                    this.submit(this.state.Name, this.state.Description, this.state.ISBN, this.state.InStock, this.state.Price)
                                                }}
                                                size="lg"
                                            >
                                                Add Product
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

export default AddProductPage;