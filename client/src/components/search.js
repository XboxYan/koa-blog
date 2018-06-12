import React, { PureComponent, Fragment } from 'react';
import { createPortal } from 'react-dom';
import Loader from './loader';
import fetchData from '../util/Fetch';
import { Control } from 'react-keeper';

export default class extends PureComponent {

    state = {
        show: false,
        data: [],
        keywords: '',
        isrender: true
    }

    getArticles = async (keywords) => {
        this.setState({isrender:true});
        if(keywords){
            const articles = await fetchData('/api/search?keywords='+keywords);
            this.setState({data:articles.data,isrender:false});
        }else{
            this.setState({data:[],isrender:false});
        }
    }

    show = (show) => (ev) => {
        this.setState({ show });
    }

    search = (ev) => {
        const { value } = ev.target;
        this.setState({keywords:value.replace(/\s+/g,"")});
        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(()=>{
            this.getArticles(value);
        },500)
    }

    see = (id) => () => {
        this.setState({show:false,keywords:'',isrender:true});
        Control.go("/article/"+id);
    }

    render() {
        const { show, keywords, data, isrender } = this.state;
        return (
            <Fragment>
                <a className='iconfont icon-menu-search header-menu-link' onClick={this.show(true)}> </a>
                {
                    createPortal(
                        <div className="mask" style={{ display: show ? 'block' : 'none' }}>
                            <div className="search-container sildeUpMin">
                                <div className="search-header">
                                    <input type="text" placeholder="输入你想搜索的" onChange={this.search} value={keywords} className="search-input" />
                                    <span className="search-cancel iconfont icon-cancel" onClick={this.show(false)}></span>
                                </div>
                                <div className="search-result">
                                    {
                                        keywords && (
                                            isrender ?
                                                <Loader />
                                                :
                                                (
                                                    data.length > 0 ?
                                                        data.map((d) => (
                                                            <div className="search-item" key={d._id}>
                                                                <a onClick={this.see(d._id)} className="search-title">{d.title}</a>
                                                                <p className="search-content">{d.description}</p>
                                                            </div>
                                                        ))
                                                        :
                                                        <div className="iconfont icon-nofound search-empty"></div>
                                                )
                                        )
                                    }
                                </div>
                            </div>
                        </div>,
                        window.document.body
                    )
                }
            </Fragment>
        )
    }
}
