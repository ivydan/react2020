
import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './home';
import Layout from '../components/Layout';
import AsyncComponent from "./asyncComponent";

const PrimaryLayout = () => (
    <div className="primary-layout">
        <Layout>
            <Switch>
                {/* 主页面 */}
                <Route path="/" exact component={Home} />
                {/* 功能页面 */}
                {getRoutePage()}
            </Switch>
        </Layout>
    </div>
)
const getRoutePage = () => {
    // 获取路径
    let routeContext = require.context('./', true, /index\.bundle\.(js|jsx)$/, 'lazy');
    // 遍历有效组件路径值
    let routeKeys = routeContext.keys();
    // 生成路由
    let routePage = routeKeys.map((item) => {
        let arr = item.split('/');
        let routeName = arr[arr.length - 2];
        return <Route
            key={`ROUTE${routeName}`}
            path={`/${routeName}`}
            component={AsyncComponent(() => import(`${item}`))} />;
    });
    return routePage;
};
const Index = () => (
    <Router>
        <PrimaryLayout />
    </Router>
);

ReactDOM.render(
    <Index />,
    document.getElementById('root')
);