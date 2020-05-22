import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import { createStore, compose } from 'redux'
import reduxList from './redux/reducers';

class Redux extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        console.log('render', this.props)
        return <div>
            Hello React Redux Basic
        </div>
    }
}

const mapStateToProps = state => {
    console.log('state', state)
    return {
        list: []
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTodoClick: id => {
            dispatch(toggleTodo(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Redux);