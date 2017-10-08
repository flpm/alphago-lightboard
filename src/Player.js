import React, { Component } from 'react';
import Board from './Board/Board';
import StoneLayer from './Board/StoneLayer';
//import LabelLayer from './Board/LabelLayer';
import VariantLabelLayer from './Board/VariantLabelLayer';
//import HaloLayer from './Board/HaloLayer';
import Toolbar from './Toolbar';
import GameTree from './GameTree';
import {B, W, sample_game, sample_var_at_5, coord_to_index} from './Utils';

import './Player.css';

class Player extends Component {

	constructor() {
		super();

		this.viewbox_scale_rect = undefined;

		this.game = new GameTree([B, W]);
		for(let i of sample_game) {
			this.game.play_sgf(i);
		}

		var insert_point = this.game.root.goto(5);

		var variation = new GameTree([W, B], true);
		for(let i of sample_var_at_5) {
			variation.play(i);
		}

		console.log(insert_point.getMove());
		console.log(insert_point.goto(22).get_position_as_string());

		variation.attach_to(insert_point);
		
		console.log(variation.leaf.getMove());

		console.log(insert_point.get_position_as_string());


		this.state = {
			mouse: {
				board_coord: [undefined, undefined],
			},
			edit_mode: true,
			goto_mode: false,
			current_move: this.game.root,
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
			console.log("Over variation, coord " + coord.join(","))
		}
	}

	onClickBoard(e) {
		var board_coord = this.getBoardCoord(e.clientX, e.clientY);
		console.log("click: " + board_coord[0] + ", " + board_coord[1]);

		//Check if click happens on the child or a variation child
		var next_node = this.state.current_move.selectVariation(board_coord);
		if(next_node !== undefined) {
			this.setState({
				current_move: next_node
			})
		}
		else {
			//If not, check if a previous already played move
			let node = this.state.current_move.find_previous(board_coord);
			if(node !== undefined) {
				if(this.state.goto_mode) {
					this.setState({
						current_move: node
					})
				}
			}
			// if not, create a new variation if edit mode is on
			else {
				if(this.state.edit_mode) {
					let node = this.state.current_move.createVariation(board_coord);
					if(node !== undefined) {
						this.setState({
							current_move: node
						})
					}
				}
				// if not in edit mode, find a move in the main line forward
				else if(this.state.goto_mode) {
					let node = this.state.current_move.find(board_coord);
					if(node !== undefined) {
						this.setState({
							current_move: node
						})
					}
				}
			}
		}
	}

	onClickToobar(tool) {
		if(tool === 'next') {
			console.log('clicked next');
			this.setState({
				current_move: this.state.current_move.next()
			})
		}
		else if(tool === 'previous') {
			console.log('clicked previous');
			this.setState({
				current_move: this.state.current_move.previous()
			}) 
		}
		else if(tool === 'edit_mode') {
			this.setState({
				edit_mode: !this.state.edit_mode
			})
			console.log(this.state.edit_mode); 
		}
		else if(tool === 'goto_mode') {
			this.setState({
				goto_mode: !this.state.goto_mode
			})
			console.log(this.state.goto_mode);
		}
		else {
			console.warn("Click on toolbar without 'tool' parameter set")
		}
		console.log(this.state.current_move.get_position_as_string());
	}

	componentDidUpdate() {

	}


	render() {

		//var BLUE = "_blue";
		//var BLUE = " blue_border";

		// CREATE LABEL FOR MOVES
		var move_numbers = [];
		if(this.state.show_move_numbers) {
			move_numbers = this.state.current_move.getMoveLabels();
		}
		
		var stone_layer = new StoneLayer({content: this.state.current_move.getPosition(), labels: move_numbers});

		var board_layers = [];

		board_layers.push(stone_layer);

		// CREATE VARIATION ENTRY POINTS
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




		return(
			<div>
				<div className='debug_box'>
					<p className="debug">board: [{this.state.mouse.board_coord.join(",")}] </p>
					<p className='debug'>move: {this.state.current_move.move}</p>
				</div>
				<Toolbar editMode={this.state.edit_mode} gotoMode={this.state.goto_mode} onClick={this.onClickToobar}/>
				<div>
					<Board showCoords={true}
						layers={board_layers} 
						onMouseMove={this.onMouseMoveBoard}
						onClick={this.onClickBoard}
						setViewboxScale={this.setViewboxScale}
						showCursor={true}
						cursor={this.state.mouse.board_coord} />
				</div>
			</div>
			)
	}
}

export default Player;