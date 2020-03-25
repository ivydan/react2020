
import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RouteConfig from "../core/routeConfig";
import Home from './home/index.jsx';
import Layout from '../components/Layout';
import AsyncComponent from '../core/asyncComponent';

const Index = () => (
    <Router>
        <Layout>
            {/* <Switch> */}
                {/* 主页面 */}
                {/* <Route path="/" exact component={Home} /> */}
                {/* 功能页面 */}
                {/* {RouteConfig()} */}
            {/* </Switch> */}
            <Route path="/" exact component={Home}>
                {/* <Route path="/abc" key="abc" component={AsyncComponent(() => import('./abc/index'))} /> */}
            </Route>
        </Layout>
    </Router>
)

ReactDOM.render(
    <Index />,
    document.getElementById('root')
);