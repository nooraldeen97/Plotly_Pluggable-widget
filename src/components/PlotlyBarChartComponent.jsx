/* eslint-disable no-duplicate-imports */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable radix */
/* eslint-disable consistent-return */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { Component, createElement } from "react";
import Plot from "react-plotly.js";

export class PlotlyBarChartComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initail: [],
            data: [],
            annotations: []
        };
    }

    componentDidUpdate(prevProps, prevState) {
        //getting data from mendix
        const jsonData = [];
        if (this.props.brandsData.status !== prevProps.brandsData.status) {
            mx.data.get({
                guids: this.props.brandsData.items.map(elem => elem.id),
                callback: objs => {
                    objs.forEach(obj =>
                        jsonData.push({
                            yValue: obj.get("Slice_Size"),
                            xLabel: obj.get("Stack_Label"),
                            yLabel: obj.get("Slice_Label")
                        })
                    );
                    // console.info("JSON from Mendix 41 ", jsonData);
                    this.setState({ initail: jsonData });
                }
            });
        }
        if (prevState.initail !== this.state.initail) {
            const arr = [];

            this.state.initail.map(ele => {
                arr.push(ele.yLabel);
                return arr;
            });

            const set = Array.from(new Set(arr));

            const filtereddata = [];
            for (let i = 0; i < set.length; i++) {
                const map = new Map();
                for (let j = 0; j < this.state.initail.length; j++) {
                    if (set[i] === this.state.initail[j].yLabel) {
                        if (map.has(this.state.initail[j].xLabel)) {
                            map.set(
                                this.state.initail[j].xLabel,
                                map.get(this.state.initail[j].xLabel) +
                                    parseInt(this.state.initail[j].yValue.toString())
                            );
                        } else {
                            map.set(this.state.initail[j].xLabel, parseInt(this.state.initail[j].yValue.toString()));
                        }
                    }
                }
                filtereddata.push(map);
            }

            const finalData = [];

            for (let i = 0; i < set.length; i++) {
                finalData.push({
                    x: Array.from(filtereddata[i].keys()),
                    y: Array.from(filtereddata[i].values()),
                    name: set[i],
                    type: "bar"
                });
            }
            this.setState({ data: finalData });

            const map = new Map();
            for (let x = 0; x < this.state.initail.length; x++) {
                if (map.has(this.state.initail[x].xLabel)) {
                    map.set(
                        this.state.initail[x].xLabel,
                        map.get(this.state.initail[x].xLabel) + parseInt(this.state.initail[x].yValue.toString())
                    );
                } else {
                    map.set(this.state.initail[x].xLabel, parseInt(this.state.initail[x].yValue.toString()));
                }
            }

            const xLabelSet = Array.from(map.entries());

            const finalAnnotation = [];

            for (let k = 0; k < xLabelSet.length; k++) {
                finalAnnotation.push({
                    x: Array.from(xLabelSet[k])[0],
                    y: Array.from(xLabelSet[k])[1],
                    text: Array.from(xLabelSet[k])[1],
                    xanchor: "center",
                    yanchor: "bottom",
                    showarrow: false
                });
            }
            this.setState({ annotations: finalAnnotation });
        }
    }
    render() {
        return (
            <div style={{ width: "100%", height: "80%" }}>
                {this.state.data ? (
                    <Plot
                        data={this.state.data}
                        layout={{
                            barmode: "stack",
                            width: 1200,
                            responsive: true,
                            annotations: this.state.annotations ? this.state.annotations : ""
                        }}
                    />
                ) : (
                    ""
                )}
            </div>
        );
    }
}
