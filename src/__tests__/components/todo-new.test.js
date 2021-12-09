import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StoreProvider } from "../../helpers";
import { TodoNew } from "../../components";



describe("TodoNew", () => {
	it("add new text to field and save", () => {
		const todoListStore = {
			addTodo: jest.fn()
		};
		
		const { container } = render(
			<StoreProvider value={ todoListStore }>
				<TodoNew/>
			</StoreProvider>
		);
		
		expect(todoListStore.addTodo).toHaveBeenCalledTimes(0);
		
		userEvent.type(screen.getByRole("textbox"), "New text");
		userEvent.click(screen.getByRole("button"));
		
		expect(todoListStore.addTodo).toHaveBeenCalledTimes(1);
		
		expect(container.firstChild).toMatchSnapshot();
	});
	
	it("add new text to field and save if press Enter", () => {
		const todoListStore = {
			addTodo: jest.fn()
		};
		
		render(
			<StoreProvider value={ todoListStore }>
				<TodoNew/>
			</StoreProvider>
		);
		
		expect(todoListStore.addTodo).toHaveBeenCalledTimes(0);
		
		userEvent.type(screen.getByRole("textbox"), "More text");
		userEvent.type(screen.getByRole("textbox"), '{enter}')
		
		expect(todoListStore.addTodo).toHaveBeenCalledTimes(1);
	});
});