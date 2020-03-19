import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class Layout extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        let { children } = this.props;
        return <div>
            <div className="sidebar">
                <ul>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/abc">Abc</Link></li>
                    <li><Link to="/log">Log</Link></li>
                </ul>
                <ul>
                    <li><Link to="/age">Age</Link></li>
                    <li><Link to="/name">Name</Link></li>
                </ul>
            </div>
            <div className="content"> {children} </div>
        </div>
    }
}