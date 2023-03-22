import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useParams } from "react-router-dom";

const MyChart = () => {
  let { year, country, area } = useParams();

  const config = {
    chart: {
      type: "column",
    },
    title: {
      text: "人口數",
    },
    xAxis: {
      title: {
        text: "型態",
      },
      categories: ["共同生活", "獨立生活"],
    },
    yAxis: {
      min: 0,
      title: {
        text: "數量",
        align: "high",
        rotation: 0,
      },
    },
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
        },
      },
    },
    series: [
      {
        name: "男",
        data: [1000, 2000],
      },
      {
        name: "女",
        data: [800, 1500],
      },
    ],
  };

  const options = {
    chart: {
      type: "pie",
    },
    title: {
      text: "戶數統計",
    },
    legend: {
      enabled: true,
      align: "right",
      verticalAlign: "middle",
      layout: "horizontal",
      itemMarginBottom: 10,
      itemStyle: {
        fontSize: "14px",
        fontWeight: "normal",
      },
    },
    series: [
      {
        name: "percentage data",
        data: [
          { name: "A", y: 10 },
          { name: "B", y: 20 },
        ],
      },
    ],
  };

  return (
    <div className="myCharts">
      <h3 className="search-result">{`${year} ${country} ${area}`}</h3>

      <HighchartsReact highcharts={Highcharts} options={config} />
      <hr />
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default MyChart;
