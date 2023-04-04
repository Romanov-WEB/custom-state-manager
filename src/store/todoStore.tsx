import { StateManager } from "../StateManager"

export interface TodoItem {
    id: number
    text: string
    selected: boolean
    completed: boolean
}

export enum EnumFilter {
    all = 'all',
    active = 'active',
    completed = 'completed'
}

export type TodoState = {
    todos: TodoItem[]
    filter: EnumFilter
}

export const initialState: TodoState = {
    todos: [],
    filter: EnumFilter.all
}

const todosManager = new StateManager<TodoState>(initialState)

export default  todosManager
