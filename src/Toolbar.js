import React, { Component } from 'react';

import './Toolbar.css';

class Toolbar extends Component {

	constructor() {
		super();

		this.state = {

		}
	}

	render() {
		return(
			<div>
				<ul className="toolbar">
					<li onClick={() => this.props.onClick('next')}>Next</li>
					<li onClick={() => this.props.onClick('previous')}>Previous</li>
					<li className={(this.props.editMode ? 'selected' : '')} onClick={() => this.props.onClick('edit_mode')}>Edit Mode</li>
					<li className={(this.props.gotoMode ? 'selected' : '')} onClick={() => this.props.onClick('goto_mode')}>Goto Mode</li>
				</ul>
			</div>
		)
	}
}

export default Toolbar;