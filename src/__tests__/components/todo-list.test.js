import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StoreProvider } from "../../helpers";
import { TodoList } from "../../components";
import TodoListStore from "../../store/todo-list.store";
import * as IdRandom from "../../helpers/random-id.helper";




describe("TodoList", () => {
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
		
		todoListStore = new TodoListStore([
			"React", "Redux",	"MobX"
		]);
	})
	
	afterAll(() => {
		jest.clearAllMocks();
	});
	
	it("render page with provider props", () => {
		const { container } = render(
			<StoreProvider value={ todoListStore }>
				<TodoList/>
			</StoreProvider>
		);
		
		expect(screen.getByText("Redux")).toBeInTheDocument();
		expect(screen.getByText("Redux").closest("ul")).toHaveClass("open-todos");
		
		userEvent.click(screen.getByRole("checkbox", { name: "Redux" }))
		expect(screen.getByText("Redux").closest("ul")).toHaveClass("finished-todos");

		expect(container.firstChild).toMatchSnapshot();
	});
	
	it("edit item from list", () => {
		render(
			<StoreProvider value={ todoListStore }>
				<TodoList/>
			</StoreProvider>
		);
		
		expect(screen.getByText("React")).toBeInTheDocument();

		userEvent.click(screen.getByText("React").closest("li").querySelector('i.edit'));
		
		const textbox = screen.getByRole("textbox");
		
		expect(textbox).toHaveValue("React");
		
		userEvent.type(textbox, " new text");
		expect(textbox).toHaveValue("React new text");
		
		userEvent.click(textbox.closest("li").querySelector('i.save'));
		expect(screen.getByText("React new text")).toBeInTheDocument();
	});
	
	it("remove item from list", () => {
		render(
			<StoreProvider value={ todoListStore }>
				<TodoList/>
			</StoreProvider>
		);
		
		expect(screen.getByText("MobX")).toBeInTheDocument();
		expect(todoListStore.list).toHaveLength(3)
		
		userEvent.click(screen.getByText("MobX").closest("li").querySelector('i.delete'));
		expect(screen.queryByText("MobX")).not.toBeInTheDocument();
		expect(todoListStore.list).toHaveLength(2)
	});
})