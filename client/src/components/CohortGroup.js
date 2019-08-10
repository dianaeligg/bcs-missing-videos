import React from "react";
import { Card } from 'semantic-ui-react';
import CohortCard from "../components/CohortCard"

const groupStyle = {
    margin: "2em 0"
}

const cardGroupStyle ={
    marginTop: "1em"
}

function CohortGroup( {text, group, color} ) {
    var textStyle ={
        borderLeft: "5px solid " + color,
        padding: "0 1em",
        fontSize: "20px",
        fontWeight: "bold"
    } 

    if (group.length < 1) { return (<div></div>)}  
    return (
        <div style={groupStyle}>
        <span style={textStyle}>{text}</span>
        <Card.Group itemsPerRow={3} style={cardGroupStyle}>
        {
            group.filter(x => x.id !== -1).map(item => 
                <CohortCard name={item.course.name}
                            key={item.id}
                            id={item.id}
                            role={item.courseRole.name}
                            startDate={new Date(item.course.startDate)}
                            endDate={new Date(item.course.endDate)}
                            program={item.course.cohort.program}/> 
            )
        }
        </Card.Group>
        </div>
    );
}

export default CohortGroup;