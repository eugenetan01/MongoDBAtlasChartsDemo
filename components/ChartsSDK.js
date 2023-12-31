import React, { useEffect, useRef, useState } from "react";
import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";

const Chart = ({ filter, chartId, height, width, darkTheme }) => {
  const sdk = new ChartsEmbedSDK({
    baseUrl: "https://charts.mongodb.com/charts-eugene-wbjar",
  });

  const chartDiv = useRef(null);
  const [rendered, setRendered] = useState(false);

  let [chart, setChart] = useState(
    sdk.createChart({
      chartId: chartId,
      height: height,
      width: width,
      theme: darkTheme,
    })
  );

  useEffect(() => {
    setChart(
      sdk.createChart({
        chartId: chartId,
        height: height,
        width: width,
        theme: darkTheme,
      })
    );
  }, [darkTheme]);

  useEffect(() => {
    chart
      .render(chartDiv.current)
      .then(() => setRendered(true))
      .catch((err) => console.log("Error during Charts rendering.", err));
  }, [darkTheme]);
  useEffect(() => {
    chart
      .render(chartDiv.current)
      .then(() => setRendered(true))
      .catch((err) => console.log("Error during Charts rendering.", err));
  }, [chart]);
  useEffect(() => {
    if (rendered) {
      chart
        .setFilter(filter)
        .catch((err) => console.log("Error while filtering.", err));
    }
  }, [chart, filter, rendered]);
  return <div className="chart" ref={chartDiv} />;
};
export default Chart;
