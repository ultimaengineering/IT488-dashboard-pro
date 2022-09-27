import {Card, CardBody, CardTitle, Col, Row} from "reactstrap";
import {Component} from "react";
import axios from "axios";

class TotalUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {userCount: 0}
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
                            id: data["id"]
                        }
                    })
                }).then((x) => {
                console.log("Updating State.")
                this.setState({userCount: x.length})
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
                        <div className="info-icon text-center icon-success">
                            <i className="tim-icons icon-single-02"/>
                        </div>
                    </Col>
                    <Col xs="7">
                        <div className="numbers">
                            <p className="card-category">Users</p>
                            <CardTitle tag="h3">{this.state.userCount}</CardTitle>
                        </div>
                    </Col>
                </Row>
            </CardBody>
        </Card>)
    }
}

export default TotalUsers;