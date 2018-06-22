import React, { PureComponent, Fragment } from 'react';
import { BrowserRouter, Route, Control } from 'react-keeper';
import Index from './pages';
import Admin from './admin';
import Login from './login';
import './App.css';

class App extends PureComponent {

	state = {
		loginState:window.localStorage.loginInfo,
		userInfo:window.localStorage.loginInfo ? JSON.parse(window.localStorage.loginInfo):{}
	}

	loginFilter = (cb, props) => {
		if(this.state.loginState && this.state.userInfo.isAdmin){
			cb();
		}else{
			Control.replace('/login');
		}
	}

	login = (userInfo) => {
		this.setState({loginState:true,userInfo});
		Control.go(-1);
	}

	logout = () => {
		this.setState({loginState:false,userInfo:{}});
	}

	render() {
		const {loginState,userInfo} = this.state;
		return (
			<BrowserRouter>
				<Fragment>
					<Route index component={Index} path="/" loginState={loginState} userInfo={userInfo} logout={this.logout} />
					<Route component={Admin} path="/admin" enterFilter={this.loginFilter} />
					<Route cache="false" component={Login} path="/login" login={this.login} />
				</Fragment>
			</BrowserRouter>
		);
	}
}

export default App;
