import React from 'react';
import './Board.css';
import Cursor from './Cursor';


function Board(props) {

	var y_axis_labels = [];
	var x_axis_letters = " ABCDEFGHJKLMNOPQRST";
	var x_axis_labels = [];
	var viewbox = [0, 0, 100, 100];

	// Set up coordinates around the board
	if(props.showCoords) {
		viewbox = [-2, -2, 104, 104];
		for(let i=1; i < 20; i ++) {
			y_axis_labels.push(<text className="y_label" x="0" y={5*i} key={'y_label_left_' + i} fill="black" textAnchor="right" alignmentBaseline="middle">{20-i}</text>);
			y_axis_labels.push(<text className="y_label" x="98" y={5*i} key={'y_label_right_' + i} fill="black" textAnchor="left" alignmentBaseline="middle">{20-i}</text>);
			x_axis_labels.push(<text className="x_label" x={5*i} y="1.4" key={'x_label_top_' + i} fill="black" textAnchor="middle" alignmentBaseline="middle">{x_axis_letters.charAt(i)}</text>);
			x_axis_labels.push(<text className="x_label" x={5*i} y="100" key={'x_label_bottom_' + i} fill="black" textAnchor="middle" alignmentBaseline="top">{x_axis_letters.charAt(i)}</text>);
		}
	}

	// Create layer elements
	var layer_elements = []
	for(let layer of props.layers || []) {
		layer_elements.push(layer.getElements());
	}

	// Render component
	return(
		<div className='board_container'>
          <svg xmlns="http://www.w3.org/2000/svg" id="svg" viewBox={viewbox.join(" ")} onMouseMove={props.onMouseMove} onClick={props.onClick}>
            <rect x='5' y='5' width='5' height='5' ref={x => props.setViewboxScale(x)}/>
            <rect className='board_background' x="-2" y="-2" width="104.5" height="104.5"/>
            <rect className='board_lines' width="90" height="90" x="5" y="5" stroke="#000" strokeWidth=".2" fill="none" />
            <path className='board_lines' stroke="#000" strokeWidth=".2" fill="none" d="m5,10h90m0,5h-90m0,5h90m0,5h-90m0,5h90m0,5h-90m0,5h90m0,5h-90m0,5h90m0,5h-90m0,5h90m0,5h-90m0,5h90m0,5h-90m0,5h90m0,5h-90m0,5h90"/>
            <path className='board_lines' stroke="#000" strokeWidth=".2" fill="none" d="m10,5v90m5,0v-90m5,0v90m5,0v-90m5,0v90m5,0v-90m5,0v90m5,0v-90m5,0v90m5,0v-90m5,0v90m5,0v-90m5,0v90m5,0v-90m5,0v90m5,0v-90m5,0v90"/>
            <path className='board_lines' stroke="#000" strokeWidth=".8" strokeLinecap="round" d="m20,80l0,0m30,0l0,0m30,0l0,0m0-30l0,0m-30,0l0,0m-30,0l0,0m0-30l0,0m30,0l0,0m30,0l0,0"/>
            {y_axis_labels}
            {x_axis_labels}

            {layer_elements}

            { props.showCursor && props.cursor[0] !== undefined && props.cursor[1] !== undefined &&
            	<Cursor coord={props.cursor.map(x=>5+x*5)} /> }

          </svg>
        </div>

	);

}

export default Board;