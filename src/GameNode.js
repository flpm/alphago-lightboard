import {B, W, coord_to_index, HOSHI_INDEX, compare_coord} from './Utils';
import GameTree from './GameTree';

class GameNode {

	constructor(parent = undefined, attributes = {}) {
		this.parent = parent;
		this.child = undefined;
		this.variations = [];
		this.selected_variation = undefined;
		//this.position = [];
		this.attributes = attributes;

		if(parent !== undefined) {
			var new_position = this.parent.getPosition().slice();
			new_position[coord_to_index(this.attributes.coord)] = this.attributes.color;
			this.position = new_position;
		}
	}

	getMove() {
		var node = this;
		var depth = 0;
		while(node.parent !== undefined) {
			node = node.parent;
			depth += 1;
		}
		return(depth);
	}

	getMoveLabels() {
		var move_label_position = [];

		var node = this;
		while(node.parent !== undefined) {
			move_label_position[coord_to_index(node.attributes.coord)] = node.getMove();
			node = node.parent;
		}
		return move_label_position;
	}

	getPosition() {
		var position = [];

		var node = this;
		while(node.parent !== undefined) {
			position[coord_to_index(node.attributes.coord)] = node.attributes.color;
			node = node.parent;
		}
		return position;
	}

	createChild(attributes = {}) {
		var new_node = new GameNode(this, attributes);
		this.child = new_node;

		return new_node;
	}

	createVariation(board_coord) {
		var new_node;

		if(this.child !== undefined) {
			console.log('create new variation: ' + this.attributes.opposite_color + ' at ' + board_coord);
			var v = new GameTree([this.attributes.opposite_color, this.attributes.color]);
			v.play(board_coord);
			console.log(v);
			v.attach_to(this);
			new_node = this.selectVariation(board_coord);
		}
		else {
			console.log('no child, create in main line: ' + this.attributes.opposite_color + ' at ' + board_coord);
			new_node = new GameNode(this, {color: this.attributes.opposite_color, opposite_color: this.attributes.color, coord: board_coord});
			this.child = new_node;
		}

		return new_node;
	}

	selectVariation(board_coord) {
		// verify if the board_coord correspond to the main line
		// or one of this node's variation, return the next node
		// or undefined if no match
		if(this.child !== undefined) {
			var main_coord = this.child.attributes.coord;
			if(compare_coord(main_coord, board_coord)) {
				console.log("click: child");
				this.selected_variation = undefined;
				return this.child;
			}
			else {
				for(let i = 0; i < this.variations.length; i++) {
					let var_coord = this.variations[i].root.attributes.coord;
					if(compare_coord(var_coord, board_coord)) {
						console.log("click: variation " + i);
						this.selected_variation = this.variations[i].root;
						return this.variations[i].root;
					}
				}
			}
		}
		return undefined;
	}

	next() {
		if(this.selected_variation !== undefined) {
			return this.selected_variation;
		}
		else 
			if(this.child !== undefined) {
				return this.child;
			}
			else {
				return this;
			}
	}

	getLeaf() {
		var node = this;
		while(node.next() !== node){
			node = node.next();
		}
		return node;
	}

	previous() {
		if(this.parent !== undefined) {
			return this.parent;
		}
		else {
			return this;
		}
	}


	// tree traversal from this node

	find(coord) {

		// find the last move in the current line
		var node = this.getLeaf();
		if(compare_coord(node.attributes.coord, coord)) {
			return node;
		}

		// look for coord on the way up to the root
		while(node.parent !== undefined) {
			node = node.parent;
			if(compare_coord(node.attributes.coord, coord)) {
				return node;
			}
		}
		return undefined;
	}

	find_previous(coord) {

		// find from this move to the root
		var node = this

		// look for coord on the way up to the root
		while(node.parent !== undefined) {
			node = node.parent;
			if(compare_coord(node.attributes.coord, coord)) {
				return node;
			}
		}
		return undefined;
	}

	goto(move) {

		// check the last move in the current line
		var node = this.getLeaf();
		if(node.getMove() === move) {
			return node;
		}

		// go back to the root checking
		while(node.parent !== undefined) {
			node = node.parent;
			if(node.getMove() === move) {
				return node;
			}
		}
		return undefined;
	}



	// debug
	
	get_position_as_string() {
		var res = '';
		var pos = this.getPosition().slice();

		for(let p of this.variations) {
			let pc = p.root.attributes.coord;
			pos[coord_to_index(pc)] = "V";
		}

		if(this.child !== undefined)
			pos[coord_to_index(this.child.attributes.coord)] = "C";

		for(let i=0;i < 361; i++) {
			if(i % 19 === 0) {
				res += "\n";
			}
			if(pos[i] === undefined) {
				if(HOSHI_INDEX.includes(i))
					res +="+ ";
				else
					res += "- ";
			}
			else {
				if(pos[i] === B) {
					res += 'B ';
				}
				else if(pos[i] === W) {
					res += 'W ';
				}
				else if(pos[i] === "V") {
					res += 'o ';
				}
				else if(pos[i] === "C") {
					res += '# ';
				}
				else {
					res += "? ";
				}
			}
		}
		return(res)
	}
	
}

export default GameNode;