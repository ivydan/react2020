
import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from './home';
import AsyncComponent from "./asyncComponent";



const PrimaryLayout = () => (
    <div className="primary-layout">
        <Switch>
            {/* 主页面 */}
            <Route path="/" exact component={Home} />
            {/* 功能页面 */}
            <Route path="/abc" component={AsyncComponent(() => import(/* webpackChunkName: "abc" */ "./abc/index.bundle.js"))} />
            <Route path="/about" component={AsyncComponent(() => import(/* webpackChunkName: "about" */ "./about/index.bundle.js"))} />
        </Switch>
    </div>
)
const Index = () => (
    <Router>
        <PrimaryLayout />
    </Router>
)

ReactDOM.render(
    <Index />,
    document.getElementById('root')
);
