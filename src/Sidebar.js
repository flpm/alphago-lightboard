import React from 'react';

import './Sidebar.css';

function Sidebar(props) {

	const NUM_TO_LABEL = " ABCDEFGHIJKLMNOPQRSTUVWXYZ";

	let VariationSideListItem = [];
	let i = 1;
	let c = 0;

	let c_threshold = 15;

	if(props.currentMove.attributes.variations !== undefined && props.currentMove.attributes.variations.length < 50) {
		c_threshold = 50;
	}

	//if multiple variation and multiple children list games grouping by child
	if(props.currentMove.children.length > 1 && props.currentMove.children[0] !== undefined) {
		for(let child of props.currentMove.children) {
			if(child !== undefined && child.attributes.variations !== undefined) {
				VariationSideListItem.push(<li key={i} className="var_label">{NUM_TO_LABEL.charAt(i) + ": " + child.attributes.variations.length + ' games'}</li>)
				c = 0;
				for(let v of child.attributes.variations) {
					if(c < c_threshold) {
						VariationSideListItem.push(<li key={v.name}>{v.name}</li>)
					}
					else {
						VariationSideListItem.push(<li key={v.name + "_extra_label"}>and {child.attributes.variations.length - c_threshold} more...</li>)
						break;
					}
					c+=1;
				}
				i+=1;
			}
		}
	}
	else 
		if(props.currentMove.attributes.variations.length === 1) {
			let v = props.currentMove.attributes.variations[0];

			// only one variation in this position, list the game details
			if(props.currentMove.attributes.variations[0].game !== undefined) {
				let g = v.game.attributes;

				VariationSideListItem.push(<li className="var_label" key={v.name}><u>{v.name}</u></li>);

				VariationSideListItem.push(<li key='white'>white: {g.white}</li>);
				VariationSideListItem.push(<li key='black'>black: {g.black}</li>);
				VariationSideListItem.push(<li key='result'>result: {g.result}</li>);
				VariationSideListItem.push(<li key='date'>date: {g.date}</li>);
				VariationSideListItem.push(<li key='place'>place: {g.place}</li>);
				VariationSideListItem.push(<li key='main_time'>main time: {g.main_time}</li>);
				VariationSideListItem.push(<li key='overtime'>overtime: {g.overtime}</li>);
				VariationSideListItem.push(<li key='ruleset'>ruleset: {g.ruleset}</li>);
				VariationSideListItem.push(<li key='komi'>komi: {g.komi}</li>);
			}
			// only one variation, but there are no game details
			else {
				VariationSideListItem.push(<li key={v.name}>{v.name}</li>)
			}
		}
		// if more than one variation but all have same move just list
		else if(props.currentMove.attributes.variations.length > 1) {
			c = 0;
			for(let v of props.currentMove.attributes.variations) {
				VariationSideListItem.push(<li className="var_label" key="single_child_label">{props.currentMove.attributes.variations.length} games</li>);
				if(c < c_threshold) {
					VariationSideListItem.push(<li key={v.name}>{v.name}</li>)
				}
				else {
					VariationSideListItem.push(<li key={v.name + "_extra_label"}>and {props.currentMove.attributes.variations.length - c_threshold} more...</li>)
					break;
				}
				c+=1;
			}
		}



	return(
		<div className="sidebar_container">
			<p>GAMES IN THIS POSITION:</p><br/>

			<ul>
				{VariationSideListItem}
			</ul>
		</div>
	);
}

export default Sidebar;