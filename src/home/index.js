import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export default class Home extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return <div>
            Hello React Home
            <header>
                Our React Router 4 App
            </header>
            <ul>
                <li>
                    <Link to="/abc">abc</Link>
                    <Link to="/about">about</Link>
                </li>
            </ul>
        </div>
    }
}