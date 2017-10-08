import React from "react";
import Layer from "./Layer";
import Label from "./Label";
import './LabelLayer.css';

class LabelLayer extends Layer{
	
	constructor({content, layerClass = ''} = {}) {
		super('label')
		this.content = content;
		this.layerClass = layerClass;
	}

	getElements() {
		var layer_elements = [];
		for(let i=0; i<this.content.length; i++) {
				if(this.content[i] !== undefined) {
					let board_x = i % 19;
					let board_y = Math.floor(i/19);

					let x = 5 + board_x*5;
					let y = 5 + board_y*5;

					let label = this.content[i];

					layer_elements.push(<Label key={'L'+i+'X'+x+"Y"+y} coord={[x,y]} label={label} />);
				}
			}
		return(<g key={this.content.join('-')} className={this.layerClass}>{layer_elements}</g>)
	}

}

export default LabelLayer;