import React, { PureComponent } from 'react';
import fetchData from '../util/Fetch';
import { Control,CacheLink } from 'react-keeper';
import Donate from '../components/donate';
import Loader from '../components/loader';
import Footer from '../components/footer';

export default class extends PureComponent {

    state = {
        article: {},
        isrender: true
    }

    async componentDidMount() {
        const article = await fetchData(`/api${Control.path}`);
        this.setState({ article: article.data, isrender: false })
    }

    render() {
        const { article, isrender } = this.state;
        return (
            <div className="container">
                <section className="main sildeUpMin">
                    {
                        isrender?
                        <Loader/>
                        :
                        <article className="post">
                            <div className="post-header">
                                <p className="post-title">{article.title}</p>
                                <div className="meta-info"><span>{article.addTime}</span>
                                    <i className="iconfont icon-eye"></i><span>{article.views}</span>
                                </div>
                            </div>
                            <div className="post-content slideDownMin">
                                {article.content}
                            </div>
                            <div className="post-meta">
                                <i className="iconfont icon-tag-inner"></i>
                                {
                                    article.categories && article.categories.map((category, i) => <CacheLink key={i} className="category-link" to={"/categories/"+encodeURI(category)}>{category}</CacheLink>)
                                }
                            </div>
                        </article>
                    }
                    <div className="post-footer">
                        <div className="pf-left">
                            <img className="pf-avatar" alt="XboxYan" src={require("../img/header.png")} />
                            <p className="pf-des">hi,i am XboxYan</p>
                        </div>
                        <div className="pf-right">
                            <div className="pf-links">
                                <Donate />
                            </div>
                            <nav className="pf-paginator">
                                <a href="http://synch.site/2013/12/26/Banner-Post/" data-hover="Banner Post">上一篇</a>
                                <a href="http://synch.site/2013/12/25/excerpts/" data-hover="Images"> 下一篇</a>
                            </nav>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        )
    }
}