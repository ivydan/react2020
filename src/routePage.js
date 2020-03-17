import React from 'react';
import AsyncComponent from './asyncComponent';
import { Route, Link } from "react-router-dom";
const path = require('path');

//按需加载包装器
const lazyLoadComponent = (comp) => (props) => (
    <asyncComponent load={comp}>
        {(Container) => <Container {...props} />}
    </asyncComponent>
)



//匹配组件入口
const RouteContext = require.context('./', true, /\.bundle\.(js|jsx)$/);
//遍历有效组件路径值
const RouteKeys = RouteContext.keys();
console.log(RouteKeys);

//动态初始化路由界面。根据bundle.js/jsx 匹配
const RoutePage = RouteKeys.map((item, i) => {
    let nameArr = item.split('/');
    let name = nameArr[nameArr.length-1];
    let path = name.split('.')[0];
    return <Route key={`ROUTE${i}`} path={`/${path}`} component={AsyncComponent(() => import(`../src/abc/abc.bundle.js`))}/>;
});

console.log(RoutePage);

export default RoutePage;