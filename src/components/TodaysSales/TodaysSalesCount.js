import {Button, CardTitle} from "reactstrap";
import {Component} from "react";
import axios from "axios";
import classNames from "classnames";
import todaysSalesCount from "./TodaysSalesCount";

class TodaysSalesView extends Component {
    constructor(props) {
        super(props);
        this.state = {salesData: 0}
    }

    componentDidMount() {
        try {
            var token = localStorage.getItem("token");
            const config = {
                headers: {
                    Authorization: "Bearer " + token.replaceAll('"', ''),
                }
            };
            axios.get("https://it488-inventory.ultimaengineering.io/Sales/all", config)
                .then((x) => {// got data now work it!
                    return x.data.map(data => {
                        console.log(data)
                        return {
                            id: data["id"],
                            productId: data["productId"],
                            salesPrice: data["salesPrice"],
                            timeOfSale: data["timeOfSale"],
                        }
                    })
                }).then((x) => {
                console.log("Updating State.")
                let todaysSales = x.filter(e => {
                    return new Date(e.timeOfSale).getDay() === new Date().getDay()
                });
                this.setState({salesData: todaysSales.length})
            })
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        return (<div className="numbers">
            <p className="card-category">Product Sales today</p>
            <CardTitle tag="h3">{this.state.salesData}</CardTitle>
        </div>)
    }
}

export default TodaysSalesView;