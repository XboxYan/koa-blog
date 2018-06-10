import React, { PureComponent } from 'react';
import Loader from '../components/loader';
import Profile from '../components/profile';
import BackTop from '../components/backTop';
import Footer from '../components/footer';
import fetchData from '../util/Fetch';
import { CacheLink } from 'react-keeper';

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
                        articles.length>0?
                        articles.map((article)=>(
                            <article className="article" key={article._id}>
                                <div className="article-header">
                                    <CacheLink className="article-title" to={"/article/"+article._id}>{article.title}</CacheLink>
                                    <div className="article-meta">{ new Date(article.addTime).toLocaleString() }<span className="iconfont icon-star"></span>
                                        {
                                            article.categories.map((category,i)=>(
                                                <CacheLink key={i} className="article-tag" to={"/categories/"+encodeURI(category)}>{category}</CacheLink>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className="article-excerpt">
                                    {article.description}
                                </div>
                                <div className="article-bottom">
                                    <CacheLink className="article-readmore" to={"/article/"+article._id}>阅读更多</CacheLink>
                                </div>
                            </article>
                        ))
                        :
                        <Loader/>
                    }
                    <nav className="paginator scrollIn">
                        <a className="prev" href="/"><i className="iconfont icon-left"></i>上一页</a>
                        <span className="page-number">Page 1.</span>
                        <a className="next" href="/">下一页<i className="iconfont icon-right"></i></a>
                    </nav>
                </section>
                <BackTop/>
                <Footer/>
            </div>
        )
    }
}