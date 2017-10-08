import React from 'react';
import './Label.css';

function Label({coord:[x, y] = [], color = "black", opacity = 1, label} = {}) {
	return(
		<g>
			<rect className='label_background' x={x-2} y={y-2} width='4' height='4' />
			<text className="label" x={x} y={y+0.2}>{label}</text>
		</g>
	);

}

export default Label;