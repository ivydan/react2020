import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class App extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return <div>
            Hello React
            <div>
                ABC
                <li><Link to="/about">About</Link></li>
                <li><Link to="/abc">abc</Link></li>
                {this.props.children}
            </div>
        </div>
    }
}