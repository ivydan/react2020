
import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from './home';
import AsyncComponent from "./asyncComponent";

const RouteContext = require.context('./', true, /\.bundle\/index\.(js|jsx)$/, 'lazy');
//遍历有效组件路径值
const RouteKeys = RouteContext.keys();

const RoutePage = RouteKeys.map((item) => {
    let arr = item.split('/');
    arr.pop()
    arr.shift()
    let routePath = arr.join('/')
    let routeName = arr[arr.length - 1];
    console.log(item, arr, routePath, routeName);
    return <Route
        key={`ROUTE${routeName}`}
        path={`/${routeName}`}
        component={AsyncComponent(() => import(/*webpackChunkName: "[request]" */ `./${routePath}`))} />;
});

const PrimaryLayout = () => (
    <div className="primary-layout">
        <ul>
            <li>
                <Link to="/abc">abc</Link>

            </li>
            <li>
                <Link to="/about">about</Link>
            </li>
        </ul>
        <Switch>
            {/* 主页面 */}
            <Route path="/" exact component={Home} />
            {/* 功能页面 */}
            {RoutePage}

        </Switch>
    </div>
)
const Index = () => (
    <Router>
        <PrimaryLayout />
    </Router>
);

ReactDOM.render(
    <Index />,
    document.getElementById('root')
);