import React from "react";
import ReactApexChart from 'react-apexcharts';


let colors ={
    green: '#008000',
    red: '#FF0000',
    blue: '#0000ff',
    yellow: '#FFD700',
    purple: '#C71585'
}

function AttendanceHeatMap(props) {
    let attendance =  props.attendance;
    let height = Math.max(600, attendance.length * 25); 
    let state = {
        options: {
            chart: {
                id: "student-attendance",
                type: 'heatmap',
                dropShadow: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            tooltip:{
                custom: ({series, seriesIndex, dataPointIndex, w}) => {
                    return '<div class="arrow_box">' +
                      '<span>' + w.globals.labels[dataPointIndex]+ '</span>' +
                      '</div>'
                  }
            },
            xaxis: {
                categories: attendance[0].students.map(st => st.studentName),
                labels:{
                    trim: false,
                    minHeight: 150
                },
                tooltip:{
                    enabled: false
                }
            },
            plotOptions:{
                heatmap:{
                    colorScale:{
                        ranges:[
                            {
                                from: 0,
                                to: 0,
                                color: colors.red,
                                name: 'absent'
                            },
                            {
                                from: 1,
                                to: 1,
                                color: colors.green,
                                name: 'present'
                            },
                            {
                                from: 2,
                                to: 2,
                                color: colors.blue,
                                name: 'remote'
                            },
                            {
                                from: -1,
                                to: -1,
                                color: colors.yellow,
                                name: 'pending'
                            },
                            {
                                from: 3,
                                to: 3,
                                color: colors.purple,
                                name: 'excused'
                            }
                        ]
                    }
                }
            }
        },
        series: attendance.reverse().map((att) =>{
            let d = att.students.map(st => {
                switch(st.attendance){
                    case "present":
                        return 1;
                        case "absent":
                            return 0;
                            case "excused":
                        return 3;
                        case "remote":
                            return 2;
                            case "pending":
                        return -1;
                        default:
                            return -1;
                        }
                    });
            return {name: att.sessionName, data: d};
        })
    };
    return (
        <div id="chart">
            <ReactApexChart options={state.options} series={state.series} type="heatmap" height={height} />
        </div>
    );
}

export default AttendanceHeatMap;
