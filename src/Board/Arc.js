import React from 'react';
import './Arc.css';

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

function describeArc(x, y, radius, [startAngle, endAngle]=[0,0]){

    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
        "M", start.x, start.y, 
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;       
}

function describeSector(x, y, radius, [startAngle, endAngle]=[0,0]){

    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
        "M", x, y,
        "L", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
        "L", x, y
    ].join(" ");

    return d;       
}


function Arc({coord:[x, y] = [], board_coord, angles=[0,195], arc_class} = {}) {

  var arcClassList = "arc " + arc_class;
  return(
    <g className={arcClassList}>
      <path d={describeArc(x, y, 3.2, [0, 359.99])} stroke='white' strokeOpacity='0.2'/>
      <path d={describeArc(x, y, 3.2, angles)} />
      <path d={describeSector(x, y, 2.3, angles)} className='pie'/>
    </g>
  );
}

export default Arc;