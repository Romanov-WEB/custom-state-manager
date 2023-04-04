import React, { useState } from 'react';
import style from "./style.module.scss";
import useStore from "../../hooks/useStore";
import { TodoItem } from "../../store/todoStore";

export default function Item(props: TodoItem): JSX.Element {
    const [textArea, setTextArea] = useState(false)
    const { todosState, todosManager } = useStore()

    const deleteItem = (id: number) => {
        todosManager.setState({
            todos: todosState.todos.filter((todo) => todo.id !== id),
        })
    }

    const toggleCheck = (id: number) => {
        todosManager.setState({
            todos: todosState.todos.map((todo) =>
                todo.id === id ? { ...todo, selected: !todo.selected } : todo
            ),
        })
    }

    const toggleCompleted = (id: number) => {
        todosManager.setState({
            todos: todosState.todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            ),
        })
    }

    const handleTextAreaChange = (event: string, id: number) => {
        todosManager.setState({
            todos: todosState.todos.map((todo) =>
                todo.id === id ? { ...todo, text: event } : todo
            ),
        })
    };
    const toggleTextArea = () => {
        setTextArea(!textArea)
    }

    return (
        <li className={style.listTodo}>
            <div>
                <input
                    type="checkbox"
                    checked={props.selected}
                    onChange={() => toggleCheck(props.id)}
                />
                {
                    textArea?
                        <textarea value={props.text}
                                  onChange={(e) => handleTextAreaChange(e.target.value, props.id)}
                                  onBlur={() => toggleTextArea()}
                        />:
                        <p className={props.completed? style.textCompleted: style.text}
                           onClick={() => toggleCompleted(props.id)}
                        >
                            {props.text}
                        </p>
                }
            </div>

            <div>
                <button className={style.btnRename} onClick={() => toggleTextArea()}>Rename</button>
                <button className={style.btnDelete} onClick={() => deleteItem(props.id)}>Delete</button>
            </div>
        </li>
    );
}
