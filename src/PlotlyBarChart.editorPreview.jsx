import { Component, createElement } from "react";
import { PlotlyBarChartComponent } from "./components/PlotlyBarChartComponent";

export class preview extends Component {
    render() {
        return <PlotlyBarChartComponent sampleText={this.props.sampleText} />;
    }
}

export function getPreviewCss() {
    return require("./ui/PlotlyBarChart.css");
}
