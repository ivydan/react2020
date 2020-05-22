import { combineReducers } from 'redux'
import { Tool, merged } from './Tool';
import todosReducer from '../src/history/todo/store/reducers';
import logReducer from '../src/history/log/store/reducers';

function updateObject(oldObject, newValues) {
    // 用空对象作为第一个参数传递给 Object.assign，以确保是复制数据，而不是去改变原来的数据
    return Object.assign({}, oldObject, newValues);
}

function updateItemInArray(array, itemId, updateItemCallback) {
    const updatedItems = array.map(item => {
        if (item.id !== itemId) {
            // 因为我们只想更新一个项目，所以保留所有的其他项目
            return item;
        }

        // 使用提供的回调来创建新的项目
        const updatedItem = updateItemCallback(item);
        return updatedItem;
    });

    return updatedItems;
}

function createReducer(initialState, handlers) {
    return function reducer(state = initialState, action) {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action)
        } else {
            return state
        }
    }
}

/**
 * 存储登录的用户信息
 * 
 * @param {string} [state=JSON.parse(Tool.localItem('User'))]
 * @param {Object} action
 * @returns Object
 */
const User = (state = JSON.parse(Tool.localItem('User')), action) => {
    switch (action.type) {
        case 'signinSuccess': //登录成功
            Tool.localItem('User', JSON.stringify(action.target));
            return action.target;
        case 'signin': //退出
            Tool.removeLocalItem('User');
            return null;
        default:
            return state;
    }
}


const reducersApp = combineReducers({
    User,
    todosReducer,
    logReducer
})

export default reducersApp;

// function setVisibilityFilter(visibilityState, action) {
//     // 从技术上将，我们甚至不关心之前的状态
//     return action.filter;
// }

// const visibilityReducer = createReducer('SHOW_ALL', {
//     'SET_VISIBILITY_FILTER': setVisibilityFilter
// });


// function addTodo(todosState, action) {
//     const newTodos = todosState.concat({
//         id: action.id,
//         text: action.text,
//         completed: false
//     });

//     return newTodos;
// }

// function toggleTodo(todosState, action) {
//     const newTodos = updateItemInArray(todosState, action.id, todo => {
//         return updateObject(todo, { completed: !todo.completed });
//     });

//     return newTodos;
// }

// function editTodo(todosState, action) {
//     const newTodos = updateItemInArray(todosState, action.id, todo => {
//         return updateObject(todo, { text: action.text });
//     });

//     return newTodos;
// }

// const todosReducer = createReducer([], {
//     'ADD_TODO': addTodo,
//     'TOGGLE_TODO': toggleTodo,
//     'EDIT_TODO': editTodo
// });

// function appReducer(state = initialState, action) {
//     return {
//         todos: todosReducer(state.todos, action),
//         visibilityFilter: visibilityReducer(state.visibilityFilter, action)
//     };
// }

// 顶层 reducer
// const appReducer = combineReducers({
//     visibilityFilter: visibilityReducer,
//     todos: todosReducer
// });


// function selectedsubreddit(state = 'reactjs', action) {
//     switch (action.type) {
//         case SELECT_SUBREDDIT:
//             return action.subreddit
//         default:
//             return state
//     }
// }

// function posts(
//     state = {
//         isFetching: false,
//         didInvalidate: false,
//         items: []
//     },
//     action
// ) {
//     switch (action.type) {
//         case INVALIDATE_SUBREDDIT:
//             return Object.assign({}, state, {
//                 didInvalidate: true
//             })
//         case REQUEST_POSTS:
//             return Object.assign({}, state, {
//                 isFetching: true,
//                 didInvalidate: false
//             })
//         case RECEIVE_POSTS:
//             return Object.assign({}, state, {
//                 isFetching: false,
//                 didInvalidate: false,
//                 items: action.posts,
//                 lastUpdated: action.receivedAt
//             })
//         default:
//             return state
//     }
// }

// function postsBySubreddit(state = {}, action) {
//     switch (action.type) {
//         case INVALIDATE_SUBREDDIT:
//         case RECEIVE_POSTS:
//         case REQUEST_POSTS:
//             return Object.assign({}, state, {
//                 [action.subreddit]: posts(state[action.subreddit], action)
//             })
//         default:
//             return state
//     }
// }

// function todos(state = [], action) {
//     switch (action.type) {
//         case ADD_TODO:
//             return [
//                 ...state,
//                 {
//                     text: action.text,
//                     completed: false
//                 }
//             ]
//         case TOGGLE_TODO:
//             return state.map((todo, index) => {
//                 if (index === action.index) {
//                     return Object.assign({}, todo, {
//                         completed: !todo.completed
//                     })
//                 }
//                 return todo
//             })
//         default:
//             return state
//     }
// }