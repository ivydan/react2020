import { combineReducers } from 'redux'
import action from './action';

export const initialState = {
    reduxList: [],
    currentPage: 1,
  };

function createReducer(initialState, handlers) {
    return function reducer(state = initialState, action) {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action)
        } else {
            return state
        }
    }
}

function addTodo(todosState, action) {
    const newTodos = todosState.concat({
        id: action.id,
        text: action.text
    });

    return newTodos;
}

const reduxListReducer = createReducer([], {
    'ADD_TODO': addTodo,
});

const reducersApp = combineReducers({
    reduxList: reduxListReducer
})

export default reducersApp