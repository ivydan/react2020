// Reducers 指定了应用状态的变化如何响应 actions 并发送到 store 的，记住 actions 只是描述了有事情发生了这一事实，并没有描述应用如何更新 state。

//reducer 就是一个纯函数，接收旧的 state 和 action，返回新的 state。

// 之所以将这样的函数称之为reducer，是因为这种函数与被传入 Array.prototype.reduce(reducer, ?initialValue) 里的回调函数属于相同的类型。保持 reducer 纯净非常重要。永远不要在 reducer 里做这些操作：

// 修改传入参数；
// 执行有副作用的操作，如 API 请求和路由跳转；
// 调用非纯函数，如 Date.now() 或 Math.random()。 


import { combineReducers } from 'redux';
import {
  ADD_TODO,
  TOGGLE_TODO,
  SET_VISIBILITY_FILTER,
  VisibilityFilters
} from './actions';
const { SHOW_ALL } = VisibilityFilters;

/**
 * 初始化State数据
 */
const initialState = {
  visibilityFilter: VisibilityFilters.SHOW_ALL,
  todos: []
};

// function todoApp(state, action) {
//   if (typeof state === 'undefined') {
//     return initialState
//   }

//   // 这里暂不处理任何 action，
//   // 仅返回传入的 state。
//   return state
// }

// 精简写法
function todoAppOri(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      // 不要修改 state。 使用 Object.assign() 新建了一个副本。不能这样使用 Object.assign(state, { visibilityFilter: action.filter })，因为它会改变第一个参数的值。你必须把第一个参数设置为空对象。你也可以开启对ES7提案对象展开运算符的支持, 从而使用 { ...state, ...newState } 达到相同的目的。
      // return Object.assign({}, state, {
      //   visibilityFilter: action.filter
      // })
      return {
        ...state,
        visibilityFilter: action.filter
      }
    case ADD_TODO:
      return Object.assign({}, state, {
        todos: [
          ...state.todos,
          {
            text: action.text,
            completed: false
          }
        ]
      })
    default:
      // 在 default 情况下返回旧的 state。遇到未知的 action 时，一定要返回旧的 state。
      return state
  }

  // 很不幸到现在为止，还有很多人存在一个误区：根据文档中是否使用 switch 来决定是否使用它。如果你不喜欢 switch，完全可以自定义一个 createReducer 函数来接收一个事件处理函数列表，参照"减少样板代码"。https://www.redux.org.cn/docs/basics/Reducers.html
}





function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case TOGGLE_TODO:
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: !todo.completed
          })
        }
        return todo
      })
    default:
      return state
  }
}

const todoApp = combineReducers({
  visibilityFilter,
  todos
})

export default todoApp