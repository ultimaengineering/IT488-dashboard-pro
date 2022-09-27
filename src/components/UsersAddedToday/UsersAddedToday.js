import {Card, CardBody, CardFooter, CardTitle, Col, Row} from "reactstrap";
import {Component} from "react";
import axios from "axios";

class UsersAddedToday extends Component {
    constructor(props) {
        super(props);
        this.state = {usersCount: 0}
    }

    componentDidMount() {
        try {
            var token = localStorage.getItem("token");
            const config = {
                headers: {
                    Authorization: "Bearer " + token.replaceAll('"', ''),
                }
            };
            axios.get("https://it488-inventory.ultimaengineering.io/Users", config)
                .then((x) => {// got data now work it!
                    return x.data.map(data => {
                        console.log(data)
                        return {
                            id: data["id"],
                            accountCreated: data["account_created"],
                        }
                    })
                }).then((x) => {
                console.log("Updating State.")
                let counts = x.filter(e => {
                    return new Date(e.accountCreated).getDay() === new Date().getDay()
                });
                this.setState({usersCount: counts.length})
            })
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        return (<Card className="card-stats">
            <CardBody>
                <Row>
                    <Col xs="5">
                        <div className="info-icon text-center icon-primary">
                            <i className="tim-icons icon-shape-star"/>
                        </div>
                    </Col>
                    <Col xs="7">
                        <div className="numbers">
                            <p className="card-category">Users added today</p>
                            <CardTitle tag="h3">{this.state.usersCount}</CardTitle>
                        </div>
                    </Col>
                </Row>
            </CardBody>
            <CardFooter>
                <hr/>
                <div className="stats">
                    <i className="tim-icons icon-sound-wave"/> Newly Added Users
                </div>
            </CardFooter>
        </Card>)
    }
}

export default UsersAddedToday;