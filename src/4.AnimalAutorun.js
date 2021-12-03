import React from "react";
import { makeAutoObservable, autorun, when, reaction } from "mobx";
import { observer } from "mobx-react";


class Animal {
	name
	energyLevel
	
	constructor(name) {
		this.name = name
		this.energyLevel = 100
		
		makeAutoObservable(this);
		
		// полезно чтобы отменять наблюдения после определенных событий
		when(
			() => this.energyLevel < -10, // когда вернет true
			() => { console.log('when: Count value is more than -10') } // отработает второй аргумент when. Перестанет наблюдаться когда выполниться первый раз
		);
		
		when(
			// Once...
			() => this.isVisible,
			// ... then.
			() => this.dispose()
		)
	}
	
	reduceEnergy() {
		this.energyLevel -= 10
	}
	
	dispose() {
		this.energyLevel = 100
	}
	
	get isHungry() {
		return this.energyLevel < 50
	}
	
	get isVisible() {
		// Indicate whether this item is visible.
		return this.energyLevel < -20
	}
	
}

const giraffe = new Animal("Gary")

// Это необходимо для таких ситуаций, как ведение журнала, сохранение или обновление пользовательского интерфейса кода.
// запускается 1 раз сразу и каждый раз когда изменяется одна из ее зависимостей
autorun(() => {
		console.log("autorun 1: Energy level with delay:", giraffe.energyLevel)
	},
	{ // настройки не обязательны
		name: 'Custom async autorun', // имя для дебага
		delay: 3000, // задержка перед вызовом
	})

autorun(() => {
	if (giraffe.isHungry) {
		console.log("autorun: Now I'm hungry!")
	} else {
		console.log("autorun: I'm not hungry!")
	}
})

// принимает данные за изменением которых следит
// после изменения данных вызывает callback function
// отрабатывает каждый раз когда отрабатывает отслеживаемая функция / данные
reaction(
	() => giraffe.isHungry,
	isHungry => {
		if (isHungry) {
			console.log("reaction: Now I'm hungry!")
		} else {
			console.log("reaction: I'm not hungry!")
		}
		
		console.log("reaction: Energy level:", giraffe.energyLevel)
	}
)


const AnimalCounter = observer((props) => {
	const { name, energyLevel, isHungry } = props.animalStore;
	
	return (
		<div>
			<h3>{ name }</h3>
			<p>{ energyLevel }</p>
			<p>{ isHungry.toString() }</p>
			<button onClick={ () => props.animalStore.reduceEnergy() }>Click</button>
		</div>
	)
})

export {
	giraffe,
	AnimalCounter
}