import React from "react";
import {Redirect} from 'react-router-dom';
import {Bar, Line} from "react-chartjs-2";
import {VectorMap} from "react-jvectormap";

import {Button, Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Row, Table} from "reactstrap";

// core components
import {chartExample2, chartExample3, chartExample4} from "variables/charts.js";
import axios from "axios";
import ReactTable from "../components/ReactTable/ReactTable";
import classNames from "classnames";
import ReactGA from "react-ga";

var mapData = {
  AU: 760,
  BR: 550,
  CA: 120,
  DE: 1300,
  FR: 540,
  GB: 690,
  GE: 200,
  IN: 200,
  RO: 600,
  RU: 300,
  US: 2920
};

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
    var token = localStorage.getItem("token");
    const config = {
      headers:{
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
                    <i className="tim-icons icon-pencil" />
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
                    <i className="tim-icons icon-simple-remove" />
                  </Button>{" "}
                </div>)
      }})
    }).then((x) => {
      console.log("Updating State.")
      this.setState({productData: x})
    })
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
                          <div className="numbers">
                            <p className="card-category">Product Sales today</p>
                            <CardTitle tag="h3">150 items sold</CardTitle>
                          </div>
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
                  <Card className="card-stats">
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
                            <CardTitle tag="h3">+45k</CardTitle>
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
                  </Card>
                </Col>
                <Col lg="3" md="6">
                  <Card className="card-stats">
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
                            <CardTitle tag="h3">150,000</CardTitle>
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
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
                          <div className="numbers">
                            <p className="card-category">Total Items in Inventory</p>
                            <CardTitle tag="h3">12</CardTitle>
                          </div>
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
                <Col lg="4">
                  <Card className="card-chart">
                    <CardHeader>
                      <h5 className="card-category">Total Shipments</h5>
                      <CardTitle tag="h3">
                        <i className="tim-icons icon-bell-55 text-primary"/> 763,215
                      </CardTitle>
                    </CardHeader>
                    <CardBody>
                      <div className="chart-area">
                        <Line
                            data={chartExample2.data}
                            options={chartExample2.options}
                        />
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="4">
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
                <Col lg="4">
                  <Card className="card-chart">
                    <CardHeader>
                      <h5 className="card-category">Completed Tasks</h5>
                      <CardTitle tag="h3">
                        <i className="tim-icons icon-send text-success"/> 12,100K
                      </CardTitle>
                    </CardHeader>
                    <CardBody>
                      <div className="chart-area">
                        <Line
                            data={chartExample4.data}
                            options={chartExample4.options}
                        />
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col lg="12">
                  <Card>
                    <CardHeader>
                      <CardTitle tag="h4">Global Sales by Top Locations</CardTitle>
                      <p className="card-category">All products that were shipped</p>
                    </CardHeader>
                    <CardBody>
                      <Row>
                        <Col md="6">
                          <Table responsive>
                            <tbody>
                            <tr>
                              <td>
                                <div className="flag">
                                  <img
                                      alt="..."
                                      src={require("assets/img/US.png")}
                                  />
                                </div>
                              </td>
                              <td>USA</td>
                              <td className="text-right">2.920</td>
                              <td className="text-right">53.23%</td>
                            </tr>
                            <tr>
                              <td>
                                <div className="flag">
                                  <img
                                      alt="..."
                                      src={require("assets/img/DE.png")}
                                  />
                                </div>
                              </td>
                              <td>Germany</td>
                              <td className="text-right">1.300</td>
                              <td className="text-right">20.43%</td>
                            </tr>
                            <tr>
                              <td>
                                <div className="flag">
                                  <img
                                      alt="..."
                                      src={require("assets/img/AU.png")}
                                  />
                                </div>
                              </td>
                              <td>Australia</td>
                              <td className="text-right">760</td>
                              <td className="text-right">10.35%</td>
                            </tr>
                            <tr>
                              <td>
                                <div className="flag">
                                  <img
                                      alt="..."
                                      src={require("assets/img/GB.png")}
                                  />
                                </div>
                              </td>
                              <td>United Kingdom</td>
                              <td className="text-right">690</td>
                              <td className="text-right">7.87%</td>
                            </tr>
                            <tr>
                              <td>
                                <div className="flag">
                                  <img
                                      alt="..."
                                      src={require("assets/img/RO.png")}
                                  />
                                </div>
                              </td>
                              <td>Romania</td>
                              <td className="text-right">600</td>
                              <td className="text-right">5.94%</td>
                            </tr>
                            <tr>
                              <td>
                                <div className="flag">
                                  <img
                                      alt="..."
                                      src={require("assets/img/BR.png")}
                                  />
                                </div>
                              </td>
                              <td>Brasil</td>
                              <td className="text-right">550</td>
                              <td className="text-right">4.34%</td>
                            </tr>
                            </tbody>
                          </Table>
                        </Col>
                        <Col className="ml-auto mr-auto" md="6">
                          <VectorMap
                              map={"world_mill"}
                              backgroundColor="transparent"
                              zoomOnScroll={false}
                              containerStyle={{
                                width: "100%",
                                height: "300px"
                              }}
                              regionStyle={{
                                initial: {
                                  fill: "#e4e4e4",
                                  "fill-opacity": 0.9,
                                  stroke: "none",
                                  "stroke-width": 0,
                                  "stroke-opacity": 0
                                }
                              }}
                              series={{
                                regions: [
                                  {
                                    values: mapData,
                                    scale: ["#AAAAAA", "#444444"],
                                    normalizeFunction: "polynomial"
                                  }
                                ]
                              }}
                          />
                        </Col>
                      </Row>
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
