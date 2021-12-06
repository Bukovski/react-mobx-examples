import React from 'react';
import { configure } from 'mobx';
import { Provider } from "mobx-react";

import { Counter, counterState } from "../mini-examples/1.Counter";
import TodoComponent from "../mini-examples/1.HelloTwoStore";
import { NameCounter, nameStore } from "../mini-examples/2.NameCounter";
import { appStore, Controls, TableControls } from "../mini-examples/3.TableControlsAsync";
import { AnimalCounter, giraffe } from "../mini-examples/4.AnimalAutorun";
import { BooksContainer, booksStore } from "../mini-examples/5.BookInject";
import { Birds, singletonBird } from "../mini-examples/5.BirdInject";
import { Home, store, StoreProvider, Username } from "../mini-examples/6.StoreContext";


configure({ enforceActions: 'observed' });


const ExamplesContainer = () => {
	return (
		<div className="examples">
			<Counter store={ counterState } />
			<TodoComponent />
			<NameCounter name={ nameStore } />
			
			<hr/>
			
			<Controls store={ appStore } />
			<TableControls store={ appStore } />
			
			<hr/>
			
			<AnimalCounter animalStore={ giraffe }/>
			
			<hr/>
			
			<Provider
				booksStore={ booksStore }
				BirdStore={ singletonBird } color={ "orange" }
			>
				<BooksContainer />
				
				<hr/>
				
				<Birds />
			</Provider>
			
			<StoreProvider store={ store }>
				<Home />
				
				<hr/>
				
				<Username />
			</StoreProvider>
		</div>
	);
}


export default ExamplesContainer;
