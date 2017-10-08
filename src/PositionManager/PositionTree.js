import PositionNode from './PositionNode';
import {sgf_to_coord, invert_color, to_human_coord} from '../Utils';

class PositionTree {

	constructor() {
		this.root = new PositionNode(undefined);
		this.root.setTree(this);
		this.head = this.root;
		this.variations = [];
	}

	/////
	// AUX FUNCTIONS
	/////

	nextToPlay() {
		return invert_color(this.head.atrributes.color)
	}


	/////
	// MOVE THE HEAD
	/////

	goto(move_number) {
		this.head = this.root.goto(move_number);
	}


	/////
	// PLAY SINGLE MOVES
	/////

	play(board_coord) {
		this.head = this.head.play(board_coord);
	}


	/////
	// LOAD MULTIPLE MOVES
	/////

	loadSGFArray(sgf_array, variation=undefined) {

		this.loadMoveArray(sgf_array.map(x => sgf_to_coord(x)), variation);

		//for(let each_move of sgf_array) {
		//	this.head = this.head.play(sgf_to_coord(each_move), variation);
		//}
	}

	loadMoveArray(sgf_array, variation=undefined) {
		let play_result;
		
		for(let each_move of sgf_array) {
			play_result = this.head.play(each_move, variation);
			if(play_result !== undefined) {
				this.head = play_result;
			}
			else{
				throw new Error('loadMoveArray: ' + this.head.nextToPlay() + ' AT ' + to_human_coord(each_move) + ' FAILED!\n' +
					this.head.getPositionAsString());
			}
		}
	}

	/////
	// MANAGE VARIATIONS
	/////

	registerVariation(v, node) {

		if(!v.isInside(this.variations)) {
			//console.log('registerVariation: current register', this.variations.slice());
			//console.log('registerVariation: registering ', v);
			v.registerFirstNode(node);
			this.variations.push(v);
		}
	}

}

export default PositionTree;