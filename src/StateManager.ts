type Listener<T> = (state: T) => void

export class StateManager<T> {
    private state: T
    private listeners: Listener<T>[] = []

    constructor(initialState: T) {
        this.state = initialState
    }

    subscribe(listener: Listener<T>) {
        this.listeners.push(listener)
        return () => {
            const index = this.listeners.indexOf(listener)
            this.listeners.splice(index, 1)
        }
    }

    getState() {
        return this.state
    }

    setState(newState: Partial<T>) {
        this.state = { ...this.state, ...newState }
        this.listeners.forEach((listener) => listener(this.state))
    }
}
