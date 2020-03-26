import React, { Component } from 'react';
export default class Home extends Component {
    constructor(props) {
        super(props);

    }

    componentWillMount() {
        let { children, location } = this.props;
    }

    componentWillReceiveProps(nextProps) {
        let { children, location } = nextProps;
    }

    render() {
        return <div>
            Hello React Home
            <header>
                Our React Router 4 App
            </header>
            <div>
                <input type="text"/>
            </div>
        </div>
    }
}