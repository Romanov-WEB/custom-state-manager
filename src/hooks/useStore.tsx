import React, { useState, useEffect } from "react";
import todosManager,{ TodoState } from "../store/todoStore";
import { StateManager } from "../StateManager";

interface TodoHook {
    todosState: TodoState;
    todosManager: StateManager<TodoState>;
}
export default function useStore(): TodoHook{
    const [todosState, setTodosState] = useState<TodoState>(todosManager.getState());

    useEffect(() => {
        return todosManager.subscribe((state: TodoState) => {
            setTodosState(state);
        });
    }, []);
    return { todosState, todosManager }
}
