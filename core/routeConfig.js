import React from 'react'
import { Route, Switch } from "react-router-dom";
import AsyncComponent from './asyncComponent';

const getRoutePage = () => {
    //非功能页面
    const NoNeed = ['./index.js']
    // 获取路径
    let routeContext = require.context('../src/', true, /index\.js$/, 'lazy');
    // 遍历有效组件路径值
    let routeKeys = routeContext.keys().filter(item => NoNeed.indexOf(item) === -1);
    // 生成路由
    let routePage = routeKeys.map((item) => {
        let arr = item.split('/');
        arr.pop();
        arr.shift();
        let routeName = arr[arr.length - 1];
        return <Route
            key={`ROUTE${routeName}`}
            path={`/${routeName}`}
            component={AsyncComponent(() => import(/*webpackChunkName: "[request]" */ `../src/${arr.join('/')}`))} />;
    });
    return routePage;
};

const RouteConfig = () => {
    let routePage = getRoutePage();
    return <Switch>
        {routePage}
    </Switch>
};

export default RouteConfig;