import React, { PureComponent } from 'react';
import Profile from '../components/profile';
import fetchData from '../util/Fetch';
//import { CacheLink, Route } from 'react-keeper';

export default class extends PureComponent {

    state = {
        articles:[]
    }

    getArticle = async (page=1,pagesize=10) => {
        const articles = await fetchData(`/api/article?page=${page}&pagesize=${pagesize}`);
        this.setState({articles:articles.data});
    }
    
    componentDidMount() {
        this.getArticle();
    }
    render() {
        const {articles} = this.state;
        return (
            <div className="container">
                <section className="main sildeUpMin">
                    <Profile/>
                    {
                        articles.length>0&&
                        articles.map((article)=>(
                            <article className="article" key={article._id}>
                                <div className="article-header">
                                    <a className="article-title" href="/">{article.title}</a>
                                    <div className="article-meta">{article.addTime}<span className="iconfont icon-star"></span>
                                        {
                                            article.categories.map((category,i)=>(
                                                <a key={i} className="article-tag" href="/">{category}</a>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className="article-excerpt">
                                    {article.description}
                                </div>
                                <div className="article-bottom">
                                    <a className="article-readmore" href="/">阅读更多</a>
                                </div>
                            </article>
                        ))
                    }
                    <nav className="paginator scrollIn">
                        <span className="page-number">Page 1.</span>
                        <a className="next" href="/">下一页<i className="iconfont icon-right"></i></a>
                    </nav>
                </section>
            </div>
        )
    }
}