import React from 'react';
import './Halo.css';

function Halo({coord:[x, y] = [], halo_class} = {}) {

	var haloClassList = "halo " + halo_class;

	return(
		<g>
			<circle className={haloClassList} cx={x} cy={y}/>
		</g>
	);

}

export default Halo;