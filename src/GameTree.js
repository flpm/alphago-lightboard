import GameNode from './GameNode';
import {sgf_to_coord} from './Utils';

class GameTree {

	constructor(colors) {
		this.colors = colors;

		// the default root is an empty board, so have to set its color to white,
		// so first move is black (alternate colors in array)
		this.root = new GameNode(undefined, {color: colors[1], opposite_color: colors[0]});
		this.leaf = this.root;

		this.weight = Math.round(Math.random(10)*100)

		this.next_to_play = 0;
	}


	switch_color() {
		this.next_to_play = (this.next_to_play + 1) % 2;
	}

	play(coord) {
		this.leaf = this.leaf.createChild({
			coord: coord, 
			color: this.colors[this.next_to_play], 
			opposite_color: this.colors[(this.next_to_play + 1) % 2]
		});
		this.switch_color();
	}

	play_sgf(coord) {
		this.play(sgf_to_coord(coord));
	}

	attach_to(node) {
		//drop the empty root
		if(this.root.child !== undefined) {
			this.root = this.root.child;
			this.root.parent = node;
			node.variations.push(this);
			return(this);
		}
		else
			return(null);
	}

}

export default GameTree;