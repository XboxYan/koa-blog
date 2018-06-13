import React from 'react';
import { Link, Control } from 'react-keeper';
import Search from './search';

export default () => (
    <header className='header'>
        <nav className='header-nav'>
            <span className='iconfont icon-menu mobile-toggle'></span>
            <div className='header-menu'>
                <Link className='header-menu-link' activeClassName='header-menu-active' to='/'>首页</Link>
                <Link className='header-menu-link' activeClassName='header-menu-active' to='/archives'>归档</Link>
                <Link className='header-menu-link' activeClassName='header-menu-active' isActive={()=>Control.path.indexOf('categories')>=0} to='/categories'>分类</Link>
                <Link className='header-menu-link' activeClassName='header-menu-active' to='/about'>关于</Link>
                <Link className='header-menu-link' activeClassName='header-menu-active' to='/admin'>进入后台</Link>
                <Search/>
            </div>
        </nav>
    </header>
)