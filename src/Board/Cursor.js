import React from 'react';
import './Cursor.css';

function Cursor({coord:[x, y] = []} = {}) {

	return(
		<g>
			<circle className="cursor" cx={x} cy={y} />
			
		</g>
	);

}

export default Cursor;