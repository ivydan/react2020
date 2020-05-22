// const initialState = {
//     visibilityFilter: 'SHOW_ALL',
//     todos: [
//         {
//             text: 'Consider using Redux',
//             completed: true,
//         },
//         {
//             text: 'Keep all state in a single tree',
//             completed: false
//         }
//     ]
// }

// Redux 首次执行时，state 为 undefined，此时我们可借机设置并返回应用的初始 state。
// function todoApp(state, action) {
//     if (typeof state === 'undefined') {
//         return initialState
//     }

//     // 这里暂不处理任何 action，
//     // 仅返回传入的 state。
//     return state
// }

// 这里一个技巧是使用 ES6 参数默认值语法 来精简代码。
// function todoApp(state = initialState, action) {
//     switch (action.type) {
//         case SET_VISIBILITY_FILTER:
//             return Object.assign({}, state, {
//                 visibilityFilter: action.filter
//             })
//         default:
//             return state
//     }
// }

// Redux 提供了 combineReducers() 工具类来做上面 todoApp 做的事
// const todoApp = combineReducers({
//     visibilityFilter,
//     todos
// })
// export default todoApp;

// 等价代码
// export default function todoApp(state = {}, action) {
//     return {
//         visibilityFilter: visibilityFilter(state.visibilityFilter, action),
//         todos: todos(state.todos, action)
//     }
// }

// combineReducers() 所做的只是生成一个函数，这个函数来调用你的一系列 reducer，每个 reducer 根据它们的 key 来筛选出 state 中的一部分数据并处理，然后这个生成的函数再将所有 reducer 的结果合并成一个大的对象。没有任何魔法。正如其他 reducers，如果 combineReducers() 中包含的所有 reducers 都没有更改 state，那么也就不会创建一个新的对象。

import { createStore } from 'redux';
import todoApp from './reducers';
import {
    addTodo,
    toggleTodo,
    setVisibilityFilter,
    VisibilityFilters
  } from './actions'

//createStore() 的第二个参数是可选的, 用于设置 state 初始状态。这对开发同构应用时非常有用，服务器端 redux 应用的 state 结构可以与客户端保持一致, 那么客户端可以将从网络接收到的服务端 state 直接用于本地数据初始化。
let store = createStore(todoApp);

console.log(store.getState())

// 每次 state 更新时，打印日志
// 注意 subscribe() 返回一个函数用来注销监听器
const unsubscribe = store.subscribe(() => console.log(store.getState()))

// 发起一系列 action
store.dispatch(addTodo('Learn about actions'))

// 停止监听 state 更新
unsubscribe();


// 严格的单向数据流是 Redux 架构的设计核心。

// Redux 应用中数据的生命周期遵循下面 4 个步骤：
// 1. 调用 store.dispatch(action)。
// 2. Redux store 调用传入的 reducer 函数。
// 3. 根 reducer 应该把多个子 reducer 输出合并成一个单一的 state 树。
// 4. Redux store 保存了根 reducer 返回的完整 state 树。