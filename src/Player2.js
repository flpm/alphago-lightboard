import React, { Component } from 'react';
import Board from './Board/Board';
import Sidebar from './Sidebar';
import StoneLayer from './Board/StoneLayer';
import VariantLabelLayer from './Board/VariantLabelLayer';
import Toolbar from './Toolbar';
import { MASTER_GAMES } from './Master';
import { ALPHAGO_GAMES } from './AlphaGo';
import {
	var_fail_suicide,
	var_fail_suicide_sgf, 
	coord_to_index
} from './Utils';

import PositionTree from './PositionManager/PositionTree';
import Variation from './PositionManager/Variation';
import Game from './PositionManager/Game';
//import GameTree from './GameTree';

import './Player2.css';

class Player2 extends Component {

	constructor() {
		super();

		console.log('constructor: starting...')

		this.viewbox_scale_rect = undefined;

		this.pos_tree = new PositionTree();

		console.log('constructor: pos_tree ', this.pos_tree);
		
		//ALPHAGO vs ALPHAGO
		/*
		this.pos_tree.loadSGFArray(AA_1_W_R, new Variation("Game 1 - W+R"));
		this.pos_tree.goto(0);
		this.pos_tree.loadSGFArray(AA_2_W_R, new Variation("Game 2 - W+R"));
		this.pos_tree.goto(0);
		this.pos_tree.loadSGFArray(AA_3_W_R, new Variation("Game 3 - W+R"));
		this.pos_tree.goto(0);
		this.pos_tree.loadSGFArray(AA_4_W_R, new Variation("Game 4 - W+R"));
		this.pos_tree.goto(0);
		this.pos_tree.loadSGFArray(AA_5_B_R, new Variation("Game 5 - B+R"));
		this.pos_tree.goto(0);
		this.pos_tree.loadSGFArray(AA_6_W_R, new Variation("Game 6 - W+R"));
		this.pos_tree.goto(0);
		this.pos_tree.loadSGFArray(AA_7_W_R, new Variation("Game 7 - W+R"));
		this.pos_tree.goto(0);
		this.pos_tree.loadSGFArray(AA_8_W_R, new Variation("Game 8 - W+R"));
		*/
		// ORIGINAL TEST DATA
		//this.pos_tree.loadSGFArray(sample_game, new Variation("white vs black"));

		// ISSUE: the first load call on the tree should rename the main
		// line, but the variation object passed is ignored (previous line)
		// main line can be renamed easily since it's the main variation of the root
		//this.pos_tree.root.attributes.variations[0].name = "white vs black";

		
		// TEST of multiple variants DEPRECATED
		/*this.pos_tree.goto(5);

		this.pos_tree.loadMoveArray(sample_var_at_5, new Variation('first variation'));

		this.pos_tree.goto(5);

		this.pos_tree.loadMoveArray(sample_var_at_5, new Variation('another one'));
		*/

		// TEST: THIS WILL FAIL BECAUSE OF SUICIDE IN LOAD MOVE FUNCTION
		console.log('constructor: loaded var_fail_suicide', var_fail_suicide);
		//this.pos_tree.goto(0);
		//this.pos_tree.loadMoveArray(var_fail_suicide, new Variation('fail by suicide'));
		
		// TEST: THIS WILL FAIL BECAUSE OF SUICIDE IN LOAD MOVE FUNCTION (SGF VERSION)
		console.log('constructor: loaded var_fail_suicide', var_fail_suicide_sgf);
		//this.pos_tree.goto(0);
		//this.pos_tree.loadSGFArray(var_fail_suicide_sgf, new Variation('fail by suicide'));


		for(let game of MASTER_GAMES) {
			let g = new Game(game);
			console.log('constructor: toString: ' + g.toString());
			//console.log('constructor: loading game: ' + game.sgf_filename);
			this.pos_tree.goto(0);
			this.pos_tree.loadSGFArray(game.sgf_moves, new Variation(g.toShortString(), g));
		}

		console.log('constructor: master games', ALPHAGO_GAMES);

		for(let game of ALPHAGO_GAMES) {
			let g = new Game(game);
			console.log('constructor: toString: ' + g.toString());
			//console.log('constructor: loading game: ' + game.sgf_filename);
			this.pos_tree.goto(0);
			this.pos_tree.loadSGFArray(game.sgf_moves, new Variation(g.toShortString(), g));
		}


		this.state = {
			mouse: {
				board_coord: [undefined, undefined],
			},
			edit_mode: true,
			goto_mode: false,
			current_move: this.pos_tree.root,
			show_move_numbers: true
		}

		this.onMouseMoveBoard = this.onMouseMoveBoard.bind(this);
		this.onClickBoard = this.onClickBoard.bind(this);
		this.setViewboxScale = this.setViewboxScale.bind(this);
		this.onClickToobar = this.onClickToobar.bind(this);
	}

	// Utilities for detecting coordinates in event handlers

	setViewboxScale(viewbox_scale_rect) {
		this.viewbox_scale_rect = viewbox_scale_rect;
	}

	getBoardCoord(screen_x, screen_y) {

		var scale_dim = this.viewbox_scale_rect.getBoundingClientRect();

		var scale_x = scale_dim.width;
    	var scale_y = scale_dim.height;

    	var origin_x = scale_dim.left;
    	var origin_y = scale_dim.top;

    	var board_x = Math.round((screen_x - origin_x) / scale_x);
    	var board_y = Math.round((screen_y - origin_y) / scale_y);

    	if( (board_x < 0 || board_x > 18) || (board_y < 0 || board_y > 18) ) {
    		board_x = board_y = undefined;
    	}

    	return([board_x, board_y])
	}

	// Mouse Event Handlers for the board

	onMouseMoveBoard(e) {

    	var board_coord = this.getBoardCoord(e.clientX, e.clientY)

		this.setState({
			mouse: {
				board_coord: board_coord,
			}
		});
	}

	onMouseOverStone(coord, event_name) {
		if(event_name === 'onMouseEnter') {
			console.log("onMouseOverStone: over variation, coord " + coord.join(","))
		}
	}

	onClickBoard(e) {
		var board_coord = this.getBoardCoord(e.clientX, e.clientY);
		console.log("onClickBoard: board_coord is " + board_coord[0] + ", " + board_coord[1]);

		//Check if click happens on the child or a variation child
		var next_node = this.state.current_move.isChild(board_coord);
		if(next_node !== undefined) {
			console.log('onClickBoard: clicked on a child')
			this.setState({
				current_move: next_node
			})
		}
		else {
			//If not, check if a previous already played move
			/*let node = this.state.current_move.findPrevious(board_coord);
			if(node !== undefined) {
				console.log('onClickBoard: clicked on an ancestor')
				if(this.state.goto_mode) {
					this.setState({
						current_move: node
					})
				}
			}
			// if not, create a new variation if edit mode is on
			else {*/
				console.log('onClickBoard: clicked on an empty space')
				if(this.state.edit_mode) {
					console.log('onClickBoard: edit mode')
					let node = this.state.current_move.play(board_coord);
					if(node !== undefined) {
						console.log('onClickBoard: played at ' + node.attributes.coord)
						this.setState({
							current_move: node
						})
					}
					else {
						console.log('onClickBoard: head.play() returned undefined')
					}
				}
				// if not in edit mode, find a move in the main line forward
				else if(this.state.goto_mode) {
					console.log('onClickBoard: goto mode')
					let node = this.state.current_move.find(board_coord);
					if(node !== undefined) {
						console.log('onClickBoard: clicked on a descendant')
						this.setState({
							current_move: node
						})
					}
				}
			//}
		}
	}

	onClickToobar(tool) {
		let new_node = this.state.current_move;
		if(tool === 'next') {
			console.log('onClickToobar: clicked next');
			new_node = this.state.current_move.next();
			this.setState({
				current_move: new_node
			})
		}
		else if(tool === 'previous') {
			console.log('onClickToobar: clicked previous');
			new_node = this.state.current_move.previous();
			this.setState({
				current_move: new_node
			}) 
		}
		else if(tool === 'edit_mode') {
			this.setState({
				edit_mode: !this.state.edit_mode
			})
			console.log('onClickToobar: edit mode was',this.state.edit_mode); 
		}
		else if(tool === 'goto_mode') {
			this.setState({
				goto_mode: !this.state.goto_mode
			})
			console.log('onClickToobar: goto_mode was', this.state.goto_mode);
		}
		else {
			console.warn("Player.onClickToobar: click on toolbar without 'tool' parameter set")
		}
		console.log('onClickToobar: variation array ', new_node.attributes.variations);
		console.log('onClickToobar: board looks like\n' + new_node.getPositionAsString());
		console.log('onClickToobar: head', new_node)
	}

	componentDidUpdate() {

	}


	render() {

		//var BLUE = "_blue";
		//var BLUE = " blue_border";

		// CREATE LABEL FOR MOVES
		var move_numbers = [];
		if(this.state.show_move_numbers) {
			move_numbers = this.state.current_move.getMoveLabelArray();
		}
		
		var stone_layer = new StoneLayer({content: this.state.current_move.position, labels: move_numbers});

		//console.log('render: current_move.position\n' + 
		//	this.state.current_move.getPositionAsString(this.state.current_move.position));
		//console.log('render: current_move.attributes', this.state.current_move.attributes);

		var board_layers = [];

		board_layers.push(stone_layer);

		// CREATE VARIATION ENTRY POINTS

		if(this.state.current_move.children.length > 1) {

			var variation_label_content = [];
			var variation_label_text = [];
			//var variation_arc_values = [];
			const NUM_TO_LABEL = " ABCDEFGHIJKLMNOPQRSTUVWXYZ";

			let label_counter = 0;
			for(let child of this.state.current_move.children) {
				label_counter += 1;
				if(child === undefined) continue;
				let child_coord = child.attributes.coord;
				let child_color = child.attributes.color;
				variation_label_content[coord_to_index(child_coord)] = "variant_" + child_color;
				variation_label_text[coord_to_index(child_coord)] = NUM_TO_LABEL[label_counter] || "?";
				//variation_arc_values[coord_to_index(child_coord)] = 0;
			}

			var variation_layer = new VariantLabelLayer(
				{content: variation_label_content,
				 labels: variation_label_text,
				 arcValues: undefined,
				 mouseEvent: this.onMouseOverStone});
			board_layers.push(variation_layer);

		}

		/*
		if(this.state.current_move.variations.length !== 0) {

			var variation_label_content = [];
			var variation_label_text = [];
			var variation_arc_values = [];
			const NUM_TO_LABEL = "BCDEFGHIJKLMNOPQRSTUVWXYZ";

			// Add first move on each variation
			for(let i=0; i < this.state.current_move.variations.length; i++) {
				let first_node = this.state.current_move.variations[i].root;
				let variation_weight = this.state.current_move.variations[i].weight;
				let coord = first_node.attributes.coord;
				let color = first_node.attributes.color;
				variation_label_content[coord_to_index(coord)] = "variant_" + color;
				variation_label_text[coord_to_index(coord)] = NUM_TO_LABEL[i] || "?";
				variation_arc_values[coord_to_index(coord)] = variation_weight;
			}

			// Add main line next move
			let child_coord = this.state.current_move.child.attributes.coord;
			let child_color = this.state.current_move.child.attributes.color;
			variation_label_content[coord_to_index(child_coord)] = "variant_" + child_color;
			variation_label_text[coord_to_index(child_coord)] = "A";
			variation_arc_values[coord_to_index(child_coord)] = 0;

			var variation_layer = new VariantLabelLayer(
				{content: variation_label_content,
				 labels: variation_label_text,
				 arcValues: variation_arc_values,
				 mouseEvent: this.onMouseOverStone});
			board_layers.push(variation_layer);

		}

		*/

		//const DebugVarListItem = this.state.current_move.attributes.variations.map(
		//	(v) => <li key={v.name}>{v.name}</li>
		//);

		//const variation_list_string = this.state.current_move.attributes.variations.map(
		//	(v) => v.name
		//).join(", ");
		/*
				<div className='debug_box'>
					<p className="debug"> <u>DEBUG INFORMATION:</u></p>
					<p className="debug">
						current move: {this.state.current_move.getMoveNumber()}
					</p>
					<p className="debug">
						board: [{this.state.mouse.board_coord.join(",")}] 
					</p>

				</div>
		*/


		return(
			<div>
				
				<div className="main">
					<div className="main_content">
						<div className="board_content">
							<Toolbar editMode={this.state.edit_mode} 
								gotoMode={this.state.goto_mode} 
								onClick={this.onClickToobar}/>
							<Board showCoords={true}
								layers={board_layers} 
								onMouseMove={this.onMouseMoveBoard}
								onClick={this.onClickBoard}
								setViewboxScale={this.setViewboxScale}
								showCursor={true}
								cursor={this.state.mouse.board_coord} 
							/>
						</div>
						<div className="sidebar_content">
							<Sidebar currentMove={this.state.current_move}/>
						</div>
					</div>
				</div>
			</div>
			)
	}
}

export default Player2;