import React, { PureComponent } from 'react';

export default class extends PureComponent {
    render() {
        return (
            <div className="profile">
                <img onClick={this.props.onClick} className="avatar" alt="header" src={require('../img/header.png')} />
                <p className="author">XboxYan</p>
                <div className="social">
                    <a target="_blank" rel="noopener noreferrer" className="social-links" href="https://github.com/Lemonreds/hexo-theme-nayo">
                        <i className="iconfont icon-Github"></i>
                    </a>
                    <a target="_blank" rel="noopener noreferrer" className="social-links" href="http://synch.site/">
                        <i className="iconfont icon-Weibo"></i>
                    </a>
                    <a target="_blank" rel="noopener noreferrer" className="social-links" href="http://synch.site/">
                        <i className="iconfont icon-Facebook"></i>
                    </a>
                    <a target="_blank" rel="noopener noreferrer" className="social-links" href="http://synch.site/">
                        <i className="iconfont icon-Twitter"></i>
                    </a>
                    <a target="_blank" rel="noopener noreferrer" className="social-links" href="http://synch.site/">
                        <i className="iconfont icon-Instagram"></i>
                    </a>
                    <a target="_blank" rel="noopener noreferrer" className="social-links" href="http://synch.site/">
                        <i className="iconfont icon-LinkedIn"></i>
                    </a>
                </div>
            </div>
        )
    }
}