import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

const MyChart = () => {
  let { year, country, area } = useParams();
  const [fetching, setFetching] = useState(false);
  const [fetchSuccess, setFetchSuccess] = useState(false);
  const [collaborationMale, setCollaborationMale] = useState(0);
  const [collaborationFemale, setCollaborationFemale] = useState(0);
  const [singleMale, setSingleMale] = useState(0);
  const [singleFemale, setSingleFemale] = useState(0);
  const [totalCollaboration, setTotalCollaboration] = useState(0);
  const [totalSingle, setTotalSingle] = useState(0);

  const barConfig = useMemo(
    () => ({
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
            formatter: function () {
              return Highcharts.numberFormat(this.y, 0, ".", ",");
            },
          },
        },
      },
      tooltip: {
        pointFormatter: function () {
          return `<span style="color:${this.color}">\u25CF</span> ${
            this.series.name
          }: <b>${Highcharts.numberFormat(this.y, 0, ".", ",")}</b><br/>`;
        },
      },
      series: [
        {
          name: "男",
          data: [collaborationMale, singleMale],
        },
        {
          name: "女",
          data: [collaborationFemale, singleFemale],
        },
      ],
    }),
    [collaborationMale, collaborationFemale, singleMale, singleFemale]
  );

  const pieConfig = {
    chart: {
      type: "pie",
    },
    title: {
      text: "戶數統計",
    },
    series: [
      {
        name: "total",
        data: [
          { name: "共同生活", y: totalCollaboration },
          { name: "獨立生活", y: totalSingle },
        ],
      },
    ],
    plotOptions: {
      pie: {
        allowPointSelect: true,
        dataLabels: {
          enabled: true,
          format: "{point.percentage:.2f} %",
        },
        showInLegend: true,
      },
    },
    tooltip: {
      formatter: function () {
        return `<b>${this.point.name}</b>: ${this.point.y.toLocaleString()} 戶`;
      },
    },
  };

  useEffect(() => {
    setFetching(true);
    fetch(
      `https://www.ris.gov.tw/rs-opendata/api/v1/datastore/ODRP019/${year}?COUNTY=${country}&TOWN=${area}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.responseMessage === "處理完成") {
          setFetchSuccess(true);
          const resData = data.responseData;
          setCollaborationFemale(
            resData.reduce(
              (accu, cur) => accu + parseInt(cur.household_ordinary_f),
              0
            )
          );
          setCollaborationMale(
            resData.reduce(
              (accu, cur) => accu + parseInt(cur.household_ordinary_m),
              0
            )
          );
          setSingleFemale(
            resData.reduce(
              (accu, cur) => accu + parseInt(cur.household_single_f),
              0
            )
          );
          setSingleMale(
            resData.reduce(
              (accu, cur) => accu + parseInt(cur.household_single_m),
              0
            )
          );
          setTotalCollaboration(
            resData.reduce(
              (accu, cur) => accu + parseInt(cur.household_ordinary_total),
              0
            )
          );
          setTotalSingle(
            resData.reduce(
              (accu, cur) => accu + parseInt(cur.household_single_total),
              0
            )
          );
        } else {
          setFetchSuccess(false);
        }
        setFetching(false);
      });
  }, [year, country, area]);

  return (
    <div className="myCharts">
      <h3 className="search-result">{`${year}年 ${country} ${area}`}</h3>
      {fetching ? (
        <span className="loader"></span>
      ) : fetchSuccess ? (
        <>
          <div className="chart-container">
            <HighchartsReact highcharts={Highcharts} options={barConfig} />
          </div>
          <div className="chart-container">
            <HighchartsReact highcharts={Highcharts} options={pieConfig} />
          </div>
        </>
      ) : (
        <div className="no-data">查無資料 😭</div>
      )}
    </div>
  );
};

export default MyChart;
