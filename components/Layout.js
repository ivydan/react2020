import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import '../core/less/layout.less';

class Layout extends Component {
    constructor(props) {
        super(props);
    }

    getInitialState(){
        return {
            children: {},
            cacheElement:{}
        }
    }

    componentDidMount(){
        this._cacheRouteHistory(this.props);
    }
    componentWillUpdate(nextProps){
        this._cacheRouteHistory(nextProps)
    }

    _cacheRouteHistory(props){
        console.log(props);
        let { cacheElement } = this.state;
        this.setState({
            children: props.children
        })
    }

    render() {
        let { children } = this.props;
        return <div className="layout-container">
            <div className="sidebar">
                <div className="logo">
                    LOGO
                </div>
                <ul>
                    <li><Link to="/">Home</Link></li>
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

export default withRouter(Layout);