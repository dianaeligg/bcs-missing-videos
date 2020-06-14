import React from "react";
import ReactApexChart from "react-apexcharts";

let colors = {
  green: "#008000",
  red: "#FF0000",
  blue: "#0000ff",
  yellow: "#CFA700",
  purple: "#A715A5",
  orange: "#ffa500",
  orangeYellow: "#ffa5ff",
};

function AssignmentsHeatMap(props) {
  console.log("PROPS", props);
  let assignments = props.assignments;
  let height = Math.max(600, assignments.length * 30);
  let state = {
    options: {
      chart: {
        id: "student-assignments",
        type: "heatmap",
        dropShadow: {
          enabled: false,
        },
        animations: {
          enabled: false,
        },
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
            // "<div>" +
            // attendance[seriesIndex].date.toDateString() +
            // "</div>" +
            // "<div>" +
            // status +
            // "</div>" +
            "</div>"
          );
        },
      },
      xaxis: {
        categories: assignments[0].students.map((student) => student.name),
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
          useFillColorAsStroke: true,
          colorScale: {
            ranges: [
              {
                from: 90,
                to: 100,
                color: colors.green,
                name: "A",
              },
              {
                from: 80,
                to: 89,
                color: colors.yellow,
                name: "B",
              },
              {
                from: 70,
                to: 79,
                color: colors.orangeYellow,
                name: "C",
              },
              {
                from: 60,
                to: 69,
                color: colors.orange,
                name: "D",
              },
              {
                from: 1,
                to: 59,
                color: colors.red,
                name: "F",
              },
            ],
          },
        },
      },
    },
    series: assignments.reverse().map((assignment) => {
      let data = assignment.students.map((student) => {
        switch (student.grade) {
          case "A+":
            return 100;
          case "A":
            return 96;
          case "A-":
            return 92;
          case "B+":
            return 89;
          case "B":
            return 86;
          case "B-":
            return 82;
          case "C+":
            return 79;
          case "C":
            return 76;
          case "C-":
            return 72;
          case "D+":
            return 69;
          case "D":
            return 66;
          case "D-":
            return 62;
          default:
            return 59;
        }
      });
      return { name: assignment.name, data };
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

export default AssignmentsHeatMap;
