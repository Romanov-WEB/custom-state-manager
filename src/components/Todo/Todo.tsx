import React, { useState } from "react"
import useStore from "../../hooks/useStore"
import style from './style.module.scss'
import { EnumFilter, TodoItem } from "../../store/todoStore";
import Item from "../Item/Item";


export function Todo() {
    const [text, setText] = useState("")
    const { todosState, todosManager } = useStore()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (text) {
            todosManager.setState({
                todos: [...todosState.todos, {
                    id: Date.now(),
                    text,
                    selected: false,
                    completed: false
                }],
            })
            setText("")
        }
    }
    
    const toggleFilterTodos = (filter: EnumFilter) => {
      todosManager.setState({
          filter: filter
      })
    }
    
    const filterTodos = (): TodoItem[] => {
       switch (todosState.filter) {
          case EnumFilter.all:
              return todosState.todos
           case EnumFilter.active:
               return todosState.todos.filter((item) => item.selected)
           case EnumFilter.completed:
               return todosState.todos.filter((item) => item.completed)
           default:
               return todosState.todos
       }
    }

    return (
        <div className={style.container}>
            <h1 className={style.header}>Todo List</h1>
            <p className={style.counter}>{todosState.todos.length}: Item</p>
            <form className={style.createTodoForm} onSubmit={handleSubmit}>
                <input
                    className={style.createTodoItem}
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter task name"
                />
                <button className={style.btnAdd} type="submit">Add task</button>
            </form>

            <div className={style.wrapperBtn}>
                <button className={todosState.filter === EnumFilter.all? style.btnActive: style.btn}
                       onClick={() => toggleFilterTodos(EnumFilter.all)}
                >
                    All
                </button>
                <button className={todosState.filter === EnumFilter.active? style.btnActive: style.btn}
                        onClick={() => toggleFilterTodos(EnumFilter.active)}
                >
                    Active
                </button>
                <button className={todosState.filter === EnumFilter.completed? style.btnActive: style.btn}
                        onClick={() => toggleFilterTodos(EnumFilter.completed)}
                >
                    Completed
                </button>
            </div>

            <ul className={style.wrapperTodo}>
                {filterTodos().map((todo) => (
                    <Item key={todo.id} id={todo.id} text={todo.text} selected={todo.selected} completed={todo.completed} />
                ))}
            </ul>
        </div>
    )
}
