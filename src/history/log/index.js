import React, { Component } from 'react';
import TodoList from './component/todoList';
import { connect } from 'react-redux';
import { addTodo } from './store/action';

class Log extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        console.log(this.props, this.state)
        return <div>
            Hello React Log Page

            <TodoList todos={this.props.todos} />
            <a onClick={this.props.onAddClick}>ADD</a>
        </div>
    }
}

const mapStateToProps = state => {
    return {
        todos: state.logReducer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddClick: () => {
            dispatch(addTodo('The New Notice'))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Log)
