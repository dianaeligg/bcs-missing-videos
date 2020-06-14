import React from "react";
import ReactApexChart from "react-apexcharts";

let colors = {
  green: "#008000",
  red: "#FF0000",
  blue: "#0000ff",
  yellow: "#CFA700",
  purple: "#A715A5",
};

function AttendanceHeatMap(props) {
  let attendance = props.attendance;
  let height = Math.max(600, attendance.length * 30);
  let state = {
    options: {
      chart: {
        id: "student-attendance",
        type: "heatmap",
        dropShadow: {
          enabled: false,
        },
        animations: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        custom: ({ series, seriesIndex, dataPointIndex, w }) => {
          let status =
            w.globals.series[seriesIndex][dataPointIndex] === 1
              ? "Present"
              : w.globals.series[seriesIndex][dataPointIndex] === 0
              ? "Absent"
              : w.globals.series[seriesIndex][dataPointIndex] === 2
              ? "Remote"
              : w.globals.series[seriesIndex][dataPointIndex] === 3
              ? "Excused"
              : "Pending";
          return (
            '<div style="padding: 5px;">' +
            "<div>" +
            w.globals.labels[dataPointIndex] +
            "</div>" +
            "<div>" +
            w.config.series[seriesIndex].name +
            "</div>" +
            "<div>" +
            attendance[seriesIndex].date.toDateString() +
            "</div>" +
            "<div>" +
            status +
            "</div>" +
            "</div>"
          );
        },
      },
      xaxis: {
        categories: attendance[0].students.map((st) => st.studentName),
        labels: {
          trim: false,
          minHeight: 150,
        },
        tooltip: {
          enabled: false,
        },
      },
      plotOptions: {
        heatmap: {
          radius: 0,
          //   enableShades: true,
          //   shadeIntensity: 0.5,
          //   reverseNegativeShade: true,
          useFillColorAsStroke: true,
          colorScale: {
            ranges: [
              {
                from: 1,
                to: 100,
                color: colors.green,
                foreColor: colors.blue,
                name: "present",
              },
              {
                from: 101,
                to: 200,
                color: colors.red,
                foreColor: colors.blue,
                name: "absent",
              },
              {
                from: 201,
                to: 300,
                color: colors.blue,
                name: "remote",
              },
              {
                from: 301,
                to: 400,
                color: colors.yellow,
                name: "pending",
              },
              {
                from: 401,
                to: 500,
                color: colors.purple,
                name: "excused",
              },
            ],
          },
        },
      },
    },
    series: attendance.reverse().map((att) => {
      let d = att.students.map((st) => {
        switch (st.attendance) {
          case "present":
            return 100;
          case "absent":
            return 200;
          case "remote":
            return 300;
          case "pending":
            return 400;
          case "excused":
            return 500;
          default:
            return 400;
        }
      });
      return { name: att.sessionName, date: att.date, data: d };
    }),
  };
  return (
    <div id="chart">
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="heatmap"
        height={height}
      />
    </div>
  );
}

export default AttendanceHeatMap;
