import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from '../src/home/index.jsx';
import Layout from '../components/Layout';
import AsyncComponent from './asyncComponent';
import CacheRoute, { CacheSwitch } from 'react-router-cache-route';

//非功能页面
const NoNeed = ['./index.js']
// 获取路径
const routeContext = require.context('../src/', true, /index\.js$/, 'lazy');
// 遍历有效组件路径值
const routeKeys = routeContext.keys().filter(item => NoNeed.indexOf(item) === -1);

class RouteConfig extends Component {
    constructor(props) {
        super(props)
        this.state = {
            closeRouteName: null
        }
    }
    componentDidMount() { }

    _isCache(routeName) {
        if (routeName = this.state.closeRouteName) {
            this.setState({
                closeRouteName: null
            })
            return false;
        } else {
            return true;
        }
    }

    _renderCacheRoutes = () => {
        // 生成路由
        let routePage = routeKeys.map((item) => {
            let arr = item.split('/');
            arr.pop();
            arr.shift();
            let routeName = arr[arr.length - 1];
            return <CacheRoute
                cacheKey={`ROUTE-${routeName.toUpperCase()}`}
                when={this._isCache.bind(this, `/${routeName}`)}
                key={`ROUTE-${routeName.toUpperCase()}`}
                path={`/${routeName}`}
                component={AsyncComponent(() => import(/*webpackChunkName: "[request]" */ `../src/${arr.join('/')}`))} />;
        });
        return routePage;
    }

    _onCloseChange(closeRouteName) {
        this.setState({ closeRouteName });
    }

    render() {
        return (
            <Router>
                <Layout onCloseChange={this._onCloseChange.bind(this)}>
                    {/* <Switch> */}
                    {/* 主页面 */}
                    {/* <Route path="/" exact component={Home} /> */}
                    {/* 功能页面 */}
                    {/* {RouteConfig()} */}
                    {/* </Switch> */}
                    <CacheSwitch>
                        {/* 主页面 */}
                        <CacheRoute path="/" exact component={Home} />
                        {/* 功能页面 */}
                        {this._renderCacheRoutes()}
                    </CacheSwitch>
                </Layout>
            </Router>
        );
    }
}

export default RouteConfig;