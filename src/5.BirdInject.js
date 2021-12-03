import React from "react";
import { action, makeAutoObservable } from "mobx";
import { inject, observer } from "mobx-react";


class BirdStore {
	constructor() {
		this.birds = [ 1,4,5 ];
		
		makeAutoObservable(this);
	}
	
	get birdCount() {
		return this.birds.length;
	}
	
	addBird = bird => {
		this.birds.push(bird);
		console.log(bird, this.birds)
	};
}

export const singletonBird = new BirdStore();



export const Birds = inject("BirdStore", "color")(observer((props) => {
	const { BirdStore, color } = props;
	
	let birdInput = null;
	
	const handleSubmit = action(e => {
		e.preventDefault();
		
		const value = birdInput.value;
		
		props.BirdStore.addBird(value);
		
		e.target.reset();
	});
	
	
	return (
		<div>
			<h2>You have { BirdStore.birdCount } birds</h2>
			
			<form onSubmit={ e => handleSubmit(e) }>
				<input
					type="text"
					ref={ input => birdInput = input }
					placeholder="Add a bird"
				/>
			</form>
			
			<ul>
				{ BirdStore.birds.map(bird => (
					<li key={ bird } style={ { background: color } }>{ bird }</li>
				))
				}
			</ul>
		</div>
	);
}))
