import {Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Row} from "reactstrap";
import {Component} from "react";
import axios from "axios";
import {Bar, Line} from "react-chartjs-2";
import {chartExample3} from "../../variables/charts";

class MonthlySales extends Component {
    constructor(props) {
        super(props);
        this.state = {chart: {}, sales: 0}
    }

    componentDidMount() {
        try {
            var token = localStorage.getItem("token");
            const config = {
                headers: {
                    Authorization: "Bearer " + token.replaceAll('"', ''),
                }
            };
            axios.get("https://it488-inventory.ultimaengineering.io/Sales/summary", config)
                .then((x) => {// got data now work it!
                    return x.data.map(data => {
                        console.log(data)
                        return {
                            year: data["year"],
                            sales: data["sales"],
                            items_sold: data["items_sold"],
                            closing_month_name: data["closing_month_name"],
                        }
                    })
                }).then((x) => {
                let total_sales = x.reduce((partialSum, a) => partialSum + a.sales, 0);
                console.log("Updating State.")
                let chart = {
                    data: (canvas) => {
                        let ctx = canvas.getContext("2d");
                        let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
                        gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
                        gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
                        gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors
                        let label_data = x.map(x => {
                            return x.closing_month_name
                        })
                        console.log(label_data)
                        let data = x.map(x => {
                            return x.sales
                        })
                        return {
                            labels: label_data,
                            datasets: [
                                {
                                    label: "Monthly Sales",
                                    fill: true,
                                    backgroundColor: gradientStroke,
                                    borderColor: "#1f8ef1",
                                    borderWidth: 2,
                                    borderDash: [],
                                    borderDashOffset: 0.0,
                                    pointBackgroundColor: "#1f8ef1",
                                    pointBorderColor: "rgba(255,255,255,0)",
                                    pointHoverBackgroundColor: "#1f8ef1",
                                    pointBorderWidth: 20,
                                    pointHoverRadius: 4,
                                    pointHoverBorderWidth: 15,
                                    pointRadius: 4,
                                    data: data
                                }
                            ]
                        };
                    },
                    //options: this.chart_1_2_3_options
                };
                this.setState({chart: chart})
                this.setState({sales: total_sales})
            })
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        return (<Card className="card-chart">
            <CardHeader>
                <h5 className="card-category">Monthly Sales</h5>
                <CardTitle tag="h3">
                    <i className="tim-icons icon-delivery-fast text-info"/>{" "}
                    Quarterly Sales: ${this.state.sales}
                </CardTitle>
            </CardHeader>
            <CardBody>
                <div className="chart-area">
                    <Line
                        data={this.state.chart.data}
                        options={chartExample3.options}
                    />
                </div>
            </CardBody>
        </Card>)
    }
}

export default MonthlySales;