import {Button, CardTitle} from "reactstrap";
import {Component} from "react";
import axios from "axios";
import classNames from "classnames";

class TotalInventoryItems extends Component {
    constructor(props) {
        super(props);
        this.state = {salesData: []}
    }

    componentDidMount() {
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
                        console.log(data)
                        return {
                            id: data["id"],
                        }
                    })
                }).then((x) => {
                console.log("Updating State")
                this.setState({salesData: x})
            })
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        return (<div className="numbers">
            <p className="card-category">Total Items in Inventory</p>
            <CardTitle tag="h3">{this.state.salesData.length}</CardTitle>
        </div>)
    }
}

export default TotalInventoryItems;