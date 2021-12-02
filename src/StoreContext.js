import React from "react";
import { action, makeObservable, observable } from "mobx";
import { observer } from "mobx-react";

/* Store start */
class Store {
	constructor() {
		this.title = "Coding is Love";
		
		this.user = {
			userId: 1,
			name: "Ranjith kumar V",
			website: "https://codingislove.com",
			email: "ranjith@codingislove.com",
		};
		
		makeObservable(this, {
			title: observable,
			user: observable,
			
			setUser: action,
			updateUser: action,
			clearUser: action,
			setTitle: action
		});
	}
	
	setUser(user) {
		this.user = user;
	}
	
	updateUser(data) {
		this.user = { ...this.user, ...data };
	}
	
	clearUser() {
		this.user = undefined;
	}
	
	setTitle(title) {
		this.title = title;
	}
}

export const store = new Store();
/* Store end */

/* Store helpers */
const StoreContext = React.createContext();

export const StoreProvider = ({ children, store }) => {
	return (
		<StoreContext.Provider value={ store }>{ children }</StoreContext.Provider>
	);
};

/* Hook to use store in any functional component */
export const useStore = () => React.useContext(StoreContext);

/* HOC to inject store to any functional or class component */
export const withStore = (Component) => (props) => {
	return <Component { ...props } store={ useStore() } />;
};




export const Home = withStore(observer((props) => {
	const { store } = props;
	
	const toggleTitle = () => {
		if (store.title === "Coding is Love") {
			store.setTitle("Mobx React Context");
		} else {
			store.setTitle("Coding is Love");
		}
	};
	
	return (
		<div className="App">
			<header className="App-header">
				<a
					className="App-link"
					href="https://codingislove.com"
					target="_blank"
					rel="noopener noreferrer"
				>
					{ store.title }
				</a>
				<button onClick={ toggleTitle } style={{ margin: 20 }}>
					Toggle title
				</button>
			</header>
		</div>
	);
}))


// useStore hook for functional components
export const Username = observer(() => {
	const store = useStore();
	
	return <div style={{ fontSize: 14 }}>- By { store.user.name }</div>;
});
