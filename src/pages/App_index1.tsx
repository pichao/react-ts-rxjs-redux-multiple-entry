import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
// import About from 'pages/about';
// import Users from 'pages/users';
// import Home from 'pages/home';
/* 
注意使用lazy引入组件，export应该导出default,且路由组件都需要放在suspend里面
*/
const Home = lazy(() => import(/* webpackChunkName: 'Home'*/ 'pages/home'));
const About = lazy(() => import(/* webpackChunkName: 'About'*/ 'pages/about'));
const Users = lazy(() => import(/* webpackChunkName: 'Users'*/ 'pages/users'));
export interface HelloWorldProps {
    userName: string;
    lang: string;
}
export const App = (props: HelloWorldProps) => (
    <Suspense fallback={<div>Loading...</div>}>
        <Router>
            <Switch>
                <Route exact path="/index1" component={About}></Route>
                <Route path="/index1_about$" component={About}></Route>
                <Route path="/index_users$" component={Users}></Route>
                <Redirect to="/index1"></Redirect>
            </Switch>
        </Router>
    </Suspense>
);
