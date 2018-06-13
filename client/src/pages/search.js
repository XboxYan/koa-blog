import React, { PureComponent } from 'react';
import Loader from '../components/loader';
import fetchData from '../util/Fetch';
import { Control,Link } from 'react-keeper';

export default class extends PureComponent {

    state = {
        data: [],
        keywords: '',
        isrender: true
    }

    getArticles = async (keywords) => {
        this.setState({ isrender: true });
        if (keywords) {
            const articles = await fetchData('/api/search?keywords=' + keywords);
            this.setState({ data: articles.data, isrender: false });
        } else {
            this.setState({ data: [], isrender: false });
        }
    }

    search = (ev) => {
        const { value } = ev.target;
        this.setState({ keywords: value.replace(/\s+/g, "") });
        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.getArticles(value);
        }, 500)
    }

    render() {
        const { keywords, data, isrender } = this.state;
        return (
            <div className="mask">
                <div className="search-container sildeUpMin">
                    <div className="search-header">
                        <input type="text" placeholder="输入你想搜索的" onChange={this.search} value={keywords} className="search-input" />
                        <span className="search-cancel iconfont icon-cancel" onClick={()=>Control.go(-1)}></span>
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
                                                    <Link to={"/article/" + d._id} className="search-title">{d.title}</Link>
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
            </div>
        )
    }
}
