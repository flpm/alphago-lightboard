import {
	B, W, LIBERTY, 
	//to_human_coord, 
	coord_to_index, 
	HOSHI_INDEX, 
	compare_coord, 
	invert_color, 
	same_positions} from '../Utils';
import Variation from './Variation';

class PositionNode {

	constructor(parent = undefined, attributes = undefined) {
		this.parent = parent;
		if(parent !== undefined) {
			this.tree = parent.tree;
		}

		this.children = [];
		this.selected_child = undefined;
		this.position = [];

		if(attributes === undefined) {
			this.attributes = {
				color: undefined,
				coord: undefined,
				variations: []
			}
		}
		else
			this.attributes = attributes;
	}

	setTree(tree) {
		this.tree = tree;
	}

	//////
	// METHODS FOR THE BOARD
	//////


	// Return the move number of this position
	getMoveNumber() {
		var node = this;
		var depth = 0;
		while(node.parent !== undefined) {
			node = node.parent;
			depth += 1;
		}
		return(depth);
	}


	// Return a position array that can be passed to the Board for drawing the stones
	getPositionArray() {
		var position = [];

		/*var node = this;
		while(node.parent !== undefined) {
			position[coord_to_index(node.attributes.coord)] = node.attributes.color;
			node = node.parent;
		}*/

		if(this.parent !== undefined) {
			//position = this.parent.getPositionArray();
			position = this.parent.position.slice();
			position[coord_to_index(this.attributes.coord)] = this.attributes.color;

		}

		return position;
	}

	nextToPlay() {
		return invert_color(this.attributes.color);
	}


	/************* WORK IN PROGRESS **************/


	// detect if a group of stones of color at coord exists
	// map will have the location of the group stones and its
	// edges in the same format as the position array
	detectGroup(position, coord, color, map) {

		let i_color = invert_color(color);
		let [x,y] = coord;
		let index = coord_to_index(coord);

		//let h_coord = to_human_coord(coord);

		if(x < 0 || x > 18 || y < 0 || y > 18) {
			//console.log('detectGroup: checking ' + h_coord + ' [' + coord + ']');
			return false;
		}

		if(map[index] !== undefined) {
			return false;
		}

		if(position[index] === i_color) {
			map[index] = i_color;
			//console.log('detectGroup: checking ' + h_coord + ': (i_color) ' + i_color + '. Finished.');
			return false;
		}
		
		if(position[index] === undefined ) {
			map[index] = LIBERTY;
			//console.log('detectGroup: checking ' + h_coord + ': liberty');
			return false;
		}

		map[index] = color;
		//console.log('detectGroup: checking ' + h_coord + ': (color) ' + color + '. Will continue.');

		this.detectGroup(position, [x-1, y], color, map);
		this.detectGroup(position, [x+1, y], color, map);
		this.detectGroup(position, [x, y-1], color, map);
		this.detectGroup(position, [x, y+1], color, map);

		return true;

	}

	// check if node is a suicide
	checkSuicide(node) {
		let position = node.position;
		let [x,y] = node.attributes.coord;
		let color = node.attributes.color;
		let thisGroup = [];

		//console.log('checkSuicide: ' + color + ' at ' + to_human_coord([x,y]));
		// eslint-disable-next-line
		let res = this.detectGroup(position, [x, y], color, thisGroup);
		//console.log('checkSuicide: detectGroup returns ' + res + ' thisGroup\n' + this.getPositionAsString(thisGroup));
		
		let num_liberties = thisGroup.map(x => x === LIBERTY).reduce((n,v) => n + v);
		if(num_liberties === 0) {
			//console.log('checkSuicide: **** SUICIDE ****');
			return true;
		}
		return false;
	}

	// check if playing node will lead to capturing any of the 4 neighbors
	checkCaptures(node, neighbor="left", res_pos) {
		let position = res_pos;
		let [x,y] = node.attributes.coord;
		let color = node.attributes.color;
		let i_color = invert_color(color);
		let map = [];
		map[coord_to_index([x,y])] = color;

		if(neighbor === 'left')
			x-=1;
		else if(neighbor === 'right')
			x+=1;
		else if(neighbor === 'top')
			y-=1;
		else if(neighbor === 'bottom')
			y+=1;

		let found_group = this.detectGroup(position, [x, y], i_color, map);
		if(found_group) {
			let num_liberties = map.map(x => x === LIBERTY).reduce((n,v) => n + v);
			if(num_liberties === 0) {
				//console.log('checkCaptures: **** CAPTURE HAPPENED ****');
				//console.log('checkCaptures: checking ' + neighbor + "\n" + this.getPositionAsString(map));
				
				// remove capture group from res_pos
				for(let i = 0; i < map.length; i++) {
					if(map[i] === i_color) {
						//console.log('captured index: ' + i)
						res_pos[i] = undefined;
					}
				}

				return true;
			}
		}
		return false;
	}



	/********************************************/




	// Return a label array with the move numbers that lead to this position
	//   that can be passed to the Board for drawing
	getMoveLabelArray() {
		var move_label_position = [];

		var node = this;
		while(node.parent !== undefined) {
			if(move_label_position[coord_to_index(node.attributes.coord)] === undefined) {
				move_label_position[coord_to_index(node.attributes.coord)] = node.getMoveNumber();
			}
			node = node.parent;
		}
		return move_label_position;
	}

	//////
	// METHODS MOVING AROUND THE TREE
	//////

	// Moves to the next position in the current line
	next() {
		if(this.selected_child !== undefined) {
			//console.log('next: returning selected_child')
			return this.selected_child;
		}
		else 
			if(this.children.length > 0 && this.children[0] !== undefined) {
				//console.log('next: returning first child not selected_child')
				return this.children[0];
			}
			else {
				//console.log('next: returning self')
				return this;
			}
	}

	// Moves to the previous position in the current line
	previous() {
		if(this.parent !== undefined) {
			//console.log('previous: returning parent')
			return this.parent;
		}
		else {
			//console.log('previous: returning self')
			return this;
		}
	}

	goto(move_number) {

		// start in the last move in the current line
		var node = this.getLeaf();
		if(node.getMoveNumber() === move_number) {
			return node;
		}

		// go back to the root checking
		while(node.parent !== undefined) {
			node = node.parent;
			if(node.getMoveNumber() === move_number) {
				return node;
			}
		}
		return undefined;
	}

	//////
	// METHODS FOR SEARCHING
	//////

	// Return the root
	getRoot() {
		var node = this;
		while(node.previous() !== node){
			node = node.previous();
		}
		return node;
	}

	// Return the leaf of the current line
	getLeaf() {
		//console.log('getLeaf: called')
		var node = this;
		while(node.next() !== node){
			node = node.next();
		}
		return node;
	}

	// Search for a node in the main line corresponding to coord
	find(coord) {

		// start in the last move in the current line
		var node = this.getLeaf();
		if(compare_coord(node.attributes.coord, coord)) {
			return node;
		}

		// look for coord on the way up to the root
		while(node.parent !== undefined) {
			node = node.parent;
			if(compare_coord(node.attributes.coord, coord)) {
				//console.log('find: found a node (' + node.getMoveNumber() + ')');
				return node;
			}
		}
		//console.log('find: returning undefined');
		return undefined;
	}


	// check if the coord is occupied in the current position
	isOnPosition(coord) {
		let pos = this.position.slice();
		if(pos[coord_to_index(coord)] === undefined) {
			return false;
		}
		return true;
	}


	addVariation(v) {
		this.tree.registerVariation(v, this);
		this.attributes.variations.push(v);
	}


	play(coord, variation=undefined, force_variation=false) {

		//let h_coord = to_human_coord(coord)

		//console.log('play: >>> started');
		//console.log('play: attempting to play at ' + h_coord + '');

		// check if the coord is occupied in this position
		//console.log(this.getPositionAsString());
		if(this.isOnPosition(coord)) {
			//console.log('play: returning undefined, ' + h_coord + ', already has a stone');
			return undefined;
		}

		// if this is the root add this variation to this as well
		if(this.parent === undefined) {
			this.attributes.variations.push(variation);
		}

		// check if the move corresponds to an existing child,
		// select and return that child
		for(let child of this.children) {
			if(compare_coord(child.attributes.coord, coord)) {
				if(variation !== undefined) {
					if(!variation.isInside(child.attributes.variations)) {
						//console.log('play: adding a new variation to existing child');
						child.addVariation(variation);
					}
				}
				//console.log('play: returning existing child');
				return child;
			}
		}

		// create the new node
		var new_attributes = {
			coord: coord, 
			color: invert_color(this.attributes.color),
			variations: []
		}
		var new_node = new PositionNode(this, new_attributes);

		// REMOVE CAPTURES 
		let position = new_node.getPositionArray().slice();

		if(this.checkCaptures(new_node, 'left', position)) {
			//console.log('play: resolved position:\n' + this.getPositionAsString(position));
		}
		if(this.checkCaptures(new_node, 'right', position)) {
			//console.log('play: resolved position:\n' + this.getPositionAsString(position));
		}
		if(this.checkCaptures(new_node, 'top', position)) {
			//console.log('play: resolved position:\n' + this.getPositionAsString(position));
		}
		if(this.checkCaptures(new_node, 'bottom', position)) {
			//console.log('play: resolved position:\n' + this.getPositionAsString(position));
		}

		// add the resolved position to the new node
		new_node.position = position;
		/*console.log('play: set_position for new node\n' +
			this.getPositionAsString(new_node.position));

		console.log('play: getPositionArray() for new node\n' +
			this.getPositionAsString(new_node.getPositionArray()));*/


		// CHECK FOR SUICIDE
		if(this.checkSuicide(new_node)) {
			//console.log('play: returning undefined, ' + h_coord + ' is a suicide move!');
			return undefined;
		}


		// CHECK FOR KO RULE VIOLATION
		if(this.parent !== undefined) {
			if(same_positions(new_node.position, this.parent.position)) {
				//console.log('play: returning undefined, ' + h_coord + ' violate Ko rule!');
				return undefined;
			}
		}

		// prepare the proper variation label for the new node
		let new_node_variation = new Variation();

		// create undefined first born if necessary
		// to avoid adding moves to the main line after the initial main line
		if(this.children.length === 0 && force_variation)
			this.children.push(undefined)

		// if first child, then use own main (first) variation
		if(this.children.length === 0) {
			//console.log('play: new node inherits variation from parent')
			new_node_variation = this.attributes.variations[0];
		}
		else {
			// if a variation was supplied, use it instead of default
			if(variation !== undefined) {
				new_node_variation = variation;
			}
		}
		new_node.addVariation(new_node_variation);

		//push the new node into the children array
		this.children.push(new_node);
		//console.log('play: new node created: ' + new_attributes.color + ' at ' + h_coord);
		//console.log('play: returning a new node');

		return new_node;

	}




	//////
	// METHODS FOR CLICKING AND MOVING AROUND THE TREE
	//////

	isChild(board_coord) {
		// verify if the board_coord correspond to the main line
		// or one of this node's variation, return the next node
		// or undefined if no match

		//console.log("isChild: children array", this.children)
		for(let child of this.children) {
			//console.log("isChild: board_coord=" + board_coord + " child=" + child.attributes.coord)
			if(compare_coord(child.attributes.coord, board_coord)) {
				//console.log("isChild: clicked on a child");
				this.selected_child = child;
				return this.selected_child;
			}
		}

		return undefined;
	}




	//////
	// METHODS FOR DEBUGGING
	//////

	getPositionAsString(pos = undefined) {
		var res = ' A B C D E F G H J K L M N O P Q R S T';

		if(pos === undefined) {
			pos = this.position.slice();

			for(let i=0; i < this.children.length; i++) {
				let label = i
				if(i > 9)
					label = "O"
				let child_coord = this.children[i].attributes.coord;
				pos[coord_to_index(child_coord)] =  label;
			}
		}
		
		//console.log('getPositionAsString: position array ', pos)

		for(let i=0; i < 361; i++) {
			if(i % 19 === 0) {
				res += "\n ";
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
				else if(pos[i] === LIBERTY) {
					res += '# ';
				}
				else if(pos[i] === "O") {
					res += 'o ';
				}
				else {
					res += pos[i] + " ";
				}
			}
		}
		return(res)
	}


}

export default PositionNode;