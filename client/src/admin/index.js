import React, { PureComponent, Fragment } from 'react';
import { Route } from 'react-keeper';
import Home from './home';
import Nav from '../components/nav';

export default class extends PureComponent {
    render() {
        return (
            <Fragment>
                <Nav />
                <Route index miss cache='parent' component={Home} />
            </Fragment>
        );
    }
}
