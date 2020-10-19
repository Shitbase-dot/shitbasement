import React from 'react';
import {Switch, Redirect, Route} from 'react-router-dom';
import LinksPage from './pages/LinksPage';
import DetailPage from './pages/DetailPage';
import CreatePage from './pages/CreatePage';
import AuthPage from './pages/AuthPage';


export default isAuthenticated => {
    if(isAuthenticated) {
        return (
            <Switch>
                <Route path="/links" exact>
                    <LinksPage/>
                </Route>
                <Route path="/detail/:id">
                    <DetailPage/>
                </Route>
                <Route path="/create" exact>
                    <CreatePage/>
                </Route>
                <Redirect to="/create"/>
            </Switch>
            
        )
    }

    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage/>
            </Route>
            <Redirect to="/"/>
        </Switch>
    )
};