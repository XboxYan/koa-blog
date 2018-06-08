import React, { PureComponent, Fragment } from 'react';
import { BrowserRouter, Route } from 'react-keeper';
import Index from '../src/pages';
import Archives from '../src/pages/archives';
import Categories from '../src/pages/categories';
import About from '../src/pages/about';
import Article from '../src/pages/article';
import Header from '../src/components/header';
import './App.css';

class App extends PureComponent {
	render() {
		return (
			<BrowserRouter>
				<Fragment>
					<Header/>
					<Route index miss cache='parent' component={Index} path="/home" />
					<Route cache='parent' component={Archives} path="/archives" />
					<Route cache='parent' component={Categories} path="/categories" />
					<Route cache='parent' component={About} path="/about" />
					<Route component={Article} path="/article/:id" />
				</Fragment>
			</BrowserRouter>
		);
	}
}

export default App;
