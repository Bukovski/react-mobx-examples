import React from 'react';
import { action, computed, observable, makeObservable, runInAction, flow } from 'mobx';
import { observer } from "mobx-react";



class Store {
	devsList;
	filter;
	
	constructor() {
		this.devsList = [
			{ id: 1, name: "Jack", sp: 12 },
			{ id: 2, name: "Max", sp: 10 },
			{ id: 3, name: "Leo", sp: 8 },
		];
		this.filter = "";
		
		makeObservable(this, { // описываем все свойства отдельно
			devsList: observable,
			filter: observable,
			totalSum: computed,
			topPerformer: computed,
			filteredDevelopers: computed,
			clearList: action,
			addDeveloper: action,
			updateFilter: action,
			getUser: action.bound,
			getUserFlow: flow
		})
	}
	
	
	get totalSum() {
		return this.devsList.reduce((sum, { sp }) => sum += sp, 0);
	};
	
	get topPerformer() {
		const maxSp = Math.max(...this.devsList.map(({ sp }) => sp));

		return this.devsList.find(({ sp, name }) => {
			if (maxSp === sp) {
				return name;
			}
			
			return false;
		});
	};
	
	get filteredDevelopers() {
		const matchesFilter = new RegExp(this.filter, "i");
		
		return this.devsList.filter(({ name }) => !this.filter || matchesFilter.test(name));
	}
	
	clearList() {
		this.devsList = [];
	};
	
	addDeveloper(dev) {
		this.devsList.push(dev);
	};
	
	updateFilter(value) {
		this.filter = value;
	}
	
	getUser() {
		fetch('https://randomuser.me/api/')
			.then(res => res.json())
			.then(json => {
				if(json.results) {
					const { name, login, dob } = json.results[ 0 ]
					const fetchUser = { id: login.uuid, name: name.first, sp: dob.age  };
					
					// this.addDeveloper(fetchUser) // ок работает
					
					runInAction(() => { // ок. Если не хотим выносить логику в отдельный action то используем встроенный runInAction
						this.devsList.push(fetchUser);
					})
				}
			})
	}
	
	*getUserFlow() {
		const response = yield fetch('https://randomuser.me/api/')
		const json = yield response.json()
		
		if(json.results) {
			const { name, login, dob } = json.results[ 0 ]
			const fetchUser = { id: login.uuid, name: name.first, sp: dob.age  };
			
			// this.addDeveloper(fetchUser) // ок работает
			
			runInAction(() => { // ок. Если не хотим выносить логику в отдельный action то используем встроенный runInAction
				this.devsList.push(fetchUser);
			})
		}
	}
}


export const appStore = new Store();

/*****/

const Row = ({ data: { name, sp } }) => {
	return (
		<tr>
			<td>{name}</td>
			<td>{sp}</td>
		</tr>
	);
};

export const TableControls = observer((props) => {
	const { store } = props;
	
	return (
		<table>
			<thead>
			<tr>
				<td>Name:</td>
				<td>SP:</td>
			</tr>
			</thead>
			<tbody>
			{
				store.filteredDevelopers.map((dev) =>
					<Row key={ dev.id } data={ dev } />)
			}
			</tbody>
			<tfoot>
			<tr>
				<td>Team SP:</td>
				<td>{ store.totalSum }</td>
			</tr>
			<tr>
				<td>Top Performer:</td>
				<td>{
					store.topPerformer
						? store.topPerformer.name
						: ''
				}</td>
			</tr>
			</tfoot>
		</table>
	);
})

/*****/

export const Controls = observer((props) => {
	const addDeveloper = () => {
		const name = prompt("The name:");
		const sp = parseInt(prompt("The story points:"), 10);
		
		props.store.addDeveloper({ name, sp });
	}
	
	const clearList = () => { props.store.clearList() }
	
	const filterDevelopers = ({ target: { value } }) => {
		props.store.updateFilter(value);
	}
	
	return (
		<div className="controls">
			<button onClick={ clearList }>Clear table</button>
			<button onClick={ addDeveloper }>Add record</button>
			<button onClick={ props.store.getUser }>Get User Async</button>
			<button onClick={ () => props.store.getUserFlow() }>Get User Flow</button>
			<input value={ props.store.filter } onChange={ filterDevelopers } />
		</div>
	);
})