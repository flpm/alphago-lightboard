import React from 'react';
import './Stone.css';

function Stone({coord:[x, y] = [], board_coord, stone_class, label, mouseEvent} = {}) {

	var stoneClassList = "stone " + stone_class;
	var labelClassList = "stone_label "

	// if(stone_class.indexOf('black_stone') !== 0) {
	// 	labelClassList += "black_stone_label";
	// }
	// else if(stone_class.indexOf('white_stone') !== 0) {
	// 	labelClassList += "white_stone_label";
	// }
	// else if(stone_class.indexOf('variant_black_stone') !== 0) {
	// 	labelClassList += "variant_black_stone_label";
	// }
	// else if(stone_class.indexOf('variant_white_stone') !== 0) {
	// 	labelClassList += "variant_white_stone_label";
	// }
	// else if(stone_class.indexOf('main_variant_white_stone') !== 0) {
	// 	labelClassList += "main_variant_white_stone_label";
	// }

	return(
		<g className={stoneClassList}>
			<circle cx={x} cy={y} />
			{ label !== undefined && label !== "" &&
				<text className={labelClassList} x={x} y={y+0.2}>{label}</text>
			}
			{ mouseEvent !== undefined &&
			<circle className="protect" cx={x} cy={y} 
				onMouseEnter={e=>mouseEvent(board_coord, 'onMouseEnter')}
				onMouseOut={e=>mouseEvent(board_coord, 'onMouseOut')}/>
			}
		</g>
	);

}

export default Stone;