import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TodoItem } from "../../components";
import { StoreProvider } from "../../helpers";



describe("TodoItem", () => {
	it("render page with props", () => {
		const todo = { id: "_sdf234lkjsdf", text: "Should be text", isDone: false  }
		
		const { container } = render(<TodoItem todo={ todo }/>);
		
		expect(screen.getByText("Should be text")).toBeInTheDocument();
		expect(screen.getByRole("checkbox")).toHaveAttribute("id", "todo__sdf234lkjsdf")
		
		expect(container.firstChild).toMatchSnapshot();
	})
	
	it('should delete item', () => {
		const todoListStore = {
			removeTodo: jest.fn()
		};
		const todo = { id: "_sdf234lkjsdf", text: "Should be text", isDone: false  }
		
		const { container } = render(<StoreProvider value={ todoListStore }>
			<TodoItem todo={ todo }/>
		</StoreProvider>);
		
		expect(todoListStore.removeTodo).toHaveBeenCalledTimes(0);

		userEvent.click(container.querySelector('i.delete'))
		expect(todoListStore.removeTodo).toHaveBeenCalledTimes(1);
	});
	
	it('should edit item', () => {
		const mockUpdateText = jest.fn();
		const todo = { id: "_sdf234lkjsdf", text: "Should be text", isDone: false, updateText: mockUpdateText  }
		
		const { container } = render(<TodoItem todo={ todo }/>);
		
		expect(mockUpdateText).toHaveBeenCalledTimes(0);
		
		userEvent.click(container.querySelector('i.edit'));
		expect(screen.getByRole("textbox")).toHaveValue("Should be text");
		
		userEvent.type(screen.getByRole("textbox"), " new text");
		expect(screen.getByRole("textbox")).toHaveValue("Should be text new text");
		
		userEvent.click(container.querySelector('i.save'));
		expect(mockUpdateText).toHaveBeenCalledTimes(1);
		
		userEvent.click(container.querySelector('i.edit'));
		userEvent.type(screen.getByRole("textbox"), " if press enter");
		expect(screen.getByRole("textbox")).toHaveValue("Should be text new text if press enter")
		
		userEvent.type(screen.getByRole("textbox"), '{enter}')
		expect(mockUpdateText).toHaveBeenCalledTimes(2);
	});
})