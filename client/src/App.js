import React, { PureComponent, Fragment } from 'react';
import { BrowserRouter, Route } from 'react-keeper';
import Index from './pages';
import Admin from './admin';
import './App.css';

class App extends PureComponent {
	render() {
		return (
			<BrowserRouter>
				<Fragment>
					<Route index component={Index} path="/" />
					<Route component={Admin} path="/admin" />
				</Fragment>
			</BrowserRouter>
		);
	}
}

export default App;
