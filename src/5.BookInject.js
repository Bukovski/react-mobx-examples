import React, { useState } from "react";
import { action, makeAutoObservable, makeObservable, observable } from 'mobx';
import { inject, observer } from "mobx-react";


class BooksStore {
	constructor() {
		this.books = [];
		
		makeObservable(this, {
			books: observable,
			addBook: action,
			removeBook: action
		});
	}
	
	addBook = (book) => {
		this.books.push(book)
	}
	
	removeBook = (index) => {
		this.books.splice(index, 1)
	}
}

export const booksStore = new BooksStore();


export const BooksContainer = inject([ "booksStore" ])(observer(({ booksStore }) => {
	const [ newBook, setNewBook ] = useState('');
	
	const addNewBook = () => {
		if (!newBook) return;
		
		booksStore.addBook(newBook);
		
		setNewBook("");
	}
	
	return (
		<div>
			{
				booksStore.books.map((book, index) => (
					<h1
						key={ index }
						onClick={ () => booksStore.removeBook(index) }
					>
						{ book }
					</h1>
				))
			}
			
			<input
				type="text"
				value={ newBook }
				onChange={ (e) => setNewBook(e.target.value) }
			/>
			<button onClick={ addNewBook }>add</button>
		</div>
	)
	
}));