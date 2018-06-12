import React from 'react';
import { Link } from 'react-keeper';

export default () => (
    <header className='header'>
        <nav className='header-nav'>
            <span className='iconfont icon-menu mobile-toggle'></span>
            <div className='header-menu'>
                <Link className='header-menu-link' activeClassName='header-menu-active' to='/admin'>首页</Link>
                <Link className='header-menu-link' activeClassName='header-menu-active' to='/admin/archives'>文章</Link>
                <Link className='header-menu-link' activeClassName='header-menu-active' to='/admin/categories'>分类</Link>
                <a className='iconfont icon-words header-menu-link'>发布</a>
            </div>
        </nav>
    </header>
)