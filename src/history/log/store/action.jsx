let nextTodoId = 0

export const addTodo = text => {
    return {
        type: 'ADD_TODO_LOG',
        id: nextTodoId++,
        text
    }
}

export const toggleTodo = id => {
    return {
        type: 'TOGGLE_TODO_LOG',
        id
    }
}