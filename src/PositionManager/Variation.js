class Variation {

	constructor(name=undefined, game=undefined) {

		this.first_registered_node = undefined;
		this.create_time = new Date();

		this.id = this.create_time.getTime();

		if(name !== undefined)
			this.name = name;
		else {
			this.name = 'variation_' + this.create_time.getTime();
		}

		this.game = game;

	}

	registerFirstNode(node) {
		this.first_registered_node = node;
	}

	clone() {
		var new_obj = new Variation(this.name);

		return new_obj;
	}

	equal(x) {
		return x.name === this.name;
	}

	isInside(var_array) {
		for(let each_var of var_array) {
			if(each_var.name === this.name)
				return true;
		}
		return false;
	}

}

export default Variation;