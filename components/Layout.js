import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../core/less/layout.less';

export default class Layout extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { children } = this.props;
        return <div className="layout-container">
            <div className="sidebar">
                <div className="logo">
                    LOGO
                </div>
                <ul>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/abc">Abc</Link></li>
                    <li><Link to="/log">Log</Link></li>
                    <li><Link to="/age">Age</Link></li>
                    <li><Link to="/name">Name</Link></li>
                </ul>
            </div>
            <div className="content">
                <div className="head">
                    login
                </div>
                <div className="section">
                    {children}
                </div>
            </div>
        </div>
    }
}