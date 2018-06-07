import React, { PureComponent, Fragment } from 'react';
import { HashRouter, Route, CacheLink } from 'react-keeper';
import Index from '../src/pages';
import Archives from '../src/pages/archives';
import Categories from '../src/pages/categories';
import About from '../src/pages/about';
import './App.css';

class App extends PureComponent {
	render() {
		return (
			<HashRouter>
				<Fragment>
					<header className='header'>
						<nav className='header-nav'>
							<span className='iconfont icon-menu mobile-toggle'></span>
							<div className='header-menu'>
								<CacheLink className='header-menu-link' activeClassName='header-menu-active' to='/'>首页</CacheLink>
								<CacheLink className='header-menu-link' activeClassName='header-menu-active' to='/archives'>归档</CacheLink>
								<CacheLink className='header-menu-link' activeClassName='header-menu-active' to='/categories'>分类</CacheLink>
								<CacheLink className='header-menu-link' activeClassName='header-menu-active' to='/about'>关于</CacheLink>
								<a className='iconfont icon-menu-search header-menu-link'> </a>
							</div>
						</nav>
					</header>
					<Route index miss cache='parent' component={Index} path="/home" />
					<Route cache='parent' component={Archives} path="/archives" />
					<Route cache='parent' component={Categories} path="/categories" />
					<Route cache='parent' component={About} path="/about" />
				</Fragment>
			</HashRouter>
		);
	}
}

export default App;
