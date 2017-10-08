import React from "react";
import Layer from "./Layer";
import Stone from "./Stone";

import './StoneLayer.css';

class StoneLayer extends Layer{
	
	constructor({content, labels = "", layerClass='', mouseEvent} = {}) {
		super('stone')
		this.content = content;
		this.labels = labels;
		this.layerClass = layerClass;
		this.mouseEvent = mouseEvent;
	} 

	getElements() {
		var layer_elements = [];
		for(let i=0; i<this.content.length; i++) {
				if(this.content[i] !== undefined) {
					let stone_class = this.content[i];
					let board_x = i % 19;
					let board_y = Math.floor(i/19);
					let x = 5 + board_x*5;
					let y = 5 + board_y*5;
					let label = this.labels[i]

					layer_elements.push(<Stone key={'L'+i+'X'+x+"Y"+y} coord={[x,y]} board_coord={[board_x, board_y]} stone_class={stone_class} label={label} mouseEvent={this.mouseEvent} />);
				}
			}
		return(<g key={this.content.join('-')} className={this.layerClass}>{layer_elements}</g>)
	}

}

export default StoneLayer;