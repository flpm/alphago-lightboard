import React from "react";
import Layer from "./Layer";
import Halo from "./Halo";

import './HaloLayer.css';

class HaloLayer extends Layer{
	
	constructor({content, layerClass=''} = {}) {
		super('halo')
		this.content = content;
		this.layerClass = layerClass;
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

					layer_elements.push(<Halo key={'L'+i+'X'+x+"Y"+y} coord={[x,y]} halo_class={stone_class}/>);
				}
			}
		return(<g key={this.content.join('-')} className={this.layerClass}>{layer_elements}</g>)
	}

}

export default HaloLayer;