import React, { PureComponent } from 'react';
import { Route } from 'react-keeper';
import Home from './home';
import Archives from './archives';
import Categories from './categories';
import About from './about';
import Article from './article';
import Search from './search';
import Header from '../components/header';

export default class extends PureComponent {
    render() {
        return (
            <div className="app">
                <Header {...this.props} />
                <Route index cache='parent' component={Home} path="/home" />
                <Route cache='parent' component={Archives} path="/archives" />
                <Route cache='parent' component={Categories} path="/categories" />
                <Route cache='parent' component={About} path="/about" />
                <Route component={Article} path="/article/:id" />
                <Route cache='false' component={Search} path="/search" />
            </div>
        );
    }
}
