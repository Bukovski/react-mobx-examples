import TodoListStore from "../../store/todo-list.store";
import * as IdRandom from "../../helpers/random-id.helper";


describe("TodoListStore", () => {
	let todoListStore;
	
	beforeAll(() => {
		function* idMaker(){
			yield "1";
			yield "2";
			yield "3";
			yield "4";
			yield "5";
		}
		const idGenerator = idMaker();
		
		jest.mock("../../helpers/random-id.helper")
		IdRandom[ "randomId" ] = () => idGenerator.next().value;
		
		const todo = [ "Tony Stark", "Bruce Banner", "Peter Parker", "Natasha Romanoff" ]
		todoListStore = new TodoListStore(todo)
	})
	
	afterAll(() => {
		jest.clearAllMocks();
	});
	
	it("check created item", () => {
		expect(todoListStore.list).toHaveLength(4);
	})
	
	it("computed openTodos", () => {
		todoListStore.list[0].toggleIsDone();
		
		expect(todoListStore.list).toHaveLength(4);
		expect(todoListStore.openTodos).toHaveLength(3);
	})
	
	it("computed finishedTodos", () => {
		expect(todoListStore.list).toHaveLength(4);
		expect(todoListStore.finishedTodos).toHaveLength(1);
	})
	
	it("action addTodo", () => {
		expect(todoListStore.list).toHaveLength(4);
		
		todoListStore.addTodo("Steve Rogers");
		
		expect(todoListStore.list).toHaveLength(5);
		expect(todoListStore.list[ 4 ].text).toBe("Steve Rogers");
	})
	
	it("action removeTodo", () => {
		// expect(todoListStore.list).toHaveLength(5);
		expect(todoListStore.list[ 2 ].text).toBe("Peter Parker");
		expect(todoListStore.list[ 2 ].id).toBe("3");
		
		todoListStore.removeTodo(todoListStore.list[ 2 ]);
		
		expect(todoListStore.list[ 2 ].text).toBe("Natasha Romanoff");
		expect(todoListStore.list[ 2 ].id).toBe("4");
	})
})