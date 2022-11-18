import { Component, createElement } from "react";

import { PlotlyBarChartComponent } from "./components/PlotlyBarChartComponent";
import "./ui/PlotlyBarChart.css";

export default class PlotlyBarChart extends Component {
    render() {
        return <PlotlyBarChartComponent {...this.props} />;
    }
}
