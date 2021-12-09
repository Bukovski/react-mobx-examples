import TodoItemStore from "../../store/todo-item.store";


describe("TodoItemStore", () => {
	let todoItemStore;
	
	beforeAll(() => {
		todoItemStore = new TodoItemStore("Donald Duck")
	})
	
	it("check created item", () => {
		expect(typeof todoItemStore.id).toBe("string");
		expect(todoItemStore.id).toHaveLength(18);
		
		expect(todoItemStore.text).toBe("Donald Duck");
		expect(todoItemStore.isDone).toBe(false);
	})
	
	it("toggleIsDone", () => {
		expect(todoItemStore.isDone).toBe(false);
		
		todoItemStore.toggleIsDone();
		expect(todoItemStore.isDone).toBe(true);
	})
	
	it("updateText", () => {
		expect(todoItemStore.text).toBe("Donald Duck");
		
		todoItemStore.updateText("new text");
		expect(todoItemStore.text).toBe("new text");
	})
})