import React, { PureComponent } from 'react';
import { CacheLink } from 'react-keeper';

export default class extends PureComponent {
    render(){
        console.log(Control.path)
        return (
            <header className='header header-static'>
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
        )
    }
}