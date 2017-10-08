class Game {

	constructor(attributes) {

		this.attributes = attributes;

	}

	toShortString() {
		let w_r = '';
		let b_r = '';

		let w = this.attributes.white;
		let b = this.attributes.black;
		let c = '';

		let num = this.attributes.game_num;


		if(this.attributes.white_rank !== null) w_r = ' ' + this.attributes.white_rank;
		if(this.attributes.black_rank !== null) b_r = ' ' + this.attributes.black_rank;

		let res = '';

		if(this.attributes.game_series === 'AlphaGo')
			res = 'AlphaGo ' + num;
		else if(this.attributes.game_series === 'Master') {
			if(w === 'AlphaGo Master') {
				w = '';
				w_r = '';
				c = ' B';
			}
			if(b === 'AlphaGo Master') {
				b = '';
				b_r = '';
				c = ' W';				
			}

			res = 'Master ' + num + ' (' + w + w_r + b + b_r + c + ')';
		}
		else
			res = this.attributes.white + ' vs ' + this.attributes.black;
		return res
	}


	toString() {
		let w_r = '';
		let b_r = '';

		let w = this.attributes.white;
		let b = this.attributes.black;

		let num = this.attributes.game_num;


		if(this.attributes.white_rank !== null) w_r = ' ' + this.attributes.white_rank;
		if(this.attributes.black_rank !== null) b_r = ' ' + this.attributes.black_rank;

		let res = '';

		if(this.attributes.game_series === 'AlphaGo')
			res = 'AlphaGo ' + num + ' - AlphaGo vs AlphaGo';
		else if(this.attributes.game_series === 'Master') {
			if(w === 'AlphaGo Master') {
				w = 'Master';
				w_r = '';
			}
			if(b === 'AlphaGo Master') {
				b = 'Master';
				b_r = '';				
			}

			res = 'Master ' + num + ' - ' + w + w_r + ' vs ' + b + b_r;
		}
		else
			res = this.attributes.white + w_r + ' vs ' + this.attributes.black + b_r;
		return res
	}
}

export default Game;