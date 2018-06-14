import React, { PureComponent } from 'react';
import { Route } from 'react-keeper';
import Home from './home';
import Article from './article';
import Category from './category';
import Edit from './edit';
import Nav from '../components/nav';

export default class extends PureComponent {
    render() {
        return (
            <div className="app">
                <Nav />
                <Route index miss cache='parent' component={Home} />
                <Route cache='parent' path="/article"  component={Article} />
                <Route cache='parent' path="/category" component={Category} />
                <Route cache='false' path="/category/edit" component={Edit} />
            </div>
        );
    }
}
