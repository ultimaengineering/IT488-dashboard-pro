import React from "react";
import {Redirect} from 'react-router-dom';
import {Bar, Line} from "react-chartjs-2";

import {Button, Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Row, Table} from "reactstrap";

// core components
import {chartExample2, chartExample3, chartExample4} from "variables/charts.js";
import axios from "axios";
import ReactTable from "../components/ReactTable/ReactTable";
import classNames from "classnames";
import ReactGA from "react-ga";
import TotalInventoryItems from "../components/TotalInventoryItems/TotalInventoryItems"
import TodaysSalesCount from "../components/TodaysSales/TodaysSalesCount";
import TotalUsers from "../components/TotalUsers/TotalUsers";
import UsersAddedToday from "../components/UsersAddedToday/UsersAddedToday";
import TotalShipments from "../components/TotalShipments/TotalShipments";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { productData: [] }
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
    const gaEventTracker = this.useAnalyticsEventTracker('Dashboard');
    try {
      var token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: "Bearer " + token.replaceAll('"', ''),
        }
      };
      axios.get("https://it488-inventory.ultimaengineering.io/Products/all", config)
          .then((x) => {// got data now work it!
            return x.data.map(data => {
              let key = data["id"]
              console.log(data)
              return {
                id: data["id"],
                name: data["name"],
                description: data["description"],
                isbn: data["isbn"],
                inStock: data["inStock"],
                price: "" + data["price"],
                actions: (
                    // we've added some custom button actions
                    <div className="actions-right">
                      {/* use this button to add a edit kind of action */}
                      <Button
                          onClick={() => {
                            let obj = data.find((o) => o.id === key);
                            alert(
                                "You've clicked EDIT button on \n{ \nName: " +
                                obj.name +
                                ", \nposition: " +
                                obj.position +
                                ", \noffice: " +
                                obj.office +
                                ", \nage: " +
                                obj.age +
                                "\n}."
                            );
                          }}
                          color="warning"
                          size="sm"
                          className={classNames("btn-icon btn-link like", {
                            "btn-neutral": key < 5
                          })}
                      >
                        <i className="tim-icons icon-pencil"/>
                      </Button>{" "}
                      {/* use this button to remove the data row */}
                      <Button
                          onClick={() => {
                            var newdata = data;
                            newdata.find((o, i) => {
                              if (o.id === key) {
                                // here you should add some custom code so you can delete the data
                                // from this component and from your server as well
                                data.splice(i, 1);
                                console.log(data);
                                return true;
                              }
                              return false;
                            });
                            //setData(newdata);
                          }}
                          color="danger"
                          size="sm"
                          className={classNames("btn-icon btn-link like", {
                            "btn-neutral": key < 5
                          })}
                      >
                        <i className="tim-icons icon-simple-remove"/>
                      </Button>{" "}
                    </div>)
              }
            })
          }).then((x) => {
        console.log("Updating State.")
        this.setState({productData: x})
      })
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    if (localStorage.getItem("token") === null) {
      return (<Redirect to='/auth/login'/>);
    } if (this.state.productData === []) {
      return (<div><h2>Loading</h2></div>)
    }
     else {
      return (
          <>
            <div className="content">
              <Row>
                <Col xs="12">
                  <Card className="card-chart">
                    <CardHeader>
                      <Row>
                        <Col className="mb-5" md="12">
                          <Card>
                            <CardHeader>
                              <CardTitle tag="h4">Current Inventory</CardTitle>
                            </CardHeader>
                            <CardBody>
                              <ReactTable  filterable
                                           resizable={true}
                                           columns={[
                                             {
                                               Header: "Name",
                                               accessor: "name"
                                             },
                                             {
                                               Header: "Description",
                                               accessor: "description"
                                             },
                                             {
                                               Header: "InStock",
                                               accessor: "inStock"
                                             },
                                             {
                                               Header: "ISBN",
                                               accessor: "isbn"
                                             },
                                             {
                                               Header: "Price",
                                               accessor: "price"
                                             },
                                             {
                                               Header: "Actions",
                                               accessor: "actions",
                                               sortable: false,
                                               filterable: false
                                             }
                                           ]}
                                           defaultPageSize={10}
                                           data={this.state.productData}
                                           showPaginationBottom={true}
                                           className="-striped -highlight"/>
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                    </CardHeader>
                  </Card>
                </Col>
                <Col lg="3" md="6">
                  <Card className="card-stats">
                    <CardBody>
                      <Row>
                        <Col xs="5">
                          <div className="info-icon text-center icon-warning">
                            <i className="tim-icons icon-chat-33"/>
                          </div>
                        </Col>
                        <Col xs="7">
                        <TodaysSalesCount />
                        </Col>
                      </Row>
                    </CardBody>
                    <CardFooter>
                      <hr/>
                      <div className="stats">
                        <i className="tim-icons icon-refresh-01"/> Update Now
                      </div>
                    </CardFooter>
                  </Card>
                </Col>
                <Col lg="3" md="6">
                  <UsersAddedToday />
                </Col>
                <Col lg="3" md="6">
                <TotalUsers />
                </Col>
                <Col lg="3" md="6">
                  <Card className="card-stats">
                    <CardBody>
                      <Row>
                        <Col xs="5">
                          <div className="info-icon text-center icon-danger">
                            <i className="tim-icons icon-molecule-40"/>
                          </div>
                        </Col>
                        <Col xs="7">
                          <TotalInventoryItems />
                        </Col>
                      </Row>
                    </CardBody>
                    <CardFooter>
                      <hr/>
                      <div className="stats">
                        <i className="tim-icons icon-watch-time"/> In the last hours
                      </div>
                    </CardFooter>
                  </Card>
                </Col>
                <Col lg="6">
                <TotalShipments />
                </Col>
                <Col lg="6">
                  <Card className="card-chart">
                    <CardHeader>
                      <h5 className="card-category">Daily Sales</h5>
                      <CardTitle tag="h3">
                        <i className="tim-icons icon-delivery-fast text-info"/>{" "}
                        3,500€
                      </CardTitle>
                    </CardHeader>
                    <CardBody>
                      <div className="chart-area">
                        <Bar
                            data={chartExample3.data}
                            options={chartExample3.options}
                        />
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          </>
      )
    }
  }
}

export default Dashboard;
