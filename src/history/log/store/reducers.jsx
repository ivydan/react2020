import { combineReducers } from 'redux';
const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO_LOG':
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    completed: false
                }
            ];
        case 'TOGGLE_TODO_LOG':
            return state.map(todo =>
                (todo.id === action.id)
                    ? { ...todo, completed: !todo.completed }
                    : todo
            )
        default:
            return state
    }
}


// const todoApp = combineReducers({
//     todos
// })

export default todos;