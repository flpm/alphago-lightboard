import React from "react";
import Layer from "./Layer";
import Stone from "./Stone";
import Arc from './Arc';
import './VariantLabelLayer.css'

class VariantLabelLayer extends Layer{
	
	constructor({content, labels = [], arcValues = [], layerClass='', mouseEvent} = {}) {
		super('stone')
		this.content = content;
		this.labels = labels;
		this.arc_values = arcValues;
		this.layerClass = layerClass;
		this.mouseEvent = mouseEvent;
	}

	getElements() {
		var layer_elements = [];
		var total = this.arc_values.reduce((x,y)=>x+y, 0);
		//var max_value = this.arc_values.reduce((x,y)=>x > y ? x : y, 0);
		for(let i=0; i<this.content.length; i++) {
				if(this.content[i] !== undefined) {
					let stone_class = this.content[i];
					let board_x = i % 19;
					let board_y = Math.floor(i/19);
					let x = 5 + board_x*5;
					let y = 5 + board_y*5;
					let label = this.labels[i]
					
					if(this.arc_values[i] !== undefined) {
						let end_angle = 359.99*this.arc_values[i]/total;
						layer_elements.push(
							<Arc key={'LA'+i+'X'+x+"Y"+y} coord={[x,y]} angles={[0, end_angle]} board_coord={[board_x, board_y]} />
						);
					}

					layer_elements.push(
						<Stone key={'L'+i+'X'+x+"Y"+y} coord={[x,y]} board_coord={[board_x, board_y]}
						stone_class={stone_class} label={label} mouseEvent={this.mouseEvent}/>
					);
				}
			}
		return(<g key={this.content.join('-')} className={this.layerClass}>{layer_elements}</g>)
	}

}

export default VariantLabelLayer;